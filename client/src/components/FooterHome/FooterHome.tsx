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
            <a className="footer-home-button footer-home-button-primary" href="/signup">
              Créer un compte
            </a>
            <a
              className="footer-home-button footer-home-button-secondary"
              href="/events"
            >
              Voir les événements
            </a>
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
              <a className="footer-home-link" href="/spaces/coworking">
                Coworking
              </a>
              <a className="footer-home-link" href="/spaces/studios">
                Studios
              </a>
              <a className="footer-home-link" href="/spaces/rooms">
                Salles
              </a>
            </div>

            <div className="footer-home-column">
              <p className="footer-home-column-title">Ateliers</p>
              <a className="footer-home-link" href="/workshops/3d-printing">
                Impression 3D
              </a>
              <a className="footer-home-link" href="/workshops/electronics">
                Électronique
              </a>
              <a className="footer-home-link" href="/workshops/woodworking">
                Menuiserie
              </a>
            </div>

            <div className="footer-home-column">
              <p className="footer-home-column-title">Liens</p>
              <a className="footer-home-link" href="/about">
                À propos
              </a>
              <a className="footer-home-link" href="/membership">
                Adhésion
              </a>
              <a className="footer-home-link" href="/contact">
                Contact
              </a>
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
