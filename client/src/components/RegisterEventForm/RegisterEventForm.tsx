import { useState } from "react";
interface QuantityConfig {
  value: number;
  min: number;
  max: number;
  error: "MIN_ERROR" | "MAX_ERROR" | null;
}
interface CartPayload {
  event_name: string;
  event_date: string;
  user_email: string;
  quantity: number;
}

function RegisterEventForm() {
  const [quantityConfig, setQuantityConfig] = useState<QuantityConfig>({
    value: 1,
    min: 1,
    max: 10,
    error: null,
  });

  const { value, min, max, error } = quantityConfig;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Bloque le rechargement automatique de la page par le navigateur
    event.preventDefault();

    // À remplacer plus tard par l'ID utilisateur connecté
    const userId = "42";

    // On construit l'objet proprement au moment du clic, avec la quantité à jour
    const payload: CartPayload = {
      event_name: "Nom de ton événement récupéré",
      event_date: "2026-07-15",
      user_email: "email.du.user@test.com",
      quantity: quantityConfig.value,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // On indique au back qu'on lui envoie du JSON
          },
          body: JSON.stringify(payload), // On transforme notre objet JavaScript en chaîne de texte JSON
        },
      );

      if (!response.ok) {
        throw new Error("Impossible d'ajouter l'événement au panier.");
      }

      const data = await response.json();
      console.log("Réponse du serveur réussie :", data);

      // Optionnel : ajouter ici un message de succès à l'écran ou une redirection
      alert("Inscription ajoutée au panier !");
    } catch (error) {
      console.error("Erreur lors du fetch :", error);
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  }

  function decreaseQuantity() {
    if (value === min) {
      // Si on est déjà au minimum, on déclenche l'erreur
      setQuantityConfig({ ...quantityConfig, error: "MIN_ERROR" });
      return;
    }

    // Sinon, on baisse la quantité et on retire l'erreur éventuelle
    setQuantityConfig({
      ...quantityConfig,
      value: value - 1,
      error: null,
    });
  }

  function increaseQuantity() {
    if (value === max) {
      // Si on est déjà au maximum, on déclenche l'erreur
      setQuantityConfig({ ...quantityConfig, error: "MAX_ERROR" });
      return;
    }

    // Sinon, on augmente la quantité et on retire l'erreur éventuelle
    setQuantityConfig({
      ...quantityConfig,
      value: value + 1,
      error: null,
    });
  }

  return (
    <form
      className="register-form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <h2>S'inscire à l'évènement</h2>
      <ul>
        <li>insérer nom event depuis cardevent</li>
        <li>insérer date event depuis cardevent</li>
        <li>insérer heure event depuis cardevent</li>
        <li>insérer lieu event depuis cardevent</li>
        <li>insérer prix event depuis cardevent</li>
      </ul>
      <div>
        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="nom user rempli auto si connecté"
          required
        />

        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="prénom user rempli auto si connecté"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email user rempli auto si connecté"
          required
        />

        <div className="register-quantity-selector">
          {/*bouton -1 */}
          <button
            type="button"
            onClick={decreaseQuantity}
            aria-label="Retirer une place" //accessibilité, lit le bouton
            aria-disabled={value === min} // accessibilité : indique le blocage sans couper le JavaScript
          >
            -
          </button>

          <label htmlFor="quantity">Nombre de places</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantityConfig.value}
            min={min}
            max={max}
            readOnly
          />

          {/*bouton +1 */}
          <button
            type="button"
            onClick={increaseQuantity}
            aria-label="Ajouter une place" //accessibilité, lit le bouton
            aria-disabled={value === max} // accessibilité : indique le blocage sans couper le JavaScript
          >
            +
          </button>

          {/* affichage conditionnel des messages d'erreur*/}
          {error === "MIN_ERROR" && <span>Réservez au moins {min} place.</span>}

          {error === "MAX_ERROR" && (
            <span>Vous ne pouvez pas réserver plus de {max} places.</span>
          )}
        </div>
      </div>

      <button type="submit">Je m'inscris !</button>
    </form>
  );
}

export default RegisterEventForm;
