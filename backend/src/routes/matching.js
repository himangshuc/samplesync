const express = require('express');
const db      = require('../config/db');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

// Maps campaign target_category values → questionnaire answer key prefixes
const CATEGORY_BRANCH_PREFIXES = {
  food_beverage:   ['k_'],
  snacks_drinks:   ['k_'],
  beauty_skincare: ['b_'],
  health_wellness: ['b_', 'd_'],
  home_lifestyle:  ['lr_'],
  tech_gadgets:    ['lr_'],
  fashion_apparel: ['w_'],
  pet_care:        ['p_'],
};

function getAge(dob) {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
}

// Score a user against a campaign (0–100)
function scoreUser(user, campaign) {
  let score = 0;

  // 1. Gender (25 pts)
  const tg = campaign.target_gender;
  if (!tg || tg === 'all') score += 25;
  else if (user.gender && user.gender.toLowerCase() === tg.toLowerCase()) score += 25;

  // 2. Age (25 pts)
  const ageMin = campaign.target_age_min;
  const ageMax = campaign.target_age_max;
  if (!ageMin && !ageMax) {
    score += 25;
  } else if (user.date_of_birth) {
    const age = getAge(user.date_of_birth);
    if ((!ageMin || age >= ageMin) && (!ageMax || age <= ageMax)) score += 25;
  }

  // 3. Location (25 pts)
  const targetLocs = (campaign.target_locations || []).map(l => l.toLowerCase().trim());
  if (!targetLocs.length) {
    score += 25;
  } else {
    const userLocs = [user.city, user.state].filter(Boolean).map(s => s.toLowerCase().trim());
    if (targetLocs.some(tl => userLocs.some(ul => ul.includes(tl) || tl.includes(ul)))) {
      score += 25;
    }
  }

  // 4. Product category / questionnaire branch (25 pts)
  const targetCats = campaign.target_categories || [];
  if (!targetCats.length) {
    score += 25;
  } else {
    const qAnswers = (user.questionnaire_data?.answers) || {};
    const answerKeys = Object.keys(qAnswers);

    // Check questionnaire branch answers
    const hasQBranchMatch = targetCats.some(cat => {
      const prefixes = CATEGORY_BRANCH_PREFIXES[cat] || [];
      return prefixes.some(prefix => answerKeys.some(k => k.startsWith(prefix)));
    });

    // Also check user's product_categories field set at signup
    const userCats = (user.product_categories || []).map(c => c.toLowerCase().replace(/\s+/g, '_'));
    const hasCatOverlap = targetCats.some(tc => userCats.includes(tc));

    if (hasQBranchMatch || hasCatOverlap) score += 25;
  }

  return score;
}

// ─── PREVIEW CANDIDATES ───────────────────────────────────────────────────────
// GET /api/matching/candidates/:campaignId  (brand only)
router.get('/candidates/:campaignId', authenticate, requireRole('brand'), async (req, res) => {
  try {
    const campRow = await db.query(
      'SELECT * FROM campaigns WHERE id = $1 AND brand_id = $2',
      [req.params.campaignId, req.user.id],
    );
    if (!campRow.rows.length) return res.status(404).json({ error: 'Campaign not found.' });
    const campaign = campRow.rows[0];

    const existingCount = await db.query(
      'SELECT COUNT(*) FROM sample_assignments WHERE campaign_id = $1',
      [campaign.id],
    );
    const alreadyAssigned = parseInt(existingCount.rows[0].count);

    const users = await db.query(
      `SELECT u.id, u.first_name, u.last_name, u.gender, u.date_of_birth,
              u.city, u.state, u.product_categories, u.questionnaire_data,
              u.questionnaire_completed
       FROM users u
       WHERE u.is_eligible_next_sample = true AND u.is_active = true
         AND u.id NOT IN (
           SELECT user_id FROM sample_assignments WHERE campaign_id = $1
         )`,
      [campaign.id],
    );

    const scored = users.rows
      .map(u => ({ ...u, score: scoreUser(u, campaign) }))
      .filter(u => u.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, campaign.sample_quantity - alreadyAssigned);

    res.json({
      candidates: scored.map(u => ({
        id: u.id,
        name: `${u.first_name} ${u.last_name}`,
        city: u.city,
        state: u.state,
        score: u.score,
        questionnaire_completed: u.questionnaire_completed,
      })),
      total_eligible: users.rows.length,
      already_assigned: alreadyAssigned,
      slots_remaining: campaign.sample_quantity - alreadyAssigned,
    });
  } catch (err) {
    console.error('Matching candidates error:', err);
    res.status(500).json({ error: 'Failed to fetch candidates.' });
  }
});

// ─── RUN MATCHING ─────────────────────────────────────────────────────────────
// POST /api/matching/run/:campaignId  (brand only)
router.post('/run/:campaignId', authenticate, requireRole('brand'), async (req, res) => {
  try {
    const campRow = await db.query(
      'SELECT * FROM campaigns WHERE id = $1 AND brand_id = $2',
      [req.params.campaignId, req.user.id],
    );
    if (!campRow.rows.length) return res.status(404).json({ error: 'Campaign not found.' });
    const campaign = campRow.rows[0];

    const existingCount = await db.query(
      'SELECT COUNT(*) FROM sample_assignments WHERE campaign_id = $1',
      [campaign.id],
    );
    const alreadyAssigned = parseInt(existingCount.rows[0].count);
    const slotsRemaining  = campaign.sample_quantity - alreadyAssigned;

    if (slotsRemaining <= 0) {
      return res.status(409).json({ error: 'Campaign already has maximum assignments.' });
    }

    const users = await db.query(
      `SELECT u.id, u.first_name, u.last_name, u.gender, u.date_of_birth,
              u.city, u.state, u.product_categories, u.questionnaire_data,
              u.questionnaire_completed
       FROM users u
       WHERE u.is_eligible_next_sample = true AND u.is_active = true
         AND u.id NOT IN (
           SELECT user_id FROM sample_assignments WHERE campaign_id = $1
         )`,
      [campaign.id],
    );

    const scored = users.rows
      .map(u => ({ ...u, score: scoreUser(u, campaign) }))
      .filter(u => u.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, slotsRemaining);

    if (!scored.length) {
      return res.status(404).json({ error: 'No eligible samplers found matching this campaign.' });
    }

    // Bulk insert assignments
    const valuePlaceholders = scored.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ');
    const params = scored.flatMap(u => [campaign.id, u.id]);
    await db.query(
      `INSERT INTO sample_assignments (campaign_id, user_id) VALUES ${valuePlaceholders} ON CONFLICT DO NOTHING`,
      params,
    );

    res.json({
      matched: scored.length,
      assignments: scored.map(u => ({
        id: u.id,
        name: `${u.first_name} ${u.last_name}`,
        city: u.city,
        state: u.state,
        score: u.score,
      })),
    });
  } catch (err) {
    console.error('Matching run error:', err);
    res.status(500).json({ error: 'Failed to run matching.' });
  }
});

module.exports = router;
