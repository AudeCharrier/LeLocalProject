import { Building2 } from "lucide-react";
import "./UpcomingBookingClient.css";
import useSpacesClient from "../../../hooks/useSpacesClient";

function UpcomingBookingClient() {
  const bookings = useSpacesClient(2, "upcoming");

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
                <span className="upcoming-booking-client__date">
                  {booking.start_date.slice(0, 10)} ·{" "}
                  {booking.start_hour.slice(0, 5)} -{" "}
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
