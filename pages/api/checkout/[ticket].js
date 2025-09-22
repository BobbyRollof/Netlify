import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
});

// Map ticket slug -> Stripe Price ID (uit .env.local)
const PRICE_MAP = {
  early: process.env.STRIPE_PRICE_EARLY,
  regular: process.env.STRIPE_PRICE_REGULAR,
  late: process.env.STRIPE_PRICE_LATE
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { ticket } = req.query;
  const priceId = PRICE_MAP[ticket];
  if (!priceId) return res.status(400).json({ error: 'Unknown ticket type' });

  try {
    const origin = req.headers.origin || process.env.PUBLIC_BASE_URL || 'http://localhost:3000';

    // Maak een Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      payment_method_types: ['card', 'ideal', 'bancontact'],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      // Metadata handig voor later (webhooks / exports)
      metadata: { ticket_type: ticket }
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({ error: 'Stripe session failed' });
  }
}