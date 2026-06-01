import "./DescriptifAccueil.css";

function DescriptifAccueil() {
  return (
    <section className="mission-global-section">
      <div className="mission-image-div">
        <img
          src="https://images.unsplash.com/photo-1777559542626-a72e0ee96eca?w=800&h=600&fit=crop&auto=format"
          alt="Espace de travail"
          className="mission-image"
        />
        <div className="mission__badge">
          <span className="mission__badge-number">7</span>
          <span className="mission__badge-label">ans d'existence</span>
        </div>
      </div>

      <div className="mission__content">
        <p className="mission__eyebrow">Notre Mission</p>
        <h2 className="mission__title">
          Un lieu qui <br />
          <em>appartient à ceux</em> <br />
          qui le font vivre.
        </h2>
        <p className="mission__text">
          La Forge est un tiers lieu associatif ouvert aux créateurs,
          entrepreneurs, artisans et curieux. On partage des outils, des savoirs
          et des projets – dans un esprit de communs et de transition.
        </p>
        <p className="mission__text">
          Studios, ateliers, espaces de détente et salle d'événements : tout est
          pensé pour que vous puissiez travailler, créer et rencontrer des gens
          qui font des choses intéressantes.
        </p>
        <div className="mission__features">
          <div className="mission__feature">
            <span className="mission__feature-icon">☕</span>
            <span className="mission__text">Espace détente & café bio</span>
          </div>
          <div className="mission__feature">
            <span className="mission__feature-icon">⚡</span>
            <span className="mission__text">Internet fibre 1Gb</span>
          </div>
          <div className="mission__feature">
            <span className="mission__feature-icon">⭐</span>
            <span className="mission__text">Tarifs solidaires</span>
          </div>
          <div className="mission__feature">
            <span className="mission__feature-icon">👥</span>
            <span className="mission__text">Communauté active</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DescriptifAccueil;
