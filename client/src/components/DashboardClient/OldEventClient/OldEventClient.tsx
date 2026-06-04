import { CalendarCheck } from "lucide-react";
import useEvents from "../../../hooks/useEvents";

import "./OldEventClient.css";

// l'user_id est en dur sur le 2 pour l'instant en attendant l'authentification
function OldEventClient() {
  const events = useEvents(2, "past");

  return (
    <section className="old-event-client__container">
      <h2 className="old-event-client__title">Événements passés</h2>

      {events.length === 0 ? (
        <p className="old-event-client__empty">Aucun événement passé.</p>
      ) : (
        <ul className="old-event-client__list">
          {events.map((event) => (
            <li key={event.id} className="old-event-client__item">
              <CalendarCheck className="old-event-client__icon" size={18} />
              <div className="old-event-client__info">
                <span className="old-event-client__name">{event.name}</span>
                <span className="old-event-client__date">
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

export default OldEventClient;
