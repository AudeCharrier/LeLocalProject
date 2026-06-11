import { useState } from "react";
import type { Space } from "../../../../../types/space";
import "./SpaceModalContent.css";

type SpaceModalContentProps = {
  spaces: Space[];
  categoryName: string;
  onClose: () => void;
};

function SpaceModalContent({
  spaces,
  categoryName,
  onClose,
}: SpaceModalContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSpace = spaces[currentIndex];

  const isLocal = currentSpace.space_category === "Local vide";

  const isStudio = [
    "Studio d'enregistrement",
    "Studio photo",
    "Salle de réunion",
  ].includes(currentSpace.space_category);

  const handlePrev = () =>
    setCurrentIndex((i) => (i === 0 ? spaces.length - 1 : i - 1));

  const handleNext = () =>
    setCurrentIndex((i) => (i === spaces.length - 1 ? 0 : i + 1));

  return (
    <div className="space-modal-content">
      <div className="space-modal-image-wrapper">
        <button type="button" className="space-modal-close" onClick={onClose}>
          ✕
        </button>

        <img
          className="space-modal-image"
          src={`${import.meta.env.VITE_API_URL}${currentSpace.url_image}`}
          alt={currentSpace.space_name}
        />
      </div>

      <div className="space-modal-body">
        <h2 className="space-modal-content-title">{categoryName}</h2>

        <div className="space-modal-content-carousel">
          {spaces.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="space-modal-content-carousel-arrow"
            >
              ‹
            </button>
          )}

          <section className="space-modal-content-carousel-slide">
            <h3 className="space-modal-content-carousel-slide-name">
              {currentSpace.space_name}
            </h3>

            <p className="space-modal-content-carousel-slide-description">
              {currentSpace.description}
            </p>

            <p className="space-modal-content-carousel-slide-price">
              {currentSpace.price_unit}€
              {isLocal ? " / mois" : isStudio ? " / séance" : " / place"}
            </p>

            <p className="space-modal-content-carousel-slide-capacity">
              Capacité : {currentSpace.capacity} personnes
            </p>
          </section>

          {spaces.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="space-modal-content-carousel-arrow"
            >
              ›
            </button>
          )}
        </div>

        {spaces.length > 1 && (
          <>
            <p className="space-modal-content-counter">
              {currentIndex + 1} / {spaces.length}
            </p>

            <div className="space-modal-content-dots">
              {spaces.map((space, index) => (
                <button
                  key={space.id}
                  type="button"
                  className={index === currentIndex ? "dot active" : "dot"}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}

        <button type="button" className="space-modal-content-book-button">
          Réserver cet espace
        </button>
      </div>
    </div>
  );
}

export default SpaceModalContent;
