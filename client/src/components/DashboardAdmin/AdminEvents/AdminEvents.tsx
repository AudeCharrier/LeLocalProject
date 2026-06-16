import { CalendarPlus } from "lucide-react";
import "./AdminEvents.css";

const adminEvents = [
  {
    name: "Soirée Pitch & Bière",
    category: "Networking",
    date: "12 juin 2026",
    time: "19h–22h",
    space: "Salle d'événements",
    registered: 54,
    capacity: 80,
    price: "Gratuit",
    status: "Ouvert",
    tone: "open",
  },
  {
    name: "Workshop No-Code",
    category: "Formation",
    date: "18 juin 2026",
    time: "14h–17h",
    space: "Lab Numérique",
    registered: 12,
    capacity: 15,
    price: "5€",
    status: "Presque complet",
    tone: "warning",
  },
  {
    name: "Rencontre Makers",
    category: "Communauté",
    date: "25 juin 2026",
    time: "18h–21h",
    space: "Openspace Principal",
    registered: 38,
    capacity: 60,
    price: "Gratuit",
    status: "Ouvert",
    tone: "open",
  },
  {
    name: "Concert Intimiste",
    category: "Culture",
    date: "5 juillet 2026",
    time: "20h–23h",
    space: "Salle d'événements",
    registered: 87,
    capacity: 100,
    price: "Gratuit",
    status: "Presque complet",
    tone: "warning",
  },
  {
    name: "Hackathon Transition Écologique",
    category: "Hackathon",
    date: "19–20 juillet 2026",
    time: "9h–21h",
    space: "Toute La Forge",
    registered: 73,
    capacity: 120,
    price: "Gratuit",
    status: "Ouvert",
    tone: "open",
  },
  {
    name: "Atelier Sérigraphie",
    category: "Art",
    date: "2 août 2026",
    time: "10h–13h",
    space: "Atelier Menuiserie",
    registered: 5,
    capacity: 8,
    price: "12€",
    status: "Ouvert",
    tone: "open",
  },
] as const;

function AdminEvents() {
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
            {adminEvents.map((event) => (
              <tr key={event.name}>
                <td>
                  <div className="admin-events__event">
                    <p className="admin-events__event-name">{event.name}</p>
                    <p className="admin-events__event-category">
                      {event.category}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="admin-events__date-cell">
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                </td>
                <td>{event.space}</td>
                <td>
                  <div className="admin-events__registered">
                    <p>{event.registered}</p>
                    <p>/ {event.capacity}</p>
                  </div>
                </td>
                <td className="admin-events__price">{event.price}</td>
                <td>
                  <span
                    className={`admin-events__status admin-events__status--${event.tone}`}
                  >
                    {event.status}
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
