import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar-global-div">
      <div className="navbar-title">La Forge</div>
      <div className="navbar-links-div">
        <button type="button" className="navbar-link-button">
          Acceuil
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
      </div>
    </div>
  );
}

export default NavBar;
