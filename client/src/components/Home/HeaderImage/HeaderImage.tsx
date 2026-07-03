import "./HeaderImage.css";
import { Link } from "react-router";

function ImageHautPageAcceuil() {
  return (
    <div className="hero-global-div">
      <div className="hero-overlay-div" />
      <div className="hero-content-div">
        <p className="hero-eyebrow">PARIS 11E · TIER LIEU · DEPUIS 2019</p>
        <h1 className="hero-title">
          Un espace <br />
          pour ceux <br />
          <em>qui font.</em>
        </h1>
        <p className="hero-description">
          Coworking, studios pros, ateliers maker et <br />
          événements au cœur de Paris. Rejoignez <br />
          une communauté qui crée.
        </p>
        <div className="hero-buttons-div">
          <button type="button" className="hero-button hero-button-primary">
            <Link to="/espaces">Explorer les espaces →</Link>
          </button>
          <button type="button" className="hero-button hero-button-secondary">
            <Link to="/evenements">Voir les événements</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageHautPageAcceuil;
