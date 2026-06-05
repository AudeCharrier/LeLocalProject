import "./NavBar.css";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
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
        <Link to="/cart" className="cart-logo">
          <ShoppingCart />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
