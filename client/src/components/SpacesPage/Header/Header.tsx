import FirstArticle from "./FirstArticle/FirstArticle";
import "./Header.css";
import SecondArticle from "./SecondArticle/SecondArticle";

//Header creation
function Header() {
  return (
    <section className="header-spaces-page-global-section">
      {/* Global Header */}
      <div className="header-spaces-page-container-articles">
        <FirstArticle />
        <SecondArticle />
      </div>
    </section>
  );
}

export default Header;
