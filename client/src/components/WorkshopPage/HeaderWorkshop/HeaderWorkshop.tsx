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
    info1: 42,
    info1text: "Ateliers / trimestre",
    info2: 18,
    info2text: "Formateurs",
    info3: "580+",
    info3text: "Participants / an",
  };

  return (
    <section className="header-spaces-page-global-section">
      <div className="header-spaces-page-container-articles">
        <FirstArticle pageData={WorkshopHeaderFirstArticle} />

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
        </div>
      </div>
    </section>
  );
}

export default HeaderWorkshop;
