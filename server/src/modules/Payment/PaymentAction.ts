import type { RequestHandler } from "express";
import paymentRepository from "./PaymentRepository";

const createIntent: RequestHandler = async (req, res, next) => {
  try {
    const { amount } = req.body;
    console.log("Amount reçu :", amount);

    if (!amount || amount <= 0) {
      res.status(400).json({ message: "Montant invalide." });
      return;
    }

    const clientSecret = await paymentRepository.createPaymentIntent(amount);
    res.json({ clientSecret });
  } catch (err) {
    next(err);
  }
};

export default { createIntent };
