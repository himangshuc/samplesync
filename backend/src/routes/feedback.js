const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const { authenticate, requireRole } = require('../middleware/auth');
const router = express.Router();

// ─── SUBMIT FEEDBACK ───
router.post(
  '/',
  authenticate,
  requireRole('user'),
  [
    body('assignment_id').isUUID(),
    body('overall_rating').isInt({ min: 1, max: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { assignment_id, overall_rating, quality_rating, value_rating, packaging_rating,
        liked_most, liked_least, would_purchase, purchase_price_point,
        recommend_to_friend, additional_comments, photo_urls } = req.body;

      // Verify assignment belongs to this user and is delivered
      const assignment = await db.query(
        `SELECT * FROM sample_assignments WHERE id = $1 AND user_id = $2`,
        [assignment_id, req.user.id]
      );
      if (!assignment.rows.length) return res.status(404).json({ error: 'Assignment not found.' });

      const a = assignment.rows[0];
      if (a.status !== 'delivered') {
        return res.status(400).json({ error: 'Sample has not been delivered yet.' });
      }

      // Check feedback window (3 days from delivery)
      if (a.feedback_due_at && new Date() > new Date(a.feedback_due_at)) {
        return res.status(400).json({ error: 'Feedback window has closed.' });
      }

      // Check for existing feedback
      const existing = await db.query(
        'SELECT id FROM feedback WHERE assignment_id = $1', [assignment_id]
      );
      if (existing.rows.length) return res.status(409).json({ error: 'Feedback already submitted.' });

      const result = await db.query(
        `INSERT INTO feedback (assignment_id, user_id, campaign_id,
          overall_rating, quality_rating, value_rating, packaging_rating,
          liked_most, liked_least, would_purchase, purchase_price_point,
          recommend_to_friend, additional_comments, photo_urls)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
         RETURNING *`,
        [assignment_id, req.user.id, a.campaign_id,
         overall_rating, quality_rating, value_rating, packaging_rating,
         liked_most, liked_least, would_purchase, purchase_price_point,
         recommend_to_friend, additional_comments, photo_urls || []]
      );

      // Update assignment status
      await db.query(
        `UPDATE sample_assignments SET status = 'feedback_received' WHERE id = $1`,
        [assignment_id]
      );

      // Keep user eligible for next sample
      await db.query(
        `UPDATE users SET is_eligible_next_sample = true WHERE id = $1`,
        [req.user.id]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Submit feedback error:', err);
      res.status(500).json({ error: 'Failed to submit feedback.' });
    }
  }
);

// ─── GET MY FEEDBACK HISTORY ───
router.get('/my', authenticate, requireRole('user'), async (req, res) => {
  try {
    const result = await db.query(
      `SELECT f.*, c.product_name, c.title as campaign_title, b.company_name
       FROM feedback f
       JOIN campaigns c ON f.campaign_id = c.id
       JOIN brands b ON c.brand_id = b.id
       WHERE f.user_id = $1
       ORDER BY f.submitted_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get feedback error:', err);
    res.status(500).json({ error: 'Failed to fetch feedback.' });
  }
});

// ─── GET PENDING FEEDBACK (samples delivered, no feedback yet) ───
router.get('/pending', authenticate, requireRole('user'), async (req, res) => {
  try {
    const result = await db.query(
      `SELECT sa.*, c.product_name, c.title as campaign_title, c.product_description,
              b.company_name, sa.feedback_due_at
       FROM sample_assignments sa
       JOIN campaigns c ON sa.campaign_id = c.id
       JOIN brands b ON c.brand_id = b.id
       LEFT JOIN feedback f ON f.assignment_id = sa.id
       WHERE sa.user_id = $1 AND sa.status = 'delivered' AND f.id IS NULL
       ORDER BY sa.delivered_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get pending feedback error:', err);
    res.status(500).json({ error: 'Failed to fetch pending feedback.' });
  }
});

module.exports = router;
