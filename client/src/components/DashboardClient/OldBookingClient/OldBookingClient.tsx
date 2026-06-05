import { Building2 } from "lucide-react";
import useSpacesClient from "../../../hooks/useSpacesClient";
import "./OldBookingClient.css";

function OldBookingClient() {
  const bookings = useSpacesClient(2, "past");
  return (
    <section className="old-booking-client__container">
      <h2 className="old-booking-client__title">Mes réservations passés</h2>

      {bookings.length === 0 ? (
        <p className="old-booking-client__empty">Aucune réservation passée.</p>
      ) : (
        <ul className="old-booking-client__list">
          {bookings.map((booking) => (
            <li key={booking.id} className="old-booking-client__item">
              <Building2 className="old-booking-client__icon" size={18} />
              <div className="old-booking-client__info">
                <span className="old-booking-client__name">
                  {booking.space_name}
                </span>
                <span className="old-booking-client__date">
                  {booking.start_date.slice(0, 10)} ·{" "}
                  {booking.start_hour.slice(0, 5)} -{" "}
                  {booking.end_hour.slice(0, 5)}
                </span>
              </div>
              <span className="old-booking-client__price">
                {booking.total_price} €
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default OldBookingClient;
