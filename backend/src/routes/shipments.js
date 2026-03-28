const express = require('express');
const db      = require('../config/db');
const { authenticate, requireRole } = require('../middleware/auth');
const shiprocket     = require('../services/shiprocket');
const notifications  = require('../services/notifications');

const router = express.Router();

// ─── Idempotent column migration ─────────────────────────────────────────────
async function ensureColumns() {
  await db.query(`
    ALTER TABLE sample_assignments
      ADD COLUMN IF NOT EXISTS shiprocket_order_id    VARCHAR(100),
      ADD COLUMN IF NOT EXISTS shiprocket_shipment_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS awb_code               VARCHAR(100),
      ADD COLUMN IF NOT EXISTS courier_name           VARCHAR(150),
      ADD COLUMN IF NOT EXISTS tracking_url           VARCHAR(500),
      ADD COLUMN IF NOT EXISTS last_tracking_status   VARCHAR(150),
      ADD COLUMN IF NOT EXISTS last_tracking_updated  TIMESTAMP,
      ADD COLUMN IF NOT EXISTS pickup_scheduled_at    TIMESTAMP
  `);
}
ensureColumns().catch(console.error);

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function getAssignmentWithOwnership(assignmentId, brandId) {
  const result = await db.query(
    `SELECT sa.*, c.brand_id, c.product_name, c.product_dimensions, c.product_weight,
            c.pickup_date, c.title AS campaign_title
     FROM sample_assignments sa
     JOIN campaigns c ON sa.campaign_id = c.id
     WHERE sa.id = $1 AND c.brand_id = $2`,
    [assignmentId, brandId],
  );
  return result.rows[0] || null;
}

async function getUserById(userId) {
  const r = await db.query(
    'SELECT id, first_name, last_name, email, phone, address_line1, address_line2, city, state, zip_code FROM users WHERE id = $1',
    [userId],
  );
  return r.rows[0] || null;
}

async function getCampaignById(campaignId) {
  const r = await db.query('SELECT * FROM campaigns WHERE id = $1', [campaignId]);
  return r.rows[0] || null;
}

// ─── CREATE SHIPMENT ─────────────────────────────────────────────────────────
// POST /api/shipments/create/:assignmentId  (brand only)
router.post('/create/:assignmentId', authenticate, requireRole('brand'), async (req, res) => {
  try {
    const assignment = await getAssignmentWithOwnership(req.params.assignmentId, req.user.id);
    if (!assignment)          return res.status(404).json({ error: 'Assignment not found.' });
    if (assignment.awb_code)  return res.status(409).json({ error: 'Shipment already created.' });
    if (assignment.status !== 'assigned')
      return res.status(400).json({ error: `Cannot ship an assignment with status "${assignment.status}".` });

    const user     = await getUserById(assignment.user_id);
    const campaign = await getCampaignById(assignment.campaign_id);
    if (!user) return res.status(404).json({ error: 'Sampler not found.' });

    // Create order in Shiprocket
    const orderData = await shiprocket.createOrder({ assignment, campaign, user });
    if (!orderData.shipment_id) throw new Error('Shiprocket did not return a shipment_id.');

    // Assign courier & get AWB
    let awbCode = null, courierName = null;
    try {
      const awbData = await shiprocket.assignAWB(orderData.shipment_id);
      awbCode     = awbData?.response?.data?.awb_code     || awbData?.awb_code || null;
      courierName = awbData?.response?.data?.courier_name || awbData?.courier_name || null;
    } catch (awbErr) {
      console.warn('AWB assignment failed (may need manual assignment):', awbErr.message);
    }

    const trackingUrl = awbCode
      ? `https://shiprocket.co/tracking/${awbCode}`
      : null;

    // Persist
    const updated = await db.query(
      `UPDATE sample_assignments SET
         shiprocket_order_id    = $1,
         shiprocket_shipment_id = $2,
         awb_code               = $3,
         courier_name           = $4,
         tracking_url           = $5,
         status                 = 'shipped',
         shipped_at             = NOW()
       WHERE id = $6
       RETURNING *`,
      [String(orderData.order_id), String(orderData.shipment_id), awbCode, courierName, trackingUrl, assignment.id],
    );

    // Notify (fire-and-forget)
    const brandRow = await db.query('SELECT email FROM brands WHERE id = $1', [req.user.id]);
    notifications.notifyShipmentCreated({
      brand:       brandRow.rows[0],
      sampler:     user,
      productName: campaign.product_name,
      awbCode,
      courierName,
    }).catch(console.error);

    res.json(updated.rows[0]);
  } catch (err) {
    console.error('Create shipment error:', err.response?.data || err.message);
    const msg = err.response?.data?.message || err.message || 'Failed to create shipment.';
    res.status(500).json({ error: msg });
  }
});

