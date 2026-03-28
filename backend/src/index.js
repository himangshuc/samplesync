const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const campaignRoutes = require('./routes/campaigns');
const feedbackRoutes  = require('./routes/feedback');
const shipmentsRoutes = require('./routes/shipments');
const matchingRoutes  = require('./routes/matching');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://samplesync-web.vercel.app',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
}));
// Webhook route must bypass CORS and use permissive body parsing
app.use('/api/shipments/webhook', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Catch JSON parse errors (e.g. malformed webhook payloads) and pass empty body
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return next();
  next(err);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/feedback',  feedbackRoutes);
app.use('/api/shipments', shipmentsRoutes);
app.use('/api/matching',  matchingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 SampleSync API running on http://localhost:${PORT}`);
});

module.exports = app;
