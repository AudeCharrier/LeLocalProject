import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./Payment.css";
import { useAuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../hooks/apiFetch";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Payment() {
  const user = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const totalPrice = location.state?.totalPrice ?? 0;
  const cartItems = location.state?.cartItems ?? [];

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    apiFetch("/api/payment/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  if (!clientSecret) {
    return <p>Chargement du paiement...</p>;
  }

  return (
    <section className="payment-page">
      <h1>Finaliser votre commande</h1>
      <p>
        Total à payer : <strong>{totalPrice} €</strong>
      </p>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm
          totalPrice={totalPrice}
          userId={user?.id ?? 0}
          cartItems={cartItems}
          onSuccess={() => navigate("/confirmation")}
        />
      </Elements>
    </section>
  );
}

export default Payment;
