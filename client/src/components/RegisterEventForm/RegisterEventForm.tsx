import "./RegisterEventForm.css";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../hooks/apiFetch";
import { useEventModalContext } from "../../hooks/useEventModalContext";
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
    sum_participants: number;
    remaining_slots: number;
    capacity: number;
  };
}

function RegisterEventForm({ event, participants }: CardEventProps) {
  const user = useAuthContext();
  const { setIsForm } = useEventModalContext();

  const [quantityConfig, setQuantityConfig] = useState<QuantityConfig>({
    value: 1,
    min: 1,
    max: participants?.remaining_slots ?? event.capacity,
    error: null,
  });

  const { value, min, max, error } = quantityConfig;
  const [message, setMessage] = useState<string>("");

  const totalPrice = quantityConfig.value * event.price_unit;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // on sauvegarde le formulaire avant le await
    const form = e.currentTarget;

    // On construit l'objet proprement au moment du clic, avec la quantité à jour
    const eventBookingPayload: CartItem = {
      users_id: user?.id ?? 0,
      event_id: event.id,
      quantity: quantityConfig.value,
      total_price: totalPrice,
    };
    try {
      const response = await apiFetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventBookingPayload),
      });

      if (response.status === 201) {
        setMessage("Inscription ajoutée au panier !");
        form.reset();

        // remettre la quantité à 1 après succès
        setQuantityConfig((prev) => ({ ...prev, value: 1, error: null }));
      } else if (response.status === 409) {
        const data = await response.json();
        // data.remaining_slots contient le nombre réel de places renvoyé par ton back
        setMessage(
          `Désolé, il ne reste plus que ${data.remaining_slots} place(s) disponible(s).`,
        );

        // Optionnel : tu peux mettre à jour le max du formulaire en temps réel
        setQuantityConfig((prev) => ({ ...prev, max: data.remaining_slots }));
      } else {
        setMessage("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (err) {
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
    <article className="register-form-overlay">
      <form
        className="register-form"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="register-form-container-title-button">
          <h2 className="register-form-title">S'inscrire à l'évènement</h2>
          <button
            type="button"
            className="register-event-modal-close"
            aria-label="Fermer la pop-up d'inscription"
            onClick={() => setIsForm(false)}
          >
            ✕
          </button>
        </div>
        <ul className="register-form-events-infos-container">
          <li className="register-form-events-infos-row">{event.name}</li>
          <li className="register-form-events-infos-row">
            {event.start_date &&
              `${event.start_date.slice(8, 10)}-${event.start_date.slice(5, 7)}-${event.start_date.slice(0, 4)}`}{" "}
            | {event.start_hour?.slice(0, 5)} - {event.end_hour?.slice(0, 5)}
          </li>
          <li className="register-form-events-infos-row">
            {event.space_name} -{" "}
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
            placeholder="Votre nom"
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
            placeholder="Votre prénom"
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
            placeholder="Votre email"
            required
            className="register-form-input"
          />

          <div className="register-form-quantity">
            <div className="register-form-quantity-selector">
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
            </div>

            <p className="register-form-total-price">
              Total : {totalPrice === 0 ? "Gratuit" : `${totalPrice}€`}
            </p>
          </div>
        </div>
        {/* affichage conditionnel des messages d'erreur liés au nb de places*/}
        {error === "MIN_ERROR" && (
          <span className="register-form-span-places-msg">
            Réservez au moins {min} place.
          </span>
        )}

        {error === "MAX_ERROR" && (
          <span className="register-form-span-places-msg">
            Désolé, il ne reste plus que ${max} place(s) disponible(s).
          </span>
        )}

        <button
          type="submit"
          className="register-form-submit"
          aria-label="Valider mon inscription"
        >
          Je m'inscris !
        </button>
        {message && (
          <span className="register-form-confirmation-message">{message}</span>
        )}
      </form>
    </article>
  );
}

export default RegisterEventForm;

//css du formulaire
