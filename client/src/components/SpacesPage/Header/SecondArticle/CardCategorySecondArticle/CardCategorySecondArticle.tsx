import "./CardCategorySecondArticle.css";
import type { Space } from "../../../../../types/space";

type CardSpaceProps = {
  spaces: Space[];
  categoryId: number;
  categoryName: string;
};

function CardCategorySecondArticle({
  spaces,
  categoryName,
  categoryId,
}: CardSpaceProps) {
  const firstSpace = spaces[0];
  const totalCapacity = spaces.reduce((acc, space) => acc + space.capacity, 0);
  const isStudio = categoryName.toLowerCase().includes("studio");
  const isLocal = firstSpace.space_category === "Local vide";

  const renderSlots = () => {
    if (isStudio) {
      return (
        <>
          <span className="card-space-card-timeslot">
            Aujourd'hui — {spaces.length}/{spaces.length} studio
            {spaces.length > 1 ? "s" : ""} disponible
            {spaces.length > 1 ? "s" : ""}
          </span>
        </>
      );
    }

    if (isLocal) {
      return (
        <span className="card-space-card-timeslot">
          Ce mois-ci — {spaces.length} loca{spaces.length > 1 ? "ux" : ""}{" "}
          disponible
          {spaces.length > 1 ? "s" : ""}
        </span>
      );
    }

    return (
      <>
        <span className="card-space-card-timeslot">
          Aujourd'hui — {totalCapacity * 2}/{totalCapacity * 2} places
        </span>
      </>
    );
  };

  return (
    <div className="header-spaces-page-second-article-space-type-div">
      <div className="header-spaces-page-second-article-space-type-number">
        {String(categoryId).padStart(2, "0")}
      </div>
      <div className="header-spaces-page-second-article-space-type-info">
        <h3 className="header-spaces-page-second-article-space-type-info-type">
          {categoryName}
        </h3>
        <p className="header-spaces-page-second-article-space-type-info-availability">
          {renderSlots()}
        </p>
      </div>
    </div>
  );
}

export default CardCategorySecondArticle;