// ─── SCHEDULE PICKUP ─────────────────────────────────────────────────────────
// POST /api/shipments/pickup/:assignmentId  (brand only)
router.post('/pickup/:assignmentId', authenticate, requireRole('brand'), async (req, res) => {
  try {
    const assignment = await getAssignmentWithOwnership(req.params.assignmentId, req.user.id);
    if (!assignment)                        return res.status(404).json({ error: 'Assignment not found.' });
    if (!assignment.shiprocket_shipment_id) return res.status(400).json({ error: 'Shipment not created yet.' });

    const pickupDate = req.body.pickup_date || assignment.pickup_date || null;
    await shiprocket.schedulePickup(assignment.shiprocket_shipment_id, pickupDate);

    await db.query(
      'UPDATE sample_assignments SET pickup_scheduled_at = NOW() WHERE id = $1',
      [assignment.id],
    );

    const brandRow = await db.query('SELECT email FROM brands WHERE id = $1', [req.user.id]);
    const campaign = await getCampaignById(assignment.campaign_id);
    notifications.notifyPickupScheduled({
      brand:       brandRow.rows[0],
      productName: campaign?.product_name,
      pickupDate,
    }).catch(console.error);

    res.json({ success: true, pickup_date: pickupDate });
  } catch (err) {
    console.error('Schedule pickup error:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data?.message || 'Failed to schedule pickup.' });
  }
});

// ─── TRACK SHIPMENT ──────────────────────────────────────────────────────────
// GET /api/shipments/track/:awb  (brand or user — verified against ownership)
router.get('/track/:awb', authenticate, async (req, res) => {
  try {
    const { awb } = req.params;

    // Verify the AWB belongs to this user/brand
    let assignmentRow;
    if (req.user.role === 'user') {
      const r = await db.query(
        'SELECT id FROM sample_assignments WHERE awb_code = $1 AND user_id = $2',
        [awb, req.user.id],
      );
      assignmentRow = r.rows[0];
    } else {
      const r = await db.query(
        `SELECT sa.id FROM sample_assignments sa
         JOIN campaigns c ON sa.campaign_id = c.id
         WHERE sa.awb_code = $1 AND c.brand_id = $2`,
        [awb, req.user.id],
      );
      assignmentRow = r.rows[0];
    }
    if (!assignmentRow) return res.status(403).json({ error: 'Access denied.' });

    const tracking = await shiprocket.trackShipment(awb);
    res.json(tracking);
  } catch (err) {
    console.error('Track shipment error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch tracking data.' });
  }
});

