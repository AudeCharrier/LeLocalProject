import "./FirstArticle.css";

//Header creation
function FirstArticle() {
  return (
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
          <em className="header-spaces-page-first-article-main-em">espaces</em>{" "}
          à votre image
        </h2>
        <p className="header-spaces-page-first-article-main-text">
          Espaces de coworking, studios son & photo, salles de réunion et
          ateliers de fabrication… Réservez à la demi-journée ou à la journée
          selon vos besoins. Les locaux vides sont proposés en location
          mensuelle.
        </p>
      </div>
      <div className="header-spaces-page-first-article-main-infos-div">
        <div className="header-spaces-page-first-article-main-info">
          <h2 className="header-spaces-page-first-article-main-info-1">16</h2>
          <p className="header-spaces-page-first-article-main-text">ESPACES</p>
        </div>
        <div className="header-spaces-page-first-article-main-info">
          {" "}
          <h2 className="header-spaces-page-first-article-main-info-2">1400</h2>
          <p className="header-spaces-page-first-article-main-text">
            M² TOTAL{" "}
          </p>
        </div>
        <div className="header-spaces-page-first-article-main-info">
          {" "}
          <h2 className="header-spaces-page-first-article-main-info-3">6/7</h2>
          <p className="header-spaces-page-first-article-main-text">ACCÉS</p>
        </div>
      </div>
    </article>
  );
}

export default FirstArticle;
