const { pool } = require('./db');
require('dotenv').config();

const migrate = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Enable UUID extension
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // ─── USERS (consumers) ───
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        date_of_birth DATE,
        gender VARCHAR(20),
        -- Delivery details
        address_line1 VARCHAR(255),
        address_line2 VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(100),
        zip_code VARCHAR(20),
        country VARCHAR(100) DEFAULT 'US',
        -- Preferences
        dietary_restrictions TEXT[],
        product_categories TEXT[],
        skin_type VARCHAR(50),
        household_size INTEGER DEFAULT 1,
        has_pets BOOLEAN DEFAULT false,
        -- Status
        is_active BOOLEAN DEFAULT true,
        is_eligible_next_sample BOOLEAN DEFAULT true,
        last_sample_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ─── BRANDS ───
    await client.query(`
      CREATE TABLE IF NOT EXISTS brands (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        contact_name VARCHAR(200) NOT NULL,
        phone VARCHAR(20),
        website VARCHAR(255),
        logo_url VARCHAR(500),
        industry VARCHAR(100),
        company_size VARCHAR(50),
        description TEXT,
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ─── CAMPAIGNS ───
    await client.query(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        purpose VARCHAR(100) NOT NULL,
        -- Target demographics
        target_age_min INTEGER,
        target_age_max INTEGER,
        target_gender VARCHAR(20),
        target_locations TEXT[],
        target_categories TEXT[],
        -- Product info
        product_name VARCHAR(255) NOT NULL,
        product_description TEXT,
        product_images TEXT[],
        sample_quantity INTEGER NOT NULL,
        -- Pickup details
        pickup_address VARCHAR(500),
        pickup_city VARCHAR(100),
        pickup_state VARCHAR(100),
        pickup_zip VARCHAR(20),
        pickup_date DATE,
        pickup_time_window VARCHAR(100),
        pickup_contact_name VARCHAR(200),
        pickup_contact_phone VARCHAR(20),
        -- Payment & status
        price_per_sample DECIMAL(10, 2),
        total_cost DECIMAL(10, 2),
        payment_status VARCHAR(50) DEFAULT 'pending',
        campaign_status VARCHAR(50) DEFAULT 'draft',
        -- Dates
        start_date DATE,
        end_date DATE,
        feedback_due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ─── SAMPLE ASSIGNMENTS ───
    await client.query(`
      CREATE TABLE IF NOT EXISTS sample_assignments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'assigned',
        assigned_at TIMESTAMP DEFAULT NOW(),
        shipped_at TIMESTAMP,
        delivered_at TIMESTAMP,
        feedback_due_at TIMESTAMP,
        UNIQUE(campaign_id, user_id)
      );
    `);

    // ─── FEEDBACK ───
    await client.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        assignment_id UUID REFERENCES sample_assignments(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
        -- Ratings (1-5)
        overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
        quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
        value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
        packaging_rating INTEGER CHECK (packaging_rating BETWEEN 1 AND 5),
        -- Text feedback
        liked_most TEXT,
        liked_least TEXT,
        would_purchase BOOLEAN,
        purchase_price_point VARCHAR(50),
        recommend_to_friend BOOLEAN,
        additional_comments TEXT,
        -- Media
        photo_urls TEXT[],
        submitted_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ─── PAYMENTS ───
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
        brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD',
        status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        transaction_id VARCHAR(255),
        paid_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ─── INDEXES ───
    await client.query(`CREATE INDEX IF NOT EXISTS idx_campaigns_brand ON campaigns(brand_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(campaign_status);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_assignments_user ON sample_assignments(user_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_assignments_campaign ON sample_assignments(campaign_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_feedback_campaign ON feedback(campaign_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_feedback_user ON feedback(user_id);`);

    await client.query('COMMIT');
    console.log('✅ Migration completed successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
};

migrate();
