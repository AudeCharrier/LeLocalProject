import "./WorkshopPage.css";

const tags = [
  "Céramique",
  "Impression 3D",
  "Photographie",
  "Code",
  "Cuisine",
  "Podcast",
  "Sérigraphie",
  "Soudure",
];

function WorkshopPage() {
  return (
    <div className="Workshop-Global-Section">
      <section className="Top-Page-of-Workshop">
        <div className="Workshop-Introduction">
          <h3 className="First-Sentence">APPRENDRE & CREER ENSEMBLE</h3>
          <h1 className="Title-Workshop-Page">
            Des <em className="Word-Ateliers">ateliers</em> qui vous
            <br />
            font grandir
          </h1>
          <p className="Description-Workshop-Page">
            Sérigraphie, code, poterie, podcast, cuisine, photographie… Des
            formations
            <br />
            courtes animées par des experts passionnés, dans nos espaces.
          </p>
        </div>

        <div className="Search-Filter-Section">
          <div className="Search-Bar">
            <input
              type="text"
              placeholder="Rechercher un atelier, une discipline…"
            />
            <button type="button">Rechercher</button>
          </div>

          <div className="Btn-Tags-Filter">
            {tags.map((tag) => (
              <button key={tag} type="button" className="tag">
                {tag}
              </button>
            ))}
          </div>

          <div className="Stats-Global-Workshop-Page">
            <div className="Stats-Workshop">
              <span className="Stats-Workshop-Number">42</span>
              <span className="Stats-Workshop-Text">Ateliers / trimestre</span>
            </div>
            <div className="Stats-Workshop">
              <span className="Stats-Workshop-Number">18</span>
              <span className="Stats-Workshop-Text">Formateurs</span>
            </div>
            <div className="Stats-Workshop">
              <span className="Stats-Workshop-Number">580+</span>
              <span className="Stats-Workshop-Text">Participants / an</span>
            </div>
          </div>
        </div>
      </section>

      <section className="Center-Of-Workshop-Page">
        <div className="Parent-Filter-Div-Workshop-Page">
          <button type="button" className="Btn-Filter-Workshop-Page">
            Tous
          </button>
          <button type="button" className="Btn-Filter-Workshop-Page">
            Artisanat
          </button>
          <button type="button" className="Btn-Filter-Workshop-Page">
            Numérique
          </button>
          <button type="button" className="Btn-Filter-Workshop-Page">
            Cuisine
          </button>
          <button type="button" className="Btn-Filter-Workshop-Page">
            Musique & Audio
          </button>
          <button type="button" className="Btn-Filter-Workshop-Page">
            Fabrication
          </button>
          <button type="button" className="Btn-Filter-Workshop-Page">
            Nature
          </button>
        </div>
        <div className="Workshop-Of-The-Week">
          <h3 className="Title-Workshop-Section">ATELIER DE LA SEMAINE</h3>
          <div className="Workshop-Of-The-Week-Card-Parent">
            <div className="Box-Img-Card-Workshop-Of-The-Week">
              <span>Tous niveaux</span>
              <span>
                3<br />
                places restantes
              </span>
              <span>
                21
                <br />
                Juin 2026
              </span>
            </div>
            <div className="Info-Card-Workshop-Of-The-Week">
              <div className="Description-Of-The-Week-Workshop">
                <h2>Artisanat · Terres & Minéraux</h2>
                <h1>Tournage céramique : du façonnage à la cuisson</h1>
                <p>
                  Une journée complète pour apprendre à centrer, façonner et
                  décorer votre première pièce sur le tour. Argon, glaçure et
                  cuisson au four sont inclus. Vous repartez avec votre
                  création.
                </p>
              </div>
              <div className="About-Workshop-Of-The-Week">
                <ul>
                  <li>Samedi · 9h00 – 18h00 (1 pause)</li>
                  <li>6 participants max</li>
                  <li>Atelier céramique, sous-sol</li>
                </ul>
              </div>
              <div className="Teacher-For-The-Workshop-Of-The-Week">
                <h2 className="Name-Of-The-Teacher-Of-The-Week">
                  Lucie Rambaud
                </h2>
                <p className="Job-And-Experience-Of-The-Teacher-Of-The-Week">
                  Céramiste · 12 ans d'expérience
                </p>
              </div>
              <div className="Btn-And-Price-For-Workshop-Of-The-Week">
                <div className="Btn-Of-The-Week">
                  <button type="button">Réserver ma place</button>
                  <button type="button">Programme détaillé</button>
                </div>
                <div className="Price-Of-The-Week">
                  <h1>65€</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WorkshopPage;
