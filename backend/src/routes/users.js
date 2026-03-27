const express = require('express');
const db = require('../config/db');
const { authenticate, requireRole } = require('../middleware/auth');
const router = express.Router();

// ─── GET MY PROFILE ───
router.get('/me', authenticate, requireRole('user'), async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, email, first_name, last_name, phone, date_of_birth, gender, address_line1, address_line2, city, state, zip_code, country, dietary_restrictions, product_categories, skin_type, household_size, has_pets, is_active, is_eligible_next_sample, last_sample_date, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'User not found.' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

// ─── UPDATE PROFILE ───
router.put('/me', authenticate, requireRole('user'), async (req, res) => {
  try {
    const allowed = [
      'first_name', 'last_name', 'phone', 'date_of_birth', 'gender',
      'address_line1', 'address_line2', 'city', 'state', 'zip_code', 'country',
      'dietary_restrictions', 'product_categories', 'skin_type', 'household_size', 'has_pets'
    ];

    const fields = req.body;
    const setClauses = [];
    const values = [];
    let i = 1;

    for (const [key, value] of Object.entries(fields)) {
      if (allowed.includes(key)) {
        setClauses.push(`${key} = $${i}`);
        values.push(value);
        i++;
      }
    }

    if (!setClauses.length) return res.status(400).json({ error: 'No valid fields to update.' });

    setClauses.push('updated_at = NOW()');
    values.push(req.user.id);

    const result = await db.query(
      `UPDATE users SET ${setClauses.join(', ')} WHERE id = $${i} RETURNING id, email, first_name, last_name, city, state`,
      values
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// ─── MY SAMPLE HISTORY ───
router.get('/samples', authenticate, requireRole('user'), async (req, res) => {
  try {
    const result = await db.query(
      `SELECT sa.*, c.product_name, c.title as campaign_title, c.product_description,
              c.product_images, b.company_name, b.logo_url,
              CASE WHEN f.id IS NOT NULL THEN true ELSE false END as feedback_submitted
       FROM sample_assignments sa
       JOIN campaigns c ON sa.campaign_id = c.id
       JOIN brands b ON c.brand_id = b.id
       LEFT JOIN feedback f ON f.assignment_id = sa.id
       WHERE sa.user_id = $1
       ORDER BY sa.assigned_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get samples error:', err);
    res.status(500).json({ error: 'Failed to fetch samples.' });
  }
});

module.exports = router;
