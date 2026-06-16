import "./FirstArticle.css";

import type { FirstArticleProps } from "../../../../types/firstarticleprops";

//Header creation
function FirstArticle({ pageData }: { pageData: FirstArticleProps }) {
  return (
    <article className="header-spaces-page-first-article">
      <div className="header-spaces-page-first-article-main-div">
        <div className="header-spaces-page-first-article-main-span-div">
          <hr className="header-spaces-page-first-article-main-hr" />

          <span className="header-spaces-page-first-article-main-span">
            {pageData.bigtitle}
          </span>
        </div>
        <h2 className="header-spaces-page-first-article-main-title">
          {pageData.sloganBegin}{" "}
          <em className="header-spaces-page-first-article-main-em">
            {pageData.sloganItalic}
          </em>{" "}
          {pageData.sloganEnd}
        </h2>
        <p className="header-spaces-page-first-article-main-text">
          {pageData.description}
        </p>
      </div>
      <div className="header-spaces-page-first-article-main-infos-div">
        <div className="header-spaces-page-first-article-main-info">
          <h2 className="header-spaces-page-first-article-main-info-1">
            {pageData.info1}
          </h2>
          <p className="header-spaces-page-first-article-main-text">
            {pageData.info1text}
          </p>
        </div>
        <div className="header-spaces-page-first-article-main-info">
          {" "}
          <h2 className="header-spaces-page-first-article-main-info-2">
            {pageData.info2}
          </h2>
          <p className="header-spaces-page-first-article-main-text">
            {pageData.info2text}{" "}
          </p>
        </div>
        <div className="header-spaces-page-first-article-main-info">
          {" "}
          <h2 className="header-spaces-page-first-article-main-info-3">
            {pageData.info3}
          </h2>
          <p className="header-spaces-page-first-article-main-text">
            {pageData.info3text}
          </p>
        </div>
      </div>
    </article>
  );
}

export default FirstArticle;
