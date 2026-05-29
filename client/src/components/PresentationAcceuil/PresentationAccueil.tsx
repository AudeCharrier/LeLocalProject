import "./PresentationAccueil.css";

function PresentationAcceuil() {
  return (
    <div className="stats">
      <div className="stats__item">
        <span className="stats__number">8</span>
        <span className="stats__label">espaces & ateliers</span>
      </div>
      <div className="stats__item">
        <span className="stats__number">200+</span>
        <span className="stats__label">membres actifs</span>
      </div>
      <div className="stats__item">
        <span className="stats__number">40+</span>
        <span className="stats__label">événements / an</span>
      </div>
      <div className="stats__item">
        <span className="stats__number">Paris 11e</span>
        <span className="stats__label">en plein cœur</span>
      </div>
    </div>
  );
}

export default PresentationAcceuil;
