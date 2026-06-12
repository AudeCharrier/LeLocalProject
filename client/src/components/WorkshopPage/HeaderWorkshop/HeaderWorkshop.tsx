import "./HeaderWorkshop.css";

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

function HeaderWorkshop() {
  return (
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
  );
}

export default HeaderWorkshop;
