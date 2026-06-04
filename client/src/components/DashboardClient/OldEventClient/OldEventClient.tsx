import { CalendarCheck } from "lucide-react";
import type { Activity } from "../../../types/activity";
import "./OldEventClient.css";

const FAKE_OLD_EVENTS: Activity[] = [
  {
    id: 1,
    name: "Rencontre Makers",
    space_name: "Salle de concert",
    start_date: "2026-04-20",
    end_date: "2026-04-20",
    start_hour: "18:00:00",
    end_hour: "21:00:00",
    price_unit: 0,
  },
  {
    id: 2,
    name: "Concert Intimiste",
    space_name: "Amphithéâtre",
    start_date: "2026-03-08",
    end_date: "2026-03-08",
    start_hour: "20:00:00",
    end_hour: "23:00:00",
    price_unit: 15,
  },
  {
    id: 3,
    name: "Workshop No-Code",
    space_name: "Salle de concert",
    start_date: "2026-02-14",
    end_date: "2026-02-14",
    start_hour: "14:00:00",
    end_hour: "17:00:00",
    price_unit: 5,
  },
];

// TODO: remplacer les fausses data par un import du hook quand le back sera prêt :
// import useEvents from "../../../hooks/useEvents";
// const events = useEvents(1, "past"); -----> 1 = userId en dur, à remplacer par l'id du user connecté
// quand on aura fait l'authentification!

function OldEventClient() {
  const events = FAKE_OLD_EVENTS;

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

export default OldEventClient;
