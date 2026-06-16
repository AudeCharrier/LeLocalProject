import "./RegisterEventForm.css";

import { useState } from "react";
import type { CartItem } from "../../types/cartitem";
import type { QuantityConfig } from "../../types/quantityconfig";

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

  const [message, setMessage] = useState<string>("");

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
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.status === 201) {
        setMessage("Inscription ajoutée au panier !");
        e.currentTarget.reset();
        // remettre la quantité à 1 après succès
        setQuantityConfig((prev) => ({ ...prev, value: 1, error: null }));
      } else {
        setMessage("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (err) {
      // Gère le cas où le serveur est injoignable ou crashé
      setMessage("Impossible de contacter le serveur.");
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
    <>
      <form
        className="register-form"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <h2 className="register-form-title">S'inscrire à l'évènement</h2>
        <ul className="register-form-events-infos-container">
          <li className="register-form-events-infos-row">{event.name}</li>
          <li className="register-form-events-infos-row">
            {event.start_date &&
              `${event.start_date.slice(8, 10)}-${event.start_date.slice(5, 7)}-${event.start_date.slice(0, 4)}`}
          </li>
          <li className="register-form-events-infos-row">
            {event.start_hour?.slice(0, 5)} - {event.end_hour?.slice(0, 5)}
          </li>
          <li className="register-form-events-infos-row">{event.space_name}</li>
          <li className="register-form-events-infos-row">
            {" "}
            {event.price_unit === 0 ? "Gratuit" : `${event.price_unit} €`}
          </li>
        </ul>
        <div className="register-form-customer-infos-container">
          <label htmlFor="lastname" className="register-form-label">
            Nom
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="nom user rempli auto si connecté"
            required
            className="register-form-input"
          />

          <label htmlFor="firstname" className="register-form-label">
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="prénom user rempli auto si connecté"
            required
            className="register-form-input"
          />

          <label htmlFor="email" className="register-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email user rempli auto si connecté"
            required
            className="register-form-input"
          />

          <div className="register-quantity-selector">
            <label htmlFor="quantity" className="register-form-label">
              Nombre de places
            </label>
            {/*bouton -1 */}
            <button
              type="button"
              onClick={decreaseQuantity}
              className="btn-quantity"
              aria-label="Retirer une place" //accessibilité, lit le bouton
              aria-disabled={value === min} // accessibilité : indique le blocage sans couper le JavaScript
            >
              -
            </button>
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
              className="btn-quantity"
              aria-label="Ajouter une place" //accessibilité, lit le bouton
              aria-disabled={value === max} // accessibilité : indique le blocage sans couper le JavaScript
            >
              +
            </button>

            {/* affichage conditionnel des messages d'erreur*/}
            {error === "MIN_ERROR" && (
              <span className="register-form-span-msg">
                Réservez au moins {min} place.
              </span>
            )}

            {error === "MAX_ERROR" && (
              <span className="register-form-span-msg">
                Vous ne pouvez pas réserver plus de {max} places.
              </span>
            )}
          </div>
        </div>

        <button type="submit" className="register-form-submit">
          Je m'inscris !
        </button>
      </form>
      {message && <span>{message}</span>}
    </>
  );
}

export default RegisterEventForm;

//css du formulaire
