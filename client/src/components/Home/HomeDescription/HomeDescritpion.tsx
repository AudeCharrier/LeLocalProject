import "./HomeDescritpion.css";

function DescriptifAccueil() {
  return (
    <section className="mission-global-section">
      <div className="mission-image-div">
        <img
          src="https://images.unsplash.com/photo-1777559542626-a72e0ee96eca?w=800&h=600&fit=crop&auto=format"
          alt="Espace de travail"
          className="mission-image"
        />
        <div className="mission-badge-div">
          <span className="mission-badge-number">7</span>
          <span className="mission-badge-text">ans d'existence</span>
        </div>
      </div>

      <div className="mission-our-mission-div">
        <h2 className="mission-eyebrow">Notre Mission</h2>

        <h2 className="mission-title">
          Un lieu qui <br />
          <em>appartient à ceux</em> <br />
          qui le font vivre.
        </h2>
        <p className="mission-text">
          Le Local est un tiers lieu associatif ouvert aux créateurs,
          entrepreneurs, artisans et curieux. On partage des outils, des savoirs
          et des projets – dans un esprit de communs et de transition.
        </p>
        <p className="mission-text">
          Studios, ateliers, espaces de détente et salle d'événements : tout est
          pensé pour que vous puissiez travailler, créer et rencontrer des gens
          qui font des choses intéressantes.
        </p>
        <div className="mission-features-list-div">
          <div className="mission-feature-div">
            <span className="mission-feature-icon">☕</span>
            <span className="mission-feature-text">
              Espace détente & café bio
            </span>
          </div>
          <div className="mission-feature-div">
            <span className="mission-feature-icon">⚡</span>
            <span className="mission-feature-text">Internet fibre 1Gb</span>
          </div>
          <div className="mission-feature-div">
            <span className="mission-feature-icon">⭐</span>
            <span className="mission-feature-text">Tarifs solidaires</span>
          </div>
          <div className="mission-feature-div">
            <span className="mission-feature-icon">👥</span>
            <span className="mission-feature-text">Communauté active</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DescriptifAccueil;
