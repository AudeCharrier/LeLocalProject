import "./FooterDashboard.css";

function FooterDashboard() {
  return (
    <footer className="footer-dashboard-section">
      <div className="footer-dashboard-container">
        <section className="footer-dashboard-content">
          <div className="footer-dashboard-brand">
            <h3 className="footer-dashboard-brand-name">Le Local</h3>
            <div className="footer-dashboard-brand-details">
              <p>14 rue des Faiseurs, Paris 11e</p>
              <a href="mailto:contact@lelocal.coop">contact@lelocal.coop</a>
            </div>
          </div>

          <div className="footer-dashboard-links">
            <div className="footer-dashboard-column">
              <p className="footer-dashboard-column-title">Espaces</p>
              <a className="footer-dashboard-link" href="/spaces/coworking">
                Coworking
              </a>
              <a className="footer-dashboard-link" href="/spaces/studios">
                Studios
              </a>
              <a className="footer-dashboard-link" href="/spaces/rooms">
                Salles
              </a>
            </div>

            <div className="footer-dashboard-column">
              <p className="footer-dashboard-column-title">Ateliers</p>
              <a className="footer-dashboard-link" href="/workshops/3d-printing">
                Impression 3D
              </a>
              <a className="footer-dashboard-link" href="/workshops/electronics">
                Électronique
              </a>
              <a className="footer-dashboard-link" href="/workshops/woodworking">
                Menuiserie
              </a>
            </div>

            <div className="footer-dashboard-column">
              <p className="footer-dashboard-column-title">Liens</p>
              <a className="footer-dashboard-link" href="/about">
                À propos
              </a>
              <a className="footer-dashboard-link" href="/membership">
                Adhésion
              </a>
              <a className="footer-dashboard-link" href="/contact">
                Contact
              </a>
            </div>
          </div>
        </section>

        <div className="footer-dashboard-divider" />

        <section className="footer-dashboard-bottom">
          <p className="footer-dashboard-legal">
            © 2026 Le Local — Association loi 1901 · Mentions légales
          </p>
        </section>
      </div>
    </footer>
  );
}

export default FooterDashboard;
