import "./CardSpace.css";
import type { Space } from "../../../../types/space";

type CardSpaceProps = {
  spaces: Space[];
  categoryName: string;
};

function CardSpace({ spaces, categoryName }: CardSpaceProps) {
  const firstSpace = spaces[0];
  const totalCapacity = spaces.reduce((acc, space) => acc + space.capacity, 0);

  const spaceCategory = firstSpace.space_category;

  const isStudio = spaceCategory.toLowerCase().includes("studio");
  const isLocal = spaceCategory === "Local modulable";

  const renderSlots = () => {
    if (isStudio) {
      return (
        <>
          <span className="card-space-card-timeslot">
            Matin — {spaces.length} studio{spaces.length > 1 ? "s" : ""}{" "}
            disponible{spaces.length > 1 ? "s" : ""}
          </span>
          <span className="card-space-card-timeslot">
            Après-midi — {spaces.length} studio{spaces.length > 1 ? "s" : ""}{" "}
            disponible{spaces.length > 1 ? "s" : ""}
          </span>
        </>
      );
    }

    if (isLocal) {
      return (
        <span className="card-space-card-timeslot">
          {spaces.length} local{spaces.length > 1 ? "aux" : ""} disponible
          {spaces.length > 1 ? "s" : ""} ce mois-ci
        </span>
      );
    }

    return (
      <>
        <span className="card-space-card-timeslot">
          Matin — {totalCapacity}/{totalCapacity} places disponibles aujourd'hui
        </span>
        <span className="card-space-card-timeslot">
          Après-midi — {totalCapacity}/{totalCapacity} places disponibles
          aujourd'hui
        </span>
      </>
    );
  };

  return (
    <div className="card-space-card-div">
      <div className="card-space-card-img-div">
        <img
          className="card-space-card-img"
          src={`${import.meta.env.VITE_API_URL}${firstSpace.url_image}`}
          alt={categoryName}
        />
      </div>
      <div className="card-space-card-info-div">
        <h3 className="card-space-card-name">{categoryName}</h3>

        <p className="card-space-card-description">
          {spaces.length} espace{spaces.length > 1 ? "s" : ""} disponible
          {spaces.length > 1 ? "s" : ""}
        </p>

        {renderSlots()}

        <button type="button" className="card-space-card-reservation-button">
          Voir tous les {categoryName}s
        </button>
      </div>
    </div>
  );
}

export default CardSpace;
