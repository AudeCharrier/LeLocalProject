import "./CardSpace.css";
import { useState } from "react";
import localVideImg from "../../../../assets/images/empty-space.png";
import sallereunionImg from "../../../../assets/images/meeting-room.png";
import openspaceImg from "../../../../assets/images/openspace.png";
import studioPhotoImg from "../../../../assets/images/photo-studio.png";
import studioEnregImg from "../../../../assets/images/studios.png";
import type { Space } from "../../../../types/space";
import Modal from "../../SpaceModal/SpaceModal";
import SpaceModalContent from "../../SpaceModal/SpaceModalContent/SpaceModalContent";

type CardSpaceProps = {
  spaces: Space[];
  categoryName: string;
};

function CardSpace({ spaces, categoryName }: CardSpaceProps) {
  const firstSpace = spaces[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalCapacity = spaces.reduce((acc, space) => acc + space.capacity, 0);

  const spaceCategory = firstSpace.space_category;

  const isStudio = spaceCategory.toLowerCase().includes("studio");

  const isLocal = spaceCategory === "Local vide";
  const minPrice = Math.min(...spaces.map((space) => space.price_unit));
  const CATEGORY_IMAGES: Record<string, string> = {
    "Open space": openspaceImg,
    "Studio photo": studioPhotoImg,
    "Studio d'enregistrement": studioEnregImg,
    "Salle de réunion": sallereunionImg,
    "Local vide": localVideImg,
  };

  const fallbackImg = openspaceImg; // image par défaut
  const renderSlots = () => {
    if (isStudio) {
      return (
        <>
          <span className="card-space-card-timeslot">
            Matin — {spaces.length}/{spaces.length} studio
            {spaces.length > 1 ? "s" : ""} disponible
            {spaces.length > 1 ? "s" : ""}
          </span>

          <span className="card-space-card-timeslot">
            Après-midi — {spaces.length}/{spaces.length} studio
            {spaces.length > 1 ? "s" : ""} disponible
            {spaces.length > 1 ? "s" : ""}
          </span>
        </>
      );
    }

    if (isLocal) {
      return (
        <span className="card-space-card-timeslot">
          {spaces.length} loca{spaces.length > 1 ? "ux" : ""} disponible
          {spaces.length > 1 ? "s" : ""}
        </span>
      );
    }

    return (
      <>
        <span className="card-space-card-timeslot">
          Matin — {totalCapacity}/{totalCapacity} places
        </span>

        <span className="card-space-card-timeslot">
          Après-midi — {totalCapacity}/{totalCapacity} places
        </span>
      </>
    );
  };

  return (
    <>
      <div className="card-space-card-div">
        <div className="card-space-card-img-div">
          <img
            className="card-space-card-img"
            src={CATEGORY_IMAGES[spaceCategory] ?? fallbackImg}
            alt={categoryName}
          />

          <span className="card-space-card-badge-price">Dès {minPrice}€</span>

          <h3 className="card-space-card-name">{categoryName}</h3>
        </div>

        <div className="card-space-card-info-div">
          <p className="card-space-card-description">Aujourd'hui</p>

          {renderSlots()}

          <button
            type="button"
            className="card-space-card-reservation-button"
            onClick={() => setIsModalOpen(true)}
          >
            Voir les espaces
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SpaceModalContent spaces={spaces} categoryName={categoryName} />
      </Modal>
    </>
  );
}

export default CardSpace;
