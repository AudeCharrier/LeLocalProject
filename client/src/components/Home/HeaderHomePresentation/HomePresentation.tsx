import "./HomePresentation.css";

function PresentationAcceuil() {
  return (
    <div className="stats-global-div">
      <div className="stats-item-div">
        <span className="stats-number">18</span>
        <span className="stats-text">espaces & ateliers</span>
      </div>
      <div className="stats-item-div">
        <span className="stats-number">200+</span>
        <span className="stats-text">membres actifs</span>
      </div>
      <div className="stats-item-div">
        <span className="stats-number">100+</span>
        <span className="stats-text">événements par an</span>
      </div>
      <div className="stats-item-div">
        <span className="stats-number">Paris 11e</span>
        <span className="stats-text">en plein cœur</span>
      </div>
    </div>
  );
}

export default PresentationAcceuil;