// ─── GET ALL ASSIGNMENTS FOR A CAMPAIGN ──────────────────────────────────────
// GET /api/shipments/campaign/:campaignId  (brand only)
router.get('/campaign/:campaignId', authenticate, requireRole('brand'), async (req, res) => {
  try {
    const own = await db.query('SELECT id FROM campaigns WHERE id = $1 AND brand_id = $2', [req.params.campaignId, req.user.id]);
    if (!own.rows.length) return res.status(404).json({ error: 'Campaign not found.' });

    const result = await db.query(
      `SELECT sa.*, u.first_name, u.last_name, u.email, u.city, u.state
       FROM sample_assignments sa
       JOIN users u ON sa.user_id = u.id
       WHERE sa.campaign_id = $1
       ORDER BY sa.assigned_at DESC`,
      [req.params.campaignId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get campaign assignments error:', err);
    res.status(500).json({ error: 'Failed to fetch assignments.' });
  }
});

// ─── CANCEL SHIPMENT ─────────────────────────────────────────────────────────
// POST /api/shipments/cancel/:assignmentId  (brand only)
router.post('/cancel/:assignmentId', authenticate, requireRole('brand'), async (req, res) => {
  try {
    const assignment = await getAssignmentWithOwnership(req.params.assignmentId, req.user.id);
    if (!assignment)                     return res.status(404).json({ error: 'Assignment not found.' });
    if (!assignment.shiprocket_order_id) return res.status(400).json({ error: 'No Shiprocket order to cancel.' });

    await shiprocket.cancelOrder(assignment.shiprocket_order_id);

    await db.query(
      `UPDATE sample_assignments SET
         status = 'assigned', shipped_at = NULL,
         shiprocket_order_id = NULL, shiprocket_shipment_id = NULL,
         awb_code = NULL, courier_name = NULL, tracking_url = NULL,
         last_tracking_status = NULL, pickup_scheduled_at = NULL
       WHERE id = $1`,
      [assignment.id],
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Cancel shipment error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to cancel shipment.' });
  }
});

// ─── SHIPROCKET WEBHOOK ───────────────────────────────────────────────────────
// POST /api/shipments/webhook  (public — no JWT, verified via Shiprocket token header)
router.post('/webhook', (req, res) => {
  const token = req.headers['x-shiprocket-token'] || req.headers['authorization'] || '';
  const secret = process.env.SHIPROCKET_WEBHOOK_SECRET || '';
  if (secret && token && !token.includes(secret)) {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  // Respond immediately so Shiprocket never times out
  res.json({ received: true });

  // Process asynchronously after response
  const { awb, current_status } = req.body || {};
  if (!awb) return;

  (async () => {
    try {
      await db.query(
        `UPDATE sample_assignments
           SET last_tracking_status = $1, last_tracking_updated = NOW()
         WHERE awb_code = $2`,
        [current_status, awb],
      );

      const status = (current_status || '').toLowerCase();

      if (status.includes('delivered')) {
        const updated = await db.query(
          `UPDATE sample_assignments
             SET status = 'delivered', delivered_at = NOW(),
                 feedback_due_at = NOW() + INTERVAL '${process.env.FEEDBACK_WINDOW_DAYS || 3} days'
           WHERE awb_code = $1
           RETURNING user_id, campaign_id`,
          [awb],
        );
        if (updated.rows.length) {
          const { user_id, campaign_id } = updated.rows[0];
          const [userRow, campaignRow] = await Promise.all([
            db.query('SELECT first_name, last_name, email FROM users WHERE id = $1', [user_id]),
            db.query('SELECT product_name FROM campaigns WHERE id = $1', [campaign_id]),
          ]);
          const feedbackDue = new Date(Date.now() + (Number(process.env.FEEDBACK_WINDOW_DAYS || 3)) * 86400000);
          notifications.notifyDelivered({
            sampler:       userRow.rows[0],
            productName:   campaignRow.rows[0]?.product_name,
            feedbackDueAt: feedbackDue.toLocaleDateString(),
          }).catch(console.error);
        }
      } else if (status.includes('shipped') || status.includes('in transit') || status.includes('picked up')) {
        await db.query(
          `UPDATE sample_assignments SET status = 'shipped', shipped_at = COALESCE(shipped_at, NOW())
           WHERE awb_code = $1 AND status = 'assigned'`,
          [awb],
        );
      }
    } catch (err) {
      console.error('Webhook processing error:', err);
    }
  })();
});

module.exports = router;
