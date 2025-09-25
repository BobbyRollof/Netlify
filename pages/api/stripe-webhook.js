import Stripe from 'stripe';
import { incrEarlySold } from '../../lib/inventory';

export const config = { api: { bodyParser: false } }; // raw body nodig voor verificatie

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
});

async function getRawBody(req) {
  return await new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const sig = req.headers['stripe-signature'];
  const buf = await getRawBody(req);

  let event;
  try {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const ticketType = session.metadata?.ticket_type;

    // Alleen Early Bird telt mee voor de cap
    if (ticketType === 'early') {
      try {
        const total = await incrEarlySold(1);
        console.log('✅ Early sold incremented. Total =', total);
      } catch (e) {
        console.error('❌ Failed to increment Early sold', e);
      }
    }
  }

  res.status(200).send('ok');
}