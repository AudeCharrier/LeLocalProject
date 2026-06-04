import { Link } from "react-router";

import "./FooterHome.css";

function FooterHome() {
  return (
    <footer className="footer-home-section">
      <div className="footer-home-container">
        <section className="footer-home-cta">
          <h2 className="footer-home-title">
            <span className="footer-home-title-main">Prêt·e à rejoindre</span>
            <span className="footer-home-title-accent">la communauté ?</span>
          </h2>

          <div className="footer-home-actions">
            <Link
              className="footer-home-button footer-home-button-primary"
              to="/signup"
            >
              Créer un compte
            </Link>
            <Link
              className="footer-home-button footer-home-button-secondary"
              to="/events"
            >
              Voir les événements
            </Link>
          </div>
        </section>

        <div className="footer-home-divider" />

        <section className="footer-home-content">
          <div className="footer-home-brand">
            <h3 className="footer-home-brand-name">Le Local</h3>
            <div className="footer-home-brand-details">
              <p>14 rue des Faiseurs, Paris 11e</p>
              <a href="mailto:contact@lelocal.coop">contact@lelocal.coop</a>
            </div>
          </div>

          <div className="footer-home-links">
            <div className="footer-home-column">
              <p className="footer-home-column-title">Espaces</p>
              <Link className="footer-home-link" to="/spaces/coworking">
                Coworking
              </Link>
              <Link className="footer-home-link" to="/spaces/studios">
                Studios
              </Link>
              <Link className="footer-home-link" to="/spaces/rooms">
                Salles
              </Link>
            </div>

            <div className="footer-home-column">
              <p className="footer-home-column-title">Ateliers</p>
              <Link className="footer-home-link" to="/workshops/3d-printing">
                Impression 3D
              </Link>
              <Link className="footer-home-link" to="/workshops/electronics">
                Électronique
              </Link>
              <Link className="footer-home-link" to="/workshops/woodworking">
                Menuiserie
              </Link>
            </div>

            <div className="footer-home-column">
              <p className="footer-home-column-title">Liens</p>
              <Link className="footer-home-link" to="/about">
                À propos
              </Link>
              <Link className="footer-home-link" to="/membership">
                Adhésion
              </Link>
              <Link className="footer-home-link" to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </section>

        <div className="footer-home-divider footer-home-divider-bottom" />

        <section className="footer-home-bottom">
          <p className="footer-home-legal">
            © 2026 Le Local — Association loi 1901 · Mentions légales
          </p>
        </section>
      </div>
    </footer>
  );
}

export default FooterHome;
