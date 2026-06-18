import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { apiFetch } from "../../hooks/apiFetch";

interface Props {
  totalPrice: number;
  userId: number;
  cartItems: { id_activity: number; quantity: number; price_unit: number }[];
  onSuccess: () => void;
}

function CheckoutForm({ totalPrice, userId, cartItems, onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isPaid, setIsPaid] = useState(false); // ← ajoute ça

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || isPaid) return; // ← bloque si déjà payé

    setIsLoading(true);
    setErrorMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "Une erreur est survenue.");
    } else {
      setIsPaid(true); // ← marque comme payé pour bloquer tout nouveau submit

      const response = await apiFetch("/api/booking", {
        method: "POST",
        body: JSON.stringify({ userId, cartItems }),
      });

      console.log("Réponse booking :", response.status);
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Paiement sécurisé</h2>

      <PaymentElement />

      {errorMessage && <p className="checkout-error">{errorMessage}</p>}

      <button type="submit" disabled={isLoading || !stripe}>
        {isLoading ? "Traitement..." : `Payer ${totalPrice} €`}
      </button>
    </form>
  );
}

export default CheckoutForm;
