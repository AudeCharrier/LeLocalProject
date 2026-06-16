import FirstArticle from "./FirstArticle/FirstArticle";
import "./Header.css";
import type { FirstArticleProps } from "../../../types/firstarticleprops";
import SecondArticle from "./SecondArticle/SecondArticle";

//Header creation
function Header() {
  const SpaceFirstArticle: FirstArticleProps = {
    bigtitle: "NOS LIEUX DE CREATION",
    sloganBegin: "Des",
    sloganItalic: "espaces",
    sloganEnd: "à votre image",
    description:
      "Espaces de coworking, studios son & photo, salles de réunion et ateliers de fabrication… Réservez à la demi-journée ou à la journée selon vos besoins. Les locaux vides sont proposés en location mensuelle.",
    info1: 16,
    info1text: "ESPACES",
    info2: 1400,
    info2text: "M² TOTAL",
    info3: "6/7",
    info3text: "ACCES",
  };

  return (
    <section className="header-spaces-page-global-section">
      {/* Global Header */}
      <div className="header-spaces-page-container-articles">
        <FirstArticle pageData={SpaceFirstArticle} />
        <SecondArticle />
      </div>
    </section>
  );
}

export default Header;
