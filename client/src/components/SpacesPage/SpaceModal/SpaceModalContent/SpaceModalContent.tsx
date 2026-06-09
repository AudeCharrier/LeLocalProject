import { useState } from "react";
import type { Space } from "../../../../types/space";
import "./SpaceModalContent.css";
type SpaceModalContentProps = {
  spaces: Space[];
  categoryName: string;
};

function SpaceModalContent({ spaces, categoryName }: SpaceModalContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSpace = spaces[currentIndex];

  const handlePrev = () => setCurrentIndex((i) => i - 1);
  const handleNext = () => setCurrentIndex((i) => i + 1);

  return (
    <div className="space-modal-content">
      <h2 className="space-modal-content-title">{categoryName}</h2>

      <div className="space-modal-content-carousel">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="space-modal-content-carousel-arrow"
        >
          ‹
        </button>
        <article>
          <section>
            <img
              src={`${import.meta.env.VITE_API_URL}/${currentSpace.url_image}`}
              alt={currentSpace.space_name}
            />
          </section>
          <section className="space-modal-content-carousel-slide">
            <h3 className="space-modal-content-carousel-slide-name">
              {currentSpace.space_name}
            </h3>
            <p className="space-modal-content-carousel-slide-description">
              {currentSpace.description}
            </p>
            <p className="space-modal-content-carousel-slide-price">
              {currentSpace.price_unit}€ / unité
            </p>
            <p className="space-modal-content-carousel-slide-capacity">
              Capacité : {currentSpace.capacity} personnes
            </p>
          </section>
        </article>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === spaces.length - 1}
          className="space-modal-content-carousel-arrow"
        >
          ›
        </button>
      </div>

      <p className="space-modal-content-counter">
        {currentIndex + 1} / {spaces.length}
      </p>
    </div>
  );
}

export default SpaceModalContent;
