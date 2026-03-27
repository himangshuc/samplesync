const { pool } = require('./db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seed = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const passwordHash = await bcrypt.hash('password123', 10);

    // Seed users
    const userRes = await client.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, phone, date_of_birth, gender,
        address_line1, city, state, zip_code, dietary_restrictions, product_categories, household_size)
      VALUES
        ('alice@example.com', $1, 'Alice', 'Chen', '206-555-0101', '1992-03-15', 'female',
         '123 Pine St', 'Seattle', 'WA', '98101', ARRAY['gluten-free'], ARRAY['skincare','snacks'], 2),
        ('bob@example.com', $1, 'Bob', 'Martinez', '206-555-0102', '1988-07-22', 'male',
         '456 Oak Ave', 'Portland', 'OR', '97201', ARRAY[]::TEXT[], ARRAY['beverages','tech'], 1),
        ('carol@example.com', $1, 'Carol', 'Johnson', '206-555-0103', '1995-11-08', 'female',
         '789 Elm Blvd', 'San Francisco', 'CA', '94102', ARRAY['vegan'], ARRAY['skincare','wellness'], 3)
      RETURNING id;
    `, [passwordHash]);

    // Seed brands
    const brandRes = await client.query(`
      INSERT INTO brands (email, password_hash, company_name, contact_name, phone, website, industry, company_size, description, is_verified)
      VALUES
        ('hello@glowlabs.com', $1, 'GlowLabs', 'Sarah Kim', '415-555-0201', 'https://glowlabs.example.com', 'Beauty & Skincare', '50-200', 'Premium organic skincare brand focused on sustainable beauty.', true),
        ('team@brewcraft.com', $1, 'BrewCraft', 'Mike Torres', '503-555-0202', 'https://brewcraft.example.com', 'Beverages', '10-50', 'Artisanal cold brew and specialty coffee company.', true)
      RETURNING id;
    `, [passwordHash]);

    // Seed campaigns
    await client.query(`
      INSERT INTO campaigns (brand_id, title, description, purpose, target_age_min, target_age_max, target_gender,
        target_locations, target_categories, product_name, product_description, sample_quantity,
        pickup_address, pickup_city, pickup_state, pickup_zip, pickup_date, pickup_contact_name,
        price_per_sample, total_cost, payment_status, campaign_status, start_date, end_date)
      VALUES
        ($1, 'Radiance Serum Launch', 'Try our new Vitamin C radiance serum before anyone else!',
         'product_launch', 22, 45, 'all', ARRAY['WA','OR','CA'], ARRAY['skincare'],
         'Radiance Vitamin C Serum', 'A lightweight, fast-absorbing serum with 15% Vitamin C.', 500,
         '100 Beauty Way', 'Seattle', 'WA', '98109', '2026-04-15', 'Sarah Kim',
         3.50, 1750.00, 'paid', 'active', '2026-04-01', '2026-05-15'),
        ($2, 'Summer Cold Brew Tasting', 'Be the first to taste our new summer cold brew flavors.',
         'market_research', 21, 55, 'all', ARRAY['OR','WA'], ARRAY['beverages'],
         'Summer Cold Brew Sampler Pack', 'Three 8oz bottles: Vanilla Oat, Citrus Mint, and Classic.', 300,
         '200 Roast St', 'Portland', 'OR', '97201', '2026-04-20', 'Mike Torres',
         5.00, 1500.00, 'pending', 'draft', '2026-05-01', '2026-06-15');
    `, [brandRes.rows[0].id, brandRes.rows[1].id]);

    await client.query('COMMIT');
    console.log('✅ Seed data inserted successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
};

seed();
