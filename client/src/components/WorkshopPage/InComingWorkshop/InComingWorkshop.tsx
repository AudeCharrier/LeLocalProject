import "./InComingWorkshop.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { Space } from "../../../types/space";
import SpaceModal from "../../SpacesPage/Body/SpaceModal/SpaceModal";
import SpaceModalContent from "../../SpacesPage/Body/SpaceModal/SpaceModalContent/SpaceModalContent";

interface WorkshopProps {
  workshop: Space;
}

function InComingWorkshop({ workshop }: WorkshopProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="incoming-workshop">
      <div className="incoming-workshop__inner">
        <div
          className="incoming-workshop__top"
          style={{
            backgroundImage: workshop.url_image
              ? `url(${import.meta.env.VITE_API_URL}${workshop.url_image})`
              : undefined,
          }}
        >
          {" "}
          <span className="incoming-workshop__category">
            {workshop.space_type}
          </span>
          <div className="incoming-workshop__top-row" />
        </div>

        <div className="incoming-workshop__description">
          <p>Aujoud'huit</p>
          <p>Matin</p>
        </div>

        <div className="incoming-workshop__footer">
          <div className="incoming-workshop__avatar">TC</div>
          <div className="incoming-workshop__teacher-info">
            <span className="incoming-workshop__teacher-name">Thomas C.</span>
            <span className="incoming-workshop__price">
              {workshop.price_unit}€
            </span>
            <button
              type="button"
              className="card-btn-register"
              onClick={() => setIsModalOpen(true)}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <SpaceModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <SpaceModalContent
                spaces={[workshop]}
                categoryName={workshop.space_category}
                onClose={() => setIsModalOpen(false)}
              />
            </SpaceModal>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}

export default InComingWorkshop;
