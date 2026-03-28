/**
 * Notification service — currently stubs that log to console.
 * Wire up Nodemailer / Twilio / SendGrid here when ready.
 * Each function accepts plain data objects so callers don't need to know
 * the delivery mechanism.
 */

function log(event, details) {
  console.log(`[NOTIFY] ${event}`, JSON.stringify(details, null, 2));
}

async function notifyShipmentCreated({ brand, sampler, productName, awbCode, courierName }) {
  log('SHIPMENT_CREATED', { brand: brand?.email, sampler: sampler?.email, productName, awbCode, courierName });
  // TODO: send email to sampler: "Your sample is on its way!"
  // TODO: send email to brand: "Shipment created for {sampler.first_name}"
}

async function notifyPickupScheduled({ brand, productName, pickupDate }) {
  log('PICKUP_SCHEDULED', { brand: brand?.email, productName, pickupDate });
  // TODO: send email to brand: "Pickup confirmed for {pickupDate}"
}

async function notifyShipped({ sampler, productName, awbCode, trackingUrl }) {
  log('SHIPPED', { sampler: sampler?.email, productName, awbCode, trackingUrl });
  // TODO: send email/SMS to sampler: "Your sample has shipped — track it here: {trackingUrl}"
}

async function notifyDelivered({ sampler, productName, feedbackDueAt }) {
  log('DELIVERED', { sampler: sampler?.email, productName, feedbackDueAt });
  // TODO: send email/SMS to sampler: "Your sample has arrived! Please share your feedback by {feedbackDueAt}"
}

module.exports = { notifyShipmentCreated, notifyPickupScheduled, notifyShipped, notifyDelivered };
