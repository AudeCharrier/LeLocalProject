import { useState } from "react";
import type { Space } from "../../../../../types/space";
import "./BookingForm.css";
import { useNavigate } from "react-router";
import useTimeSlot from "../../../../../hooks/useTimeSlot";
import type { TimeSlot } from "../../../../../types/time-slot";
type BookingFormProps = {
  space: Space;
  onBack: () => void;
  userId: number;
};

function BookingForm({ space, onBack, userId }: BookingFormProps) {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(1);
  const [months, setMonths] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const timeSlots = useTimeSlot();
  const timeSlot = timeSlots.filter((time) => time.slot !== "Soir");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const isOpenSpace = space.space_category.toLowerCase().includes("open");
  const isLocal = space.space_category === "Local vide";
  const navigate = useNavigate();

  const isFullDay =
    timeSlots.find((s) => String(s.id) === selectedTimeSlot)?.slot ===
    "Journée";
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const totalPrice = isOpenSpace
    ? space.price_unit * seats * (isFullDay ? 1.75 : 1)
    : isLocal
      ? space.price_unit * months
      : space.price_unit * (isFullDay ? 1.75 : 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      let endDate = date;
      if (isLocal && date) {
        const start = new Date(date);
        start.setMonth(start.getMonth() + months);
        endDate = start.toISOString().split("T")[0];
      }

      const payload = {
        space_id: space.id,
        time_slot_id: isLocal ? null : Number(selectedTimeSlot),
        start_date: date,
        end_date: endDate,
        seats: isOpenSpace ? seats : null,
        months: isLocal ? months : null,
        users_id: userId ?? 2,
        total_price: totalPrice,
        name,
        email,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la réservation");
      }

      setSuccess(true);
    } catch (err) {
      setErrorMsg("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="booking-form">
        <h2 className="booking-form-title">Ajouté au panier</h2>
        <p>
          Votre réservation pour {space.space_name} le {formattedDate} a été
          ajoutée à votre panier.
        </p>
        <div className="booking-form-button-div">
          <button
            type="button"
            className="booking-form-go-cart"
            onClick={() => navigate("/cart")}
          >
            ‹ Voir votre panier
          </button>
          <button type="button" className="booking-form-back" onClick={onBack}>
            ‹ Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <button type="button" className="booking-form-back" onClick={onBack}>
        ‹ Retour
      </button>

      <h2 className="booking-form-title">Réserver — {space.space_name}</h2>

      <label className="booking-form-label">
        Date
        <input
          type="date"
          className="booking-form-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      {!isLocal && (
        <label className="booking-form-label">
          Créneau
          <select
            className="booking-form-input"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            required
          >
            <option value="">Sélectionnez un créneau</option>
            {timeSlot.map((slot: TimeSlot) => (
              <option key={slot.id} value={slot.id}>
                {slot.slot}
              </option>
            ))}
          </select>
        </label>
      )}

      {isOpenSpace && (
        <label className="booking-form-label">
          Nombre de places
          <input
            type="number"
            min={1}
            max={space.capacity}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="booking-form-input"
          />
        </label>
      )}

      {isLocal && (
        <label className="booking-form-label">
          Nombre de mois
          <input
            type="number"
            min={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="booking-form-input"
          />
        </label>
      )}

      <label className="booking-form-label">
        Nom
        <input
          type="text"
          className="booking-form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="booking-form-label">
        Email
        <input
          type="email"
          className="booking-form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <p className="booking-form-price">
        {isOpenSpace &&
          `${seats} place${seats > 1 ? "s" : ""} : ${totalPrice}€`}
        {isLocal && `${months} mois : ${totalPrice}€`}
        {!isOpenSpace && !isLocal && `${totalPrice}€`}
      </p>

      {errorMsg && <p className="booking-form-error">{errorMsg}</p>}

      <button
        type="submit"
        className="booking-form-submit"
        disabled={submitting}
      >
        {submitting ? "Envoi..." : "Confirmer la réservation"}
      </button>
    </form>
  );
}

export default BookingForm;
