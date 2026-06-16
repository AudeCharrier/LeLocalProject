import { CalendarPlus } from "lucide-react";
import { useMemo } from "react";
import useUpcomingEvents from "../../../hooks/useUpcomingEvents";
import useEventParticipants from "../../../hooks/useEventParticipants";
import "./AdminEvents.css";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(price: number) {
  return price === 0 ? "Gratuit" : `${price}€`;
}

function getStatus(registered: number, capacity: number) {
  if (capacity === 0) {
    return { label: "Ouvert", tone: "open" };
  }

  const ratio = registered / capacity;

  if (ratio >= 0.8) {
    return { label: "Presque complet", tone: "warning" };
  }

  return { label: "Ouvert", tone: "open" };
}

function AdminEvents() {
  const events = useUpcomingEvents();
  const participants = useEventParticipants();

  const eventsWithParticipants = useMemo(
    () =>
      events.map((event) => {
        const participantData = participants.find(
          (participant) => participant.id_activity === event.id,
        );

        const registered = Number(participantData?.sum_participants ?? 0);
        const status = getStatus(registered, event.capacity);

        return {
          ...event,
          registered,
          statusLabel: status.label,
          statusTone: status.tone,
        };
      }),
    [events, participants],
  );

  return (
    <section className="admin-events">
      <header className="admin-events__header">
        <div>
          <p className="admin-events__eyebrow">Programme</p>
          <h2 className="admin-events__title">Événements</h2>
        </div>

        <button className="admin-events__button" type="button">
          <CalendarPlus size={18} />
          <span>Créer un événement</span>
        </button>
      </header>

      <div className="admin-events__table-scroll">
        <table className="admin-events__table">
          <thead>
            <tr>
              <th>Événement</th>
              <th>Date</th>
              <th>Espace</th>
              <th>Inscrits</th>
              <th>Prix</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {eventsWithParticipants.map((event) => (
              <tr key={event.id}>
                <td>
                  <div className="admin-events__event">
                    <p className="admin-events__event-name">{event.name}</p>
                    <p className="admin-events__event-category">
                      {event.description}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="admin-events__date-cell">
                    <p>{formatDate(event.start_date)}</p>
                    <p>
                      {event.start_hour.slice(0, 5)}–{event.end_hour.slice(0, 5)}
                    </p>
                  </div>
                </td>
                <td>{event.space_name}</td>
                <td>
                  <div className="admin-events__registered">
                    <p>{event.registered}</p>
                    <p>/ {event.capacity}</p>
                  </div>
                </td>
                <td className="admin-events__price">
                  {formatPrice(event.price_unit)}
                </td>
                <td>
                  <span
                    className={`admin-events__status admin-events__status--${event.statusTone}`}
                  >
                    {event.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminEvents;
