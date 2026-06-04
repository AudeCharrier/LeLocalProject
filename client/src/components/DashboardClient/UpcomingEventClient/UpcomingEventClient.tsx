import { CalendarClock } from "lucide-react";
import type { Activity } from "../../../types/activity";
import "./UpcomingEventClient.css";

const FAKE_UPCOMING_EVENTS: Activity[] = [
  {
    id: 1,
    name: "Soirée Pitch & Bière",
    space_name: "Salle de concert",
    start_date: "2026-06-12",
    end_date: "2026-06-12",
    start_hour: "19:00:00",
    end_hour: "22:00:00",
    price_unit: 0,
  },
  {
    id: 2,
    name: "Hackathon Transition Écologique",
    space_name: "Amphithéâtre",
    start_date: "2026-07-18",
    end_date: "2026-07-20",
    start_hour: "09:00:00",
    end_hour: "18:00:00",
    price_unit: 10,
  },
];

// TODO: remplacer les fausses data par un import du hook quand le back sera prêt :
// import useEvents from "../../../hooks/useEvents";
// const events = useEvents(1, "upcoming"); -----> 1 = userId en dur, à remplacer par l'id du user connecté
// quand on aura fait l'authentification!

function UpcomingEventClient() {
  const events = FAKE_UPCOMING_EVENTS;

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
                  {event.start_date}
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
