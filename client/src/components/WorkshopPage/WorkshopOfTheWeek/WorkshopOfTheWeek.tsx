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
    <section className="Center-Of-Workshop-Page">
      <div className="Filter-Bar-Row">
        <div className="Parent-Filter-Div-Workshop-Page">
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              className={`Btn-Filter-Workshop-Page${cat.active ? " active" : ""}`}
            >
              {cat.dot && (
                <span
                  className="Category-Dot"
                  style={{ background: cat.dot }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>
        <select className="Sort-Select">
          <option>Trier par : Date</option>
          <option>Trier par : Prix</option>
          <option>Trier par : Popularité</option>
        </select>
      </div>
      <div className="Workshop-Of-The-Week">
        <h2 className="Title-Workshop-Section">ATELIER DE LA SEMAINE</h2>

        <div className="Workshop-Of-The-Week-Card-Parent">
          {/* Image gauche */}
          <div className="Box-Img-Card-Workshop-Of-The-Week">
            <span className="Badge-Level">TOUS NIVEAUX</span>
            <span className="Badge-Places">
              <strong>3</strong>
              <br />
              PLACES RESTANTES
            </span>
            <div className="Badge-Date">
              <span className="Badge-Date-Day">21</span>
              <span className="Badge-Date-Month">JUIN 2026</span>
            </div>
          </div>

          {/* Infos droite */}
          <div className="Info-Card-Workshop-Of-The-Week">
            <div className="Description-Of-The-Week-Workshop">
              <span className="Category-Pill">
                ARTISANAT · TERRES & MINÉRAUX
              </span>
              <h1 className="TitleWorkshopOfTheWeek">
                Tournage céramique : du façonnage à la cuisson
              </h1>
              <p className="DescriptionWorkshopOfTheWeek">
                Une journée complète pour apprendre à centrer, façonner et
                décorer votre première pièce sur le tour. Argon, glaçure et
                cuisson au four sont inclus. Vous repartez avec votre création.
              </p>
            </div>

            <div className="About-Workshop-Of-The-Week">
              <span>⏱ Samedi · 9h00 – 18h00 (1 pause)</span>
              <span>👤 6 participants max</span>
              <span>📍 Atelier céramique, sous-sol</span>
            </div>

            <div className="Teacher-For-The-Workshop-Of-The-Week">
              <div className="Teacher-Avatar">LR</div>
              <div className="Teacher-Info">
                <span className="Name-Of-The-Teacher-Of-The-Week">
                  Lucie Rambaud
                </span>
                <span className="Job-And-Experience-Of-The-Teacher-Of-The-Week">
                  Céramiste · 12 ans d'expérience · 4,9/5 (38 avis)
                </span>
              </div>
            </div>

            <div className="Btn-And-Price-For-Workshop-Of-The-Week">
              <div className="Btn-Of-The-Week">
                <button type="button" className="Btn-Reserve">
                  Réserver ma place
                </button>
                <button type="button" className="Btn-Program">
                  Programme détaillé
                </button>
              </div>
              <div className="Price">65€</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkshopOfTheWeek;
