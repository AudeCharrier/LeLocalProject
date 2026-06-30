import "./FooterDashboard.css";

function FooterDashboard() {
  return (
    <footer className="footer-dashboard-section">
      <div className="footer-dashboard-container">
        <section className="footer-dashboard-content">
          <div className="footer-dashboard-brand">
            <h3 className="footer-dashboard-brand-name">Le Local</h3>
            <div className="footer-dashboard-brand-details">
              <p>14 rue de la République, Paris 11e</p>
              <p>contact@lelocal.fr</p>
            </div>
          </div>

          <div className="footer-dashboard-links">
            <div className="footer-dashboard-column">
              <p className="footer-dashboard-column-title">Espaces</p>
              <p className="footer-dashboard-link">Coworking</p>
              <p className="footer-dashboard-link">Studios</p>
              <p className="footer-dashboard-link">Salles</p>
            </div>

            <div className="footer-dashboard-column">
              <p className="footer-dashboard-column-title">Ateliers</p>
              <p className="footer-dashboard-link">Impression 3D</p>
              <p className="footer-dashboard-link">Électronique</p>
              <p className="footer-dashboard-link">Menuiserie</p>
            </div>

            <div className="footer-dashboard-column">
              <p className="footer-dashboard-column-title">Liens</p>
              <p className="footer-dashboard-link">À propos</p>
              <p className="footer-dashboard-link">Adhésion</p>
              <p className="footer-dashboard-link">Contact</p>
            </div>
          </div>
        </section>

        <div className="footer-dashboard-divider" />

        <section className="footer-dashboard-bottom">
          <p className="footer-dashboard-legal">
            © 2019 Le Local — Association loi 1901 · Mentions légales
          </p>
        </section>
      </div>
    </footer>
  );
}

export default FooterDashboard;
