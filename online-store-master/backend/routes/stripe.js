const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post('/create-checkout-session', async (req, res) => {

    const line_items = req.body.cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
               name: item.name,
               images: [item.img],
               description: item.desc,
              metadata: {
                id: item.id,
              },
            },
            unit_amount: item.price * 100,
          },
          quantity: item.count,
        };
      });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/basket`,
  });

  res.send({url: session.url});
});

module.exports = router;