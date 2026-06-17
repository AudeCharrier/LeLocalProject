import { useEffect, useState } from "react";
import type { Space } from "../../../../../types/space";
import "./BookingForm.css";
import { useNavigate } from "react-router";
import useSpaceAvailability from "../../../../../hooks/useSpaceAvailability";
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
  const [months, _setMonths] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const timeSlots = useTimeSlot();
  const timeSlot = timeSlots.filter((time) => time.slot !== "Soir");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const isOpenSpace = space.space_category.toLowerCase().includes("open");
  const isLocal = space.space_category === "Local vide";
  const navigate = useNavigate();

  const previewEndDate =
    isLocal && date
      ? (() => {
          const start = new Date(date);
          start.setMonth(start.getMonth() + months);
          return start.toISOString().split("T")[0];
        })()
      : undefined;

  const { availability, loading: availabilityLoading } = useSpaceAvailability(
    space.id,
    date,
    isLocal ? undefined : selectedTimeSlot,
    isLocal ? previewEndDate : undefined,
  );
  const isExclusiveSpace = !isOpenSpace;
  const isUnavailable =
    isExclusiveSpace && availability != null && availability.available === 0;

  const maxSeats = isOpenSpace
    ? Math.min(space.capacity, availability?.available ?? space.capacity)
    : space.capacity;

  useEffect(() => {
    if (isOpenSpace && availability && seats > (availability?.available ?? 0)) {
      setSeats(
        (availability?.available ?? 0) > 0 ? (availability?.available ?? 0) : 1,
      );
    }
  }, [availability, isOpenSpace, seats]);
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
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Erreur lors de la réservation");
      }

      setSuccess(true);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue, veuillez réessayer.",
      );
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

      {isOpenSpace && (availability?.available ?? 0) > 0 && (
        <label className="booking-form-label">
          Nombre de places
          <input
            type="number"
            min={1}
            max={maxSeats}
            value={seats}
            onChange={(e) => {
              const raw = Number(e.target.value);
              if (Number.isNaN(raw)) return;
              const clamped = Math.min(Math.max(raw, 1), maxSeats);
              setSeats(clamped);
            }}
            className="booking-form-input"
          />
        </label>
      )}
      {date && selectedTimeSlot && (
        <span className="booking-form-availability">
          {availabilityLoading
            ? "Vérification des disponibilités..."
            : availability
              ? (availability?.available ?? 0) > 0
                ? `${availability.available} place${(availability?.available ?? 0) > 1 ? "s" : ""} disponible${(availability?.available ?? 0) > 1 ? "s" : ""} sur ${availability.capacity}`
                : "Aucune place disponible pour ce créneau"
              : null}
        </span>
      )}
      {isExclusiveSpace && date && (selectedTimeSlot || previewEndDate) && (
        <p className="booking-form-availability">
          {availabilityLoading
            ? "Vérification des disponibilités..."
            : availability
              ? (availability?.available ?? 0) > 0
                ? isLocal
                  ? "Cette période est disponible"
                  : "Ce créneau est disponible"
                : isLocal
                  ? "Cet espace est déjà réservé sur une période qui chevauche ces dates"
                  : "Ce créneau est déjà réservé pour cet espace"
              : null}
        </p>
      )}
      {(availability?.available ?? 0) > 0 && (
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
      )}
      {(availability?.available ?? 0) > 0 && (
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
      )}
      {(availability?.available ?? 0) > 0 && (
        <p className="booking-form-price">
          {isOpenSpace &&
            `${seats} place${seats > 1 ? "s" : ""} : ${totalPrice}€`}
          {isLocal && `${months} mois : ${totalPrice}€`}
          {!isOpenSpace && !isLocal && `${totalPrice}€`}
        </p>
      )}
      {errorMsg && <p className="booking-form-error">{errorMsg}</p>}
      {!isUnavailable && (
        <button
          type="submit"
          className="booking-form-submit"
          disabled={
            submitting ||
            (isOpenSpace && availability?.available === 0) ||
            isUnavailable
          }
        >
          {submitting ? "Envoi..." : "Confirmer la réservation"}
        </button>
      )}
    </form>
  );
}

export default BookingForm;
