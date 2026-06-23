import "./WorkshopOfTheWeek.css";

const categories = [
  { label: "Tous", dot: null, active: true },
  { label: "Artisanat", dot: "#c0392b" },
  { label: "Numérique", dot: "#e67e22" },
  { label: "Cuisine", dot: "#e74c3c" },
  { label: "Musique & Audio", dot: "#8e44ad" },
  { label: "Fabrication", dot: "#27ae60" },
  { label: "Nature", dot: "#2ecc71" },
];

function WorkshopOfTheWeek() {
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
        <h2 className="title-workshop-section">ATELIER DE LA SEMAINE</h2>

        <div className="workshop-of-the-week-card-parent">
          <div className="box-img-card-workshop-of-the-week">
            <span className="badge-level">TOUS NIVEAUX</span>
            <span className="badge-places">
              <strong>3</strong>
              <br />
              PLACES RESTANTES
            </span>
            <div className="badge-date">
              <span className="badge-date-day">21</span>
              <span className="badge-date-month">JUIN 2026</span>
            </div>
          </div>

          <div className="info-card-workshop-of-the-week">
            <div className="description-of-the-week-workshop">
              <span className="category-pill">
                ARTISANAT · TERRES & MINÉRAUX
              </span>
              <h1>Tournage céramique : du façonnage à la cuisson</h1>
              <p>
                Une journée complète pour apprendre à centrer, façonner et
                décorer votre première pièce sur le tour. Argon, glaçure et
                cuisson au four sont inclus. Vous repartez avec votre création.
              </p>
            </div>

            <div className="about-workshop-of-the-week">
              <span>⏱ Samedi · 9h00 – 18h00 (1 pause)</span>
              <span>👤 6 participants max</span>
              <span>📍 Atelier céramique, sous-sol</span>
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
              <div className="price">65€</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkshopOfTheWeek;
