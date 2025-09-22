import Stripe from 'stripe';
export const config = { api: { bodyParser: false } }; // raw body nodig voor verificatie

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const sig = req.headers['stripe-signature'];
  const buf = await getRawBody(req);

  let event;
  try {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // verkrijg in Stripe Dashboard
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handel relevante events af
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Voorbeeld: loggen (vervang door eigen opslag)
    console.log('✅ Betaald:', {
      email: session.customer_details?.email,
      amount_total: session.amount_total,
      ticket_type: session.metadata?.ticket_type
    });
    // TODO: stuur bevestigingsmail of schrijf weg naar Google Sheet
  }

  res.status(200).send('ok');
}

// Helpers
async function getRawBody(req) {
  return await new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}