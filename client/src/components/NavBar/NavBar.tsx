import "./NavBar.css";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
function NavBar() {
  return (
    <div className="navbar-global-div">
      <div className="navbar-title">La Forge</div>
      <div className="navbar-links-div">
        <button type="button" className="navbar-link-button">
          Accueil
        </button>
        <button type="button" className="navbar-link-button">
          Evenement
        </button>
        <button type="button" className="navbar-link-button">
          Espaces
        </button>
        <button type="button" className="navbar-link-button">
          Atelier
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
