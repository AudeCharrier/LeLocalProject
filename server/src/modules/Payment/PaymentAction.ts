import type { RequestHandler } from "express";
import paymentRepository from "./PaymentRepository";

const createIntent: RequestHandler = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const clientSecret = await paymentRepository.createPaymentIntent(amount);
    res.json({ clientSecret });
  } catch (err) {
    next(err);
  }
};

export default { createIntent };
