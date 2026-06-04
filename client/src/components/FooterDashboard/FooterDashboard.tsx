import { Link } from "react-router";

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
              <Link className="footer-dashboard-link" to="/spaces/coworking">
                Coworking
              </Link>
              <Link className="footer-dashboard-link" to="/spaces/studios">
                Studios
              </Link>
              <Link className="footer-dashboard-link" to="/spaces/rooms">
                Salles
              </Link>
            </div>

            <div className="footer-dashboard-column">
              <p className="footer-dashboard-column-title">Ateliers</p>
              <Link
                className="footer-dashboard-link"
                to="/workshops/3d-printing"
              >
                Impression 3D
              </Link>
              <Link
                className="footer-dashboard-link"
                to="/workshops/electronics"
              >
                Électronique
              </Link>
              <Link
                className="footer-dashboard-link"
                to="/workshops/woodworking"
              >
                Menuiserie
              </Link>
            </div>

            <div className="footer-dashboard-column">
              <p className="footer-dashboard-column-title">Liens</p>
              <Link className="footer-dashboard-link" to="/about">
                À propos
              </Link>
              <Link className="footer-dashboard-link" to="/membership">
                Adhésion
              </Link>
              <Link className="footer-dashboard-link" to="/contact">
                Contact
              </Link>
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
