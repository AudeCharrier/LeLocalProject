import "./HeaderWorkshop.css";
import type { FirstArticleProps } from "../../../types/firstarticleprops";
import FirstArticle from "../../SpacesPage/Header/FirstArticle/FirstArticle";

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
  const WorkshopHeaderFirstArticle: FirstArticleProps = {
    bigtitle: "APPRENDRE & CREER ENSEMBLE",
    sloganBegin: "Des",
    sloganItalic: "ateliers",
    sloganEnd: "qui vous font grandir",
    description:
      "Sérigraphie, code, poterie, podcast, cuisine, photographie… Des formations courtes animées par des experts passionnés, dans nos espaces.",
    info1: 16,
    info1text: "ESPACES",
    info2: 1400,
    info2text: "M² TOTAL",
    info3: "6/7",
    info3text: "ACCES",
  };

  return (
    <section className="Top-Page-of-Workshop">
      <div className="Workshop-Introduction">
        <FirstArticle pageData={WorkshopHeaderFirstArticle} />
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
