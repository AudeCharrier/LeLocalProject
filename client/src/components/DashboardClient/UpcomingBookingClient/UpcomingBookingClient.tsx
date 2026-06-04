import { Building2 } from "lucide-react";
import type { Booking } from "../../../types/booking";
import "./UpcomingBookingClient.css";

const FAKE_UPCOMING_BOOKINGS: Booking[] = [
  {
    id: 7,
    name: "space name",
    space_name: "OpenSpace Principal",
    space_type: "Coworking",
    start_date: "2026-06-11",
    end_date: "2026-06-11",
    start_hour: "08:00:00",
    end_hour: "14:00:00",
    total_price: 8,
    quantity: 1,
  },
];

// TODO: remplacer les fausses data par le hook quand disponible :
// import useBookings from "../../../hooks/useBookings";
// const bookings = useBookings(2, "upcoming");

function UpcomingBookingClient() {
  const bookings = FAKE_UPCOMING_BOOKINGS;

  return (
    <section className="upcoming-booking-client__container">
      <h2 className="upcoming-booking-client__title">
        Mes réservations d'espaces
      </h2>

      {bookings.length === 0 ? (
        <p className="upcoming-booking-client__empty">
          Aucune réservation à venir.
        </p>
      ) : (
        <ul className="upcoming-booking-client__list">
          {bookings.map((booking) => (
            <li key={booking.id} className="upcoming-booking-client__item">
              <Building2 className="upcoming-booking-client__icon" size={18} />
              <div className="upcoming-booking-client__info">
                <span className="upcoming-booking-client__name">
                  {booking.space_name}
                </span>
                <span className="upcoming-booking-client__meta">
                  {booking.start_date} · {booking.start_hour.slice(0, 5)} -{" "}
                  {booking.end_hour.slice(0, 5)}
                </span>
              </div>
              <span className="upcoming-booking-client__price">
                {booking.total_price} €
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UpcomingBookingClient;
