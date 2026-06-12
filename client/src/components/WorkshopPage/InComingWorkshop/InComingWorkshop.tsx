import "./InComingWorkshop.css";

function InComingWorkshop() {
  return (
    <div className="Parent-Container-In-Coming-Workshop">
      <h3 className="Title-Workshop-Section">PROCHAINS ATELIERS</h3>
      <div className="Box-Img-In-Coming-Workshop">
        {/* top vert */}
        <div className="Box-Img-Top">
          <div className="Box-Img-Top-Row">
            <span className="Badge-In-Coming-Workshop-Level">DÉBUTANT</span>
            <span className="Badge-In-Coming-Workshop-Places">
              8 places libres
            </span>
          </div>
          <div className="Badge-In-Coming-Workshop-Date">
            <span className="Badge-In-Coming-Workshop-Date-Day">24</span>
            <span className="Badge-In-Coming-Workshop-Date-Month">JUIN</span>
          </div>
        </div>

        {/* bas crème */}
        <div className="Description-In-Coming-Workshop">
          <span className="Category-Pill">NUMÉRIQUE</span>
          <h1>Python pour les créatifs : automatiser le répétitif</h1>
          <p>
            3h pour comprendre les bases de Python et construire ses premiers
            scripts de traitement d'images, renommage en masse, et export de
            données.
          </p>
        </div>

        <div className="Teacher-For-The-Workshop-Of-The-Week">
          <div className="Teacher-Avatar">TC</div>
          <div className="Teacher-Info">
            <span className="Name-Of-The-Teacher-Of-The-Week">Thomas C.</span>
            <span className="Price">25€</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InComingWorkshop;
