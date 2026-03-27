const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const router = express.Router();

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// ─── USER SIGNUP ───
router.post(
  '/user/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('first_name').trim().notEmpty(),
    body('last_name').trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const {
        email, password, first_name, last_name, phone, date_of_birth, gender,
        address_line1, address_line2, city, state, zip_code, country,
        dietary_restrictions, product_categories, skin_type, household_size, has_pets,
      } = req.body;

      const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length) return res.status(409).json({ error: 'Email already registered.' });

      const password_hash = await bcrypt.hash(password, 10);

      const result = await db.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, phone, date_of_birth, gender,
          address_line1, address_line2, city, state, zip_code, country,
          dietary_restrictions, product_categories, skin_type, household_size, has_pets)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
         RETURNING id, email, first_name, last_name`,
        [email, password_hash, first_name, last_name, phone, date_of_birth, gender,
         address_line1, address_line2, city, state, zip_code, country || 'US',
         dietary_restrictions || [], product_categories || [], skin_type, household_size || 1, has_pets || false]
      );

      const user = result.rows[0];
      const token = generateToken({ id: user.id, email: user.email, role: 'user' });

      res.status(201).json({ token, user });
    } catch (err) {
      console.error('User signup error:', err);
      res.status(500).json({ error: 'Server error during signup.' });
    }
  }
);

// ─── USER LOGIN ───
router.post(
  '/user/login',
  [body('email').isEmail(), body('password').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (!result.rows.length) return res.status(401).json({ error: 'Invalid credentials.' });

      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });

      const token = generateToken({ id: user.id, email: user.email, role: 'user' });
      const { password_hash, ...safeUser } = user;
      res.json({ token, user: safeUser });
    } catch (err) {
      console.error('User login error:', err);
      res.status(500).json({ error: 'Server error during login.' });
    }
  }
);

// ─── BRAND SIGNUP ───
router.post(
  '/brand/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('company_name').trim().notEmpty(),
    body('contact_name').trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password, company_name, contact_name, phone, website, industry, company_size, description } = req.body;

      const existing = await db.query('SELECT id FROM brands WHERE email = $1', [email]);
      if (existing.rows.length) return res.status(409).json({ error: 'Email already registered.' });

      const password_hash = await bcrypt.hash(password, 10);

      const result = await db.query(
        `INSERT INTO brands (email, password_hash, company_name, contact_name, phone, website, industry, company_size, description)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         RETURNING id, email, company_name, contact_name`,
        [email, password_hash, company_name, contact_name, phone, website, industry, company_size, description]
      );

      const brand = result.rows[0];
      const token = generateToken({ id: brand.id, email: brand.email, role: 'brand' });

      res.status(201).json({ token, brand });
    } catch (err) {
      console.error('Brand signup error:', err);
      res.status(500).json({ error: 'Server error during signup.' });
    }
  }
);

// ─── BRAND LOGIN ───
router.post(
  '/brand/login',
  [body('email').isEmail(), body('password').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;
      const result = await db.query('SELECT * FROM brands WHERE email = $1', [email]);
      if (!result.rows.length) return res.status(401).json({ error: 'Invalid credentials.' });

      const brand = result.rows[0];
      const valid = await bcrypt.compare(password, brand.password_hash);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });

      const token = generateToken({ id: brand.id, email: brand.email, role: 'brand' });
      const { password_hash, ...safeBrand } = brand;
      res.json({ token, brand: safeBrand });
    } catch (err) {
      console.error('Brand login error:', err);
      res.status(500).json({ error: 'Server error during login.' });
    }
  }
);

module.exports = router;
