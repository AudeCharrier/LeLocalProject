import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createPaymentIntent = async (amount: number) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // centimes
    currency: "eur",
  });

  return paymentIntent.client_secret;
};

export default { createPaymentIntent };
