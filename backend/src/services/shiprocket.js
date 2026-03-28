const axios = require('axios');

const BASE = 'https://apiv2.shiprocket.in/v1/external';

// Module-level token cache (valid 24h; refresh 5 min before expiry)
let _token  = null;
let _expiry = 0;

async function getToken() {
  if (_token && Date.now() < _expiry) return _token;
  const { data } = await axios.post(`${BASE}/auth/login`, {
    email:    process.env.SHIPROCKET_EMAIL,
    password: process.env.SHIPROCKET_PASSWORD,
  });
  _token  = data.token;
  _expiry = Date.now() + 23 * 60 * 60 * 1000; // 23 h
  return _token;
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

// Parse "10 × 5 × 3 cm" → { length: 10, breadth: 5, height: 3 }
function parseDimensions(str) {
  try {
    const nums = (str || '').replace(/cm|in/gi, '').split(/[×x×*,]/i).map(s => parseFloat(s.trim()));
    if (nums.length >= 3 && nums.every(n => !isNaN(n))) {
      return { length: nums[0], breadth: nums[1], height: nums[2] };
    }
  } catch (_) {}
  return { length: 10, breadth: 10, height: 10 }; // safe fallback
}

// Parse "250 g" → 0.25 (kg), "1.5 kg" → 1.5
function parseWeight(str) {
  try {
    const lower = (str || '').toLowerCase();
    const num   = parseFloat(lower);
    if (isNaN(num)) return 0.5;
    return lower.includes('kg') ? num : num / 1000;
  } catch (_) { return 0.5; }
}

// ─── CREATE ORDER ────────────────────────────────────────────────────────────
async function createOrder({ assignment, campaign, user }) {
  const token = await getToken();
  const { length, breadth, height } = parseDimensions(campaign.product_dimensions);
  const weight = parseWeight(campaign.product_weight);

  const payload = {
    order_id:               `SS-${assignment.id.slice(0, 8).toUpperCase()}`,
    order_date:             new Date().toISOString().split('T')[0],
    pickup_location:        process.env.SHIPROCKET_DEFAULT_PICKUP || 'Primary',
    billing_customer_name:  user.first_name,
    billing_last_name:      user.last_name || '',
    billing_address:        user.address_line1 || '',
    billing_address_2:      user.address_line2 || '',
    billing_city:           user.city || '',
    billing_pincode:        user.zip_code || '',
    billing_state:          user.state || '',
    billing_country:        'India',
    billing_email:          user.email,
    billing_phone:          user.phone || '',
    shipping_is_billing:    1,
    order_items: [{
      name:          campaign.product_name,
      sku:           `SMPL-${campaign.id.slice(0, 6).toUpperCase()}`,
      units:         1,
      selling_price: 0,
    }],
    payment_method: 'Prepaid',
    sub_total:      0,
    length,
    breadth,
    height,
    weight,
  };

  const { data } = await axios.post(`${BASE}/orders/create/adhoc`, payload, {
    headers: authHeaders(token),
  });
  return data; // { order_id, shipment_id, status, ... }
}

// ─── ASSIGN COURIER & GET AWB ────────────────────────────────────────────────
async function assignAWB(shipmentId) {
  const token = await getToken();
  const { data } = await axios.post(
    `${BASE}/courier/assign/awb`,
    { shipment_id: [String(shipmentId)] },
    { headers: authHeaders(token) },
  );
  return data; // { awb_assign_status, response: { data: { awb_code, courier_name } } }
}

// ─── SCHEDULE PICKUP ─────────────────────────────────────────────────────────
async function schedulePickup(shipmentId, pickupDate) {
  const token = await getToken();
  const body = { shipment_id: [String(shipmentId)] };
  if (pickupDate) body.pickup_date = [pickupDate];
  const { data } = await axios.post(`${BASE}/courier/generate/pickup`, body, {
    headers: authHeaders(token),
  });
  return data;
}

// ─── TRACK BY AWB ────────────────────────────────────────────────────────────
async function trackShipment(awbCode) {
  const token = await getToken();
  const { data } = await axios.get(`${BASE}/courier/track/awb/${awbCode}`, {
    headers: authHeaders(token),
  });
  return data; // { tracking_data: { shipment_track_activities: [...] } }
}

// ─── CANCEL ORDER ────────────────────────────────────────────────────────────
async function cancelOrder(orderId) {
  const token = await getToken();
  const { data } = await axios.post(
    `${BASE}/orders/cancel`,
    { ids: [orderId] },
    { headers: authHeaders(token) },
  );
  return data;
}

module.exports = { createOrder, assignAWB, schedulePickup, trackShipment, cancelOrder };
