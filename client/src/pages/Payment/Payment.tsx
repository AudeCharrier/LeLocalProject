import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./Payment.css";
import useClearCart from "../../hooks/useClearCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Payment() {
  // récupèrer les données passées par la page précédente (plus rapide que bdd)
  const location = useLocation();
  const totalPrice = location.state?.totalPrice ?? 0;
  const cartItems = location.state?.cartItems ?? [];
  const userId = location.state?.userId ?? 1;
  //il détecte PAS le state.userId..... mais on verra après l'authentification
  const [clientSecret, setClientSecret] = useState("");

  // récupérer la fonction vider le panier
  const clearCart = useClearCart();

  useEffect(() => {
    fetch("http://localhost:3310/api/payment/create-intent", {
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

  // événement de succès
  const handlePaymentSuccess = async () => {
    if (!userId) {
      console.error(
        "Impossible de vider le panier : pas d'ID utilisateur trouvé dans location.",
      );
      return;
    }

    // si on a bien un userId en location, on clear le panier (et redirection page confirmation dans le hook)
    await clearCart(userId);
  };

  return (
    <section className="payment-page">
      <h1>Finaliser votre commande</h1>
      <p>
        Total à payer : <strong>{totalPrice} €</strong>
      </p>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm
          totalPrice={totalPrice}
          userId={1}
          cartItems={cartItems}
          onSuccess={handlePaymentSuccess}
        />
      </Elements>
    </section>
  );
}

export default Payment;
