import { useState } from "react";
import type { Space } from "../../../../../types/space";
import "./BookingForm.css";

type BookingFormProps = {
  space: Space;
  onBack: () => void;
};

function BookingForm({ space, onBack }: BookingFormProps) {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("matin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [seats, setSeats] = useState(1);
  const [months, setMonths] = useState(1);

  const isOpenSpace = space.space_category.toLowerCase().includes("open");

  const isLocal = space.space_category === "Local vide";

  const totalPrice = isOpenSpace
    ? space.price_unit * seats
    : isLocal
      ? space.price_unit * months
      : space.price_unit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      spaceId: space.id,
      date,
      timeSlot,
      name,
      email,
      seats: isOpenSpace ? seats : undefined,
      months: isLocal ? months : undefined,
      totalPrice,
    };

    console.log(bookingData);
  };

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
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="matin">Matin</option>
            <option value="apres-midi">Après-midi</option>
            <option value="journee">Journée complète</option>
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

      <button type="submit" className="booking-form-submit">
        Confirmer la réservation
      </button>
    </form>
  );
}

export default BookingForm;
