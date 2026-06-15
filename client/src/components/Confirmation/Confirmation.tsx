import { Link } from "react-router";
import "./Confirmation.css";

function Confirmation() {
  return (
    <section className="confirmation-page">
      <h1>Paiement confirmé ! 🎉</h1>

      <p>Merci pour votre commande, elle a bien été prise en compte.</p>

      <Link to="/">Retour à l'accueil</Link>
    </section>
  );
}

export default Confirmation;
