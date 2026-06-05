import "./NavBar.css";
import ImgTitle from "../../assets/images/ImgTitleLeLocale.png";
import { Link } from "react-router";

function NavBar() {
  return (
    <div className="navbar-global-div">
      <div className="navbar-title">
        <Link to="/">
          <img src={ImgTitle} alt="ImgTitleLeLocal" />
        </Link>
      </div>
      <div className="navbar-links-div">
        <button type="button" className="navbar-link-button">
          <Link to="/" className="navbar-link">
            Accueil
          </Link>
        </button>
        <button type="button" className="navbar-link-button">
          <Link to="/" className="navbar-link">
            Evenements
          </Link>
        </button>
        <button type="button" className="navbar-link-button">
          <Link to="/espaces" className="navbar-link">
            Espaces
          </Link>
        </button>
        <button type="button" className="navbar-link-button">
          <Link to="/dashboard-client" className="navbar-link">
            Ateliers
          </Link>
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
