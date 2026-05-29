import "./ImageHautPageAcceuil.css";

function ImageHautPageAcceuil() {
  return (
    <div className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow">PARIS 11E · TIER LIEU · DEPUIS 2019</p>
        <h1 className="hero__title">
          Un espace <br />
          pour ceux <br />
          <em>qui font.</em>
        </h1>
        <p className="hero__description">
          Coworking, studios pros, ateliers maker et <br />
          événements au cœur de Paris. Rejoignez <br />
          une communauté qui crée.
        </p>
        <div className="hero__buttons">
          <button type="button" className="hero__btn hero__btn--primary">
            Explorer les espaces →
          </button>
          <button type="button" className="hero__btn hero__btn--secondary">
            Voir les événements
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageHautPageAcceuil;
