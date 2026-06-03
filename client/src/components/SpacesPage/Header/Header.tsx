import "./Header.css";

function Header() {
  return (
    <section className="header-spaces-page-global-section">
      <div className="header-spaces-page-container-articles">
        <article className="header-spaces-page-first-article">
          <div className="header-spaces-page-first-article-main-div">
            <div className="header-spaces-page-first-article-main-span-div">
              <hr className="header-spaces-page-first-article-main-hr" />

              <span className="header-spaces-page-first-article-main-span">
                NOS LIEUX DE CRÉATION
              </span>
            </div>
            <h2 className="header-spaces-page-first-article-main-title">
              Des{" "}
              <em className="header-spaces-page-first-article-main-em">
                espaces
              </em>{" "}
              à votre image
            </h2>
            <p className="header-spaces-page-first-article-main-text">
              Coworking, studios son & photo, salle de réunion, atelier
              fabrication… Réservez à l'heure, à la demi-journée ou par
              abonnement mensuel.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Header;
