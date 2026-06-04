import "./NavBar.css";
import ImgTitle from "../../assets/images/ImgTitleLeLocale.png";

function NavBar() {
  return (
    <div className="navbar-global-div">
      <div className="navbar-title">
        <img src={ImgTitle} alt="ImgTitleLeLocal" />
      </div>
      <div className="navbar-links-div">
        <button type="button" className="navbar-link-button">
          Accueil
        </button>
        <button type="button" className="navbar-link-button">
          Evenements
        </button>
        <button type="button" className="navbar-link-button">
          Espaces
        </button>
        <button type="button" className="navbar-link-button">
          Ateliers
        </button>
      </div>
      <div className="navbar-connection-div">
        <button type="button" className="navbar-connection-button">
          Se connecter
        </button>
        <button type="button" className="navbar-connection-button">
          Rejoindre
        </button>
      </div>
    </div>
  );
}

export default NavBar;
