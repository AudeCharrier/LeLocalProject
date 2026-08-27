import ImgTitle from "../../assets/images/ImgTitleLeLocale.png";
import { useAuthContext } from "../../context/AuthContext";
import "./NavBar.css";
import {
  DoorOpen,
  Hammer,
  Home,
  PartyPopper,
  ShoppingCart,
  UserCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const tabs = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/espaces", label: "Salles", icon: DoorOpen },
  { to: "/evenements", label: "Events", icon: PartyPopper },
  { to: "/workshop-page", label: "Ateliers", icon: Hammer },
  { to: "/cart", label: "Panier", icon: ShoppingCart },
];

function NavBar() {
  const user = useAuthContext();
  const location = useLocation();
  const accountTo = user
    ? user.role === "admin"
      ? "/dashboard-admin"
      : "/dashboard-client"
    : "/log-in";
  const accountLabel = user ? "Mon compte" : "Connexion";
  return (
    <>
      <div className="navbar-global-div">
        <div className="navbar-title">
          <Link to="/">
            <img src={ImgTitle} alt="ImgTitleLeLocal" />
          </Link>
        </div>

        <div className="navbar-links-div">
          {" "}
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
                  Rejoindre
                </Link>
              </button>
            </>
          )}
          <Link to="/cart" className="cart-logo">
            <ShoppingCart />
          </Link>
        </div>
      </div>

      {/* Tab bar mobile style app */}
      <nav className="tabbar-mobile">
        {tabs.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`tabbar-item${location.pathname === to ? " active" : ""}`}
          >
            <Icon
              size={22}
              strokeWidth={location.pathname === to ? 2.4 : 1.8}
            />
            <span>{label}</span>
          </Link>
        ))}
        <Link
          to={accountTo}
          className={`tabbar-item${location.pathname === accountTo ? " active" : ""}`}
        >
          <UserCircle
            size={22}
            strokeWidth={location.pathname === accountTo ? 2.4 : 1.8}
          />
          <span>{accountLabel}</span>
        </Link>
      </nav>
    </>
  );
}

export default NavBar;
