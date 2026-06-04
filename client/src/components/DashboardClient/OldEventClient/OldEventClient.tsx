import { CalendarCheck } from "lucide-react";
import type { Activity } from "../../../types/activity";
import "./OldEventClient.css";

// Fausses data en attendant la sacrée BDD
const FAKE_OLD_EVENTS: Activity[] = [
  {
    id: 1,
    nom: "Rencontre Makers",
    salle: "Salle de concert",
    date_debut: "20-04-2026",
    date_fin: "20-04-2026",
    prix: 0,
  },
  {
    id: 2,
    nom: "Concert Intimiste",
    salle: "Amphithéâtre",
    date_debut: "08-03-2026",
    date_fin: "08-03-2026",
    prix: 15,
  },
  {
    id: 3,
    nom: "Workshop No-Code",
    salle: "Salle de concert",
    date_debut: "14-02-2026",
    date_fin: "14-02-2026",
    prix: 5,
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
                <span className="old-event-client__name">{event.nom}</span>
                <span className="old-event-client__date">
                  {event.date_debut}
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
