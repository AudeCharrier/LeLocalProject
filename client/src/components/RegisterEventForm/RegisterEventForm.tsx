import { useState } from "react";
interface QuantityConfig {
  value: number;
  min: number;
  max: number;
  error: "MIN_ERROR" | "MAX_ERROR" | null;
}

interface CartItem {
  users_id: number;
  event_id: number;
  quantity: number;
}

interface CardEventProps {
  event: {
    id: number;
    name: string;
    description: string;
    space_name: string;
    url_image: string;
    price_unit: number;
    start_date: string;
    start_hour: string;
    end_hour: string;
    capacity: number;
  };
  participants?: {
    id_activity: number;
    name: string;
    sum_participants: string;
    capacity: number;
  };
}

function RegisterEventForm({ event }: CardEventProps) {
  const [quantityConfig, setQuantityConfig] = useState<QuantityConfig>({
    value: 1,
    min: 1,
    max: 10,
    error: null,
  });

  const { value, min, max, error } = quantityConfig;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Bloque le rechargement automatique de la page par le navigateur
    e.preventDefault();

    // On construit l'objet proprement au moment du clic, avec la quantité à jour
    const payload: CartItem = {
      users_id: 2, //en dur pour l'instant
      event_id: event.id,
      quantity: quantityConfig.value,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // On indique au back qu'on lui envoie du JSON
          },
          body: JSON.stringify(payload), // On transforme notre objet JavaScript en chaîne de texte JSON
        },
      );

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
      <h2>S'inscrire à l'évènement</h2>
      <ul>
        <li>{event.name}</li>
        <li>
          {event.start_date &&
            `${event.start_date.slice(8, 10)}-${event.start_date.slice(5, 7)}-${event.start_date.slice(0, 4)}`}
        </li>
        <li>
          {event.start_hour?.slice(0, 5)} - {event.end_hour?.slice(0, 5)}
        </li>
        <li>{event.space_name}</li>
        <li> {event.price_unit === 0 ? "Gratuit" : `${event.price_unit} €`}</li>
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

      <button type="submit" className="sr-only">
        Je m'inscris !
      </button>
    </form>
  );
}

export default RegisterEventForm;
//changer en bdd le type de quantity et total price (cart) -> int !!
//calculer en backend la quantity*price_unit pour total_price
//css du formulaire
