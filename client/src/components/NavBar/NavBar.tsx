import "./NavBar.css";
import { ShoppingCart, UserCircle } from "lucide-react";
import { Link } from "react-router";
import ImgTitle from "../../assets/images/ImgTitleLeLocale.png";
import { useAuthContext } from "../../context/AuthContext";

function NavBar() {
  const user = useAuthContext();

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
          <Link to="/evenements" className="navbar-link">
            Evenements
          </Link>
        </button>
        <button type="button" className="navbar-link-button">
          <Link to="/espaces" className="navbar-link">
            Espaces
          </Link>
        </button>
        <button type="button" className="navbar-link-button">
          <Link to="/workshop-page" className="navbar-link">
            Ateliers
          </Link>
        </button>
      </div>
      <div className="navbar-connection-div">
        {user ? (
          <Link
            to={
              user.role === "admin" ? "/dashboard-admin" : "/dashboard-client"
            }
            className="cart-logo"
          >
            <UserCircle />
          </Link>
        ) : (
          <>
            <button type="button" className="navbar-connection-button">
              <Link to="/log-in" className="navbar-link">
                Se connecter
              </Link>
            </button>
            <button type="button" className="navbar-connection-button-2">
              <Link to="/sign-in" className="navbar-link">
                Rejoindres
              </Link>
            </button>
          </>
        )}
        <Link to="/cart" className="cart-logo">
          <ShoppingCart />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
