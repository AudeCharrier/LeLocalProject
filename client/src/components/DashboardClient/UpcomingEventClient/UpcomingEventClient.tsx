import { CalendarClock } from "lucide-react";
import useEventsClient from "../../../hooks/useEventsClient";
import "./UpcomingEventClient.css";

// l'user_id est en dur sur le 2 pour l'instant en attendant l'authentification
function UpcomingEventClient() {
  const events = useEventsClient(2, "upcoming");

  return (
    <section className="upcoming-event-client__container">
      <h2 className="upcoming-event-client__title">Événements à venir</h2>

      {events.length === 0 ? (
        <p className="upcoming-event-client__empty">Aucun événement à venir.</p>
      ) : (
        <ul className="upcoming-event-client__list">
          {events.map((event) => (
            <li key={event.id} className="upcoming-event-client__item">
              <CalendarClock
                className="upcoming-event-client__icon"
                size={18}
              />
              <div className="upcoming-event-client__info">
                <span className="upcoming-event-client__name">
                  {event.name}
                </span>
                <span className="upcoming-event-client__date">
                  {event.start_date.slice(0, 10)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UpcomingEventClient;
