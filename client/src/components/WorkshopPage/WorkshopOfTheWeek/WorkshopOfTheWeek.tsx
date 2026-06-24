import "./WorkshopOfTheWeek.css";
import useAvailability from "../../../hooks/useAvailability";
import type { Activity } from "../../../types/activity";

interface WorkshopOfTheWeekProps {
  workshop: Activity | undefined;
}

const categories = [
  { label: "Tous", dot: null, active: true },
  { label: "Artisanat", dot: "#c0392b" },
  { label: "Numérique", dot: "#e67e22" },
  { label: "Cuisine", dot: "#e74c3c" },
  { label: "Musique & Audio", dot: "#8e44ad" },
  { label: "Fabrication", dot: "#27ae60" },
  { label: "Nature", dot: "#2ecc71" },
];

function formatDate(isoDate: string) {
  const d = new Date(isoDate);
  return {
    day: d.getDate().toString(),
    month: d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase(),
  };
}

function formatHour(time: string) {
  return time.slice(0, 5);
}

function WorkshopOfTheWeek({ workshop }: WorkshopOfTheWeekProps) {
  if (!workshop) return null;

  console.log(workshop);

  const { day, month } = formatDate(workshop.start_date);

  const availability = useAvailability(
    workshop.space_id,
    workshop.start_date.slice(0, 10),
    workshop.time_slot_id?.toString(),
  );

  return (
    <section className="center-of-workshop-page">
      <div className="filter-bar-row">
        <div className="parent-filter-div-workshop-page">
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              className={`btn-filter-workshop-page${cat.active ? " active" : ""}`}
            >
              {cat.dot && (
                <span
                  className="category-dot"
                  style={{ background: cat.dot }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>
        <select className="sort-select">
          <option>Trier par : Date</option>
          <option>Trier par : Prix</option>
          <option>Trier par : Popularité</option>
        </select>
      </div>

      <div className="workshop-of-the-week">
        <h1 className="title-workshop-section">ATELIER DE LA SEMAINE</h1>

        <div className="workshop-of-the-week-card-parent">
          <div
            className="box-img-card-workshop-of-the-week"
            style={{
              backgroundImage: workshop.url_image
                ? `url(${workshop.url_image})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="badge-level">TOUS NIVEAUX</span>
            <span className="badge-places">
              {availability
                ? `${availability.available} places libres`
                : `${workshop.capacity} places`}
            </span>
            <div className="badge-date">
              <span className="badge-date-day">{day}</span>
              <span className="badge-date-month">{month}</span>
            </div>
          </div>

          <div className="info-card-workshop-of-the-week">
            <div className="description-of-the-week-workshop">
              <span className="category-pill">{workshop.space_type}</span>
              <h1>{workshop.name}</h1>
              <p>{workshop.description}</p>
            </div>

            <div className="about-workshop-of-the-week">
              <span>
                ⏱ {workshop.slot} – {formatHour(workshop.start_hour)} -
                {formatHour(workshop.end_hour)}(1 pause)
              </span>
              <span>👤 {workshop.capacity} participants max</span>
              <span>📍 {workshop.space_name}</span>
            </div>

            <div className="teacher-for-the-workshop-of-the-week">
              <div className="teacher-avatar">LR</div>
              <div className="teacher-info">
                <span className="name-of-the-teacher-of-the-week">
                  Lucie Rambaud
                </span>
                <span className="job-and-experience-of-the-teacher-of-the-week">
                  Céramiste · 12 ans d'expérience · 4,9/5 (38 avis)
                </span>
              </div>
            </div>

            <div className="btn-and-price-for-workshop-of-the-week">
              <div className="btn-of-the-week">
                <button type="button" className="btn-reserve">
                  Réserver ma place
                </button>
                <button type="button" className="btn-program">
                  Programme détaillé
                </button>
              </div>
              <div className="price">{workshop.price_unit}€</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkshopOfTheWeek;
