const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const { authenticate, requireRole } = require('../middleware/auth');
const router = express.Router();

// ─── CREATE CAMPAIGN ───
router.post(
  '/',
  authenticate,
  requireRole('brand'),
  [
    body('title').trim().notEmpty(),
    body('product_name').trim().notEmpty(),
    body('purpose').trim().notEmpty(),
    body('sample_quantity').isInt({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const {
        title, description, purpose, target_age_min, target_age_max, target_gender,
        target_locations, target_categories, product_name, product_description, product_images,
        sample_quantity, pickup_address, pickup_city, pickup_state, pickup_zip,
        pickup_date, pickup_time_window, pickup_contact_name, pickup_contact_phone,
        price_per_sample, start_date, end_date,
      } = req.body;

      const total_cost = (price_per_sample || 0) * sample_quantity;

      const result = await db.query(
        `INSERT INTO campaigns (brand_id, title, description, purpose,
          target_age_min, target_age_max, target_gender, target_locations, target_categories,
          product_name, product_description, product_images, sample_quantity,
          pickup_address, pickup_city, pickup_state, pickup_zip,
          pickup_date, pickup_time_window, pickup_contact_name, pickup_contact_phone,
          price_per_sample, total_cost, start_date, end_date)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)
         RETURNING *`,
        [req.user.id, title, description, purpose,
         target_age_min, target_age_max, target_gender, target_locations || [], target_categories || [],
         product_name, product_description, product_images || [], sample_quantity,
         pickup_address, pickup_city, pickup_state, pickup_zip,
         pickup_date, pickup_time_window, pickup_contact_name, pickup_contact_phone,
         price_per_sample, total_cost, start_date, end_date]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Create campaign error:', err);
      res.status(500).json({ error: 'Failed to create campaign.' });
    }
  }
);

// ─── GET ALL CAMPAIGNS (for brand) ───
router.get('/my', authenticate, requireRole('brand'), async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM campaigns WHERE brand_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get campaigns error:', err);
    res.status(500).json({ error: 'Failed to fetch campaigns.' });
  }
});

// ─── GET ACTIVE CAMPAIGNS (for users to browse) ───
router.get('/active', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.*, b.company_name, b.logo_url
       FROM campaigns c JOIN brands b ON c.brand_id = b.id
       WHERE c.campaign_status = 'active' AND c.payment_status = 'paid'
       ORDER BY c.start_date ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get active campaigns error:', err);
    res.status(500).json({ error: 'Failed to fetch campaigns.' });
  }
});

// ─── GET SINGLE CAMPAIGN ───
router.get('/:id', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.*, b.company_name, b.logo_url
       FROM campaigns c JOIN brands b ON c.brand_id = b.id
       WHERE c.id = $1`,
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Campaign not found.' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get campaign error:', err);
    res.status(500).json({ error: 'Failed to fetch campaign.' });
  }
});

// ─── UPDATE CAMPAIGN ───
router.put('/:id', authenticate, requireRole('brand'), async (req, res) => {
  try {
    const existing = await db.query(
      'SELECT * FROM campaigns WHERE id = $1 AND brand_id = $2',
      [req.params.id, req.user.id]
    );
    if (!existing.rows.length) return res.status(404).json({ error: 'Campaign not found.' });

    const fields = req.body;
    const setClauses = [];
    const values = [];
    let i = 1;

    for (const [key, value] of Object.entries(fields)) {
      if (key !== 'id' && key !== 'brand_id') {
        setClauses.push(`${key} = $${i}`);
        values.push(value);
        i++;
      }
    }

    setClauses.push(`updated_at = NOW()`);
    values.push(req.params.id);

    const result = await db.query(
      `UPDATE campaigns SET ${setClauses.join(', ')} WHERE id = $${i} RETURNING *`,
      values
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update campaign error:', err);
    res.status(500).json({ error: 'Failed to update campaign.' });
  }
});

// ─── GET CAMPAIGN FEEDBACK INSIGHTS ───
router.get('/:id/insights', authenticate, requireRole('brand'), async (req, res) => {
  try {
    const campaign = await db.query(
      'SELECT * FROM campaigns WHERE id = $1 AND brand_id = $2',
      [req.params.id, req.user.id]
    );
    if (!campaign.rows.length) return res.status(404).json({ error: 'Campaign not found.' });

    const stats = await db.query(`
      SELECT
        COUNT(*) as total_responses,
        ROUND(AVG(overall_rating), 2) as avg_overall,
        ROUND(AVG(quality_rating), 2) as avg_quality,
        ROUND(AVG(value_rating), 2) as avg_value,
        ROUND(AVG(packaging_rating), 2) as avg_packaging,
        COUNT(*) FILTER (WHERE would_purchase = true) as would_purchase_count,
        COUNT(*) FILTER (WHERE recommend_to_friend = true) as would_recommend_count
      FROM feedback WHERE campaign_id = $1
    `, [req.params.id]);

    const assignmentStats = await db.query(`
      SELECT
        COUNT(*) as total_assigned,
        COUNT(*) FILTER (WHERE status = 'delivered') as total_delivered,
        COUNT(*) FILTER (WHERE status = 'feedback_received') as total_feedback
      FROM sample_assignments WHERE campaign_id = $1
    `, [req.params.id]);

    const recentFeedback = await db.query(`
      SELECT f.*, u.first_name, u.city, u.state
      FROM feedback f JOIN users u ON f.user_id = u.id
      WHERE f.campaign_id = $1
      ORDER BY f.submitted_at DESC LIMIT 10
    `, [req.params.id]);

    res.json({
      campaign: campaign.rows[0],
      stats: stats.rows[0],
      assignments: assignmentStats.rows[0],
      recent_feedback: recentFeedback.rows,
    });
  } catch (err) {
    console.error('Get insights error:', err);
    res.status(500).json({ error: 'Failed to fetch insights.' });
  }
});

module.exports = router;
