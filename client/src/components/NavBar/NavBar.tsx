import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBarPage">
      <div className="TitreNavBar">Le Local</div>
      <div className="LiensNavBar">
        <button type="button" className="btnNavBar">
          Acceuil
        </button>
        <button type="button" className="btnNavBar">
          Evenement
        </button>
        <button type="button" className="btnNavBar">
          Espaces
        </button>
        <button type="button" className="btnNavBar">
          Atelier
        </button>
      </div>
      <div className="Connexion">
        <button type="button" className="btnNavBar">
          Se connecter
        </button>
        <button type="button" className="btnNavBar">
          Rejoindre
        </button>
      </div>
    </div>
  );
}

export default NavBar;
