import { Users } from "lucide-react";
import "./AdminSpaces.css";

const spaceGroups = [
  {
    title: "Espaces",
    items: [
      {
        category: "Coworking",
        name: "Openspace Principal",
        occupancy: 72,
        tone: "danger",
        capacity: "40 places",
        summary: "3/5 créneaux",
        slots: [
          { time: "8h–10h", status: "Sophie L." },
          { time: "10h–12h", status: "Marc B." },
          { time: "14h–16h", status: "libre" },
          { time: "16h–18h", status: "libre" },
          { time: "18h–20h", status: "Studio Friche" },
        ],
      },
      {
        category: "Studio",
        name: "Studio d'Enregistrement",
        occupancy: 60,
        tone: "danger",
        capacity: "4 places",
        summary: "2/5 créneaux",
        slots: [
          { time: "10h–12h", status: "Léa K." },
          { time: "12h–14h", status: "libre" },
          { time: "14h–16h", status: "libre" },
          { time: "16h–18h", status: "Collectif Son" },
          { time: "18h–20h", status: "libre" },
        ],
      },
      {
        category: "Réunion",
        name: "Salle de Réunion",
        occupancy: 50,
        tone: "danger",
        capacity: "8 places",
        summary: "2/4 créneaux",
        slots: [
          { time: "9h–11h", status: "libre" },
          { time: "11h–13h", status: "Design Sprint Co." },
          { time: "14h–16h", status: "Pitch Investisseurs" },
          { time: "16h–18h", status: "libre" },
        ],
      },
      {
        category: "Studio",
        name: "Studio Photo",
        occupancy: 85,
        tone: "success",
        capacity: "6 places",
        summary: "2/4 créneaux",
        slots: [
          { time: "9h–12h", status: "Camille P." },
          { time: "12h–14h", status: "libre" },
          { time: "14h–17h", status: "libre" },
          { time: "17h–19h", status: "Mode Paris 11" },
        ],
      },
    ],
  },
  {
    title: "Ateliers",
    items: [
      {
        category: "Fabrication",
        name: "Atelier Impression 3D",
        occupancy: 40,
        tone: "danger",
        capacity: "10 places",
        summary: "1/3 créneaux",
        slots: [
          { time: "9h–12h", status: "libre" },
          { time: "13h–16h", status: "Archi Students ENSA" },
          { time: "16h–19h", status: "libre" },
        ],
      },
      {
        category: "Électronique",
        name: "Labo Électronique",
        occupancy: 33,
        tone: "neutral",
        capacity: "12 places",
        summary: "1/3 créneaux",
        slots: [
          { time: "10h–13h", status: "Repair Café Paris" },
          { time: "14h–17h", status: "libre" },
          { time: "17h–20h", status: "libre" },
        ],
      },
      {
        category: "Bois & Matières",
        name: "Atelier Menuiserie",
        occupancy: 25,
        tone: "neutral",
        capacity: "8 places",
        summary: "1/3 créneaux",
        slots: [
          { time: "9h–12h", status: "libre" },
          { time: "13h–16h", status: "libre" },
          { time: "16h–19h", status: "Jean-Paul D." },
        ],
      },
      {
        category: "Numérique",
        name: "Lab Numérique",
        occupancy: 66,
        tone: "danger",
        capacity: "15 places",
        summary: "2/4 créneaux",
        slots: [
          { time: "9h–11h", status: "Formation UX Design" },
          { time: "11h–13h", status: "libre" },
          { time: "14h–17h", status: "HackÉco Team" },
          { time: "17h–19h", status: "libre" },
        ],
      },
    ],
  },
];

function AdminSpaces() {
  return (
    <section className="admin-spaces">
      <header className="admin-spaces__header">
        <div>
          <h2 className="admin-spaces__title">Occupation des espaces</h2>
        </div>
        <p className="admin-spaces__date">Mercredi 21 mai 2026</p>
      </header>

      {spaceGroups.map((group) => (
        <section key={group.title} className="admin-spaces__group">
          <h3 className="admin-spaces__group-title">{group.title}</h3>

          <div className="admin-spaces__grid">
            {group.items.map((space) => (
              <article
                key={space.name}
                className={`admin-spaces__card admin-spaces__card--${space.tone}`}
              >
                <div className="admin-spaces__card-header">
                  <div>
                    <p className="admin-spaces__category">{space.category}</p>
                    <h4 className="admin-spaces__name">{space.name}</h4>
                  </div>
                  <p className="admin-spaces__occupancy">{space.occupancy}%</p>
                </div>

                <div className="admin-spaces__progress">
                  <div
                    className="admin-spaces__progress-bar"
                    style={{ width: `${space.occupancy}%` }}
                  />
                </div>

                <ul className="admin-spaces__slots">
                  {space.slots.map((slot) => (
                    <li key={`${space.name}-${slot.time}`} className="admin-spaces__slot">
                      <span className="admin-spaces__time">{slot.time}</span>
                      <span
                        className={`admin-spaces__status ${slot.status === "libre" ? "admin-spaces__status--free" : ""}`}
                      >
                        {slot.status}
                      </span>
                    </li>
                  ))}
                </ul>

                <footer className="admin-spaces__footer">
                  <p className="admin-spaces__meta">
                    <Users size={14} />
                    <span>{space.capacity}</span>
                  </p>
                  <p className="admin-spaces__meta">{space.summary}</p>
                </footer>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

export default AdminSpaces;
