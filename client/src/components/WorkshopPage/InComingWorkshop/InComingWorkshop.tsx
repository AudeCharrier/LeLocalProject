import "./InComingWorkshop.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import useSpaceAvailability from "../../../hooks/useSpaceAvailability";
import type { Space } from "../../../types/space";
import SpaceModal from "../../SpacesPage/Body/SpaceModal/SpaceModal";
import SpaceModalContent from "../../SpacesPage/Body/SpaceModal/SpaceModalContent/SpaceModalContent";

interface WorkshopProps {
  workshop: Space;
}

function InComingWorkshop({ workshop }: WorkshopProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const { availability: availMatin } = useSpaceAvailability(
    workshop.id,
    today,
    "1",
  );
  const { availability: availApresMidi } = useSpaceAvailability(
    workshop.id,
    today,
    "2",
  );

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
          <span className="workshop__category">{workshop.space_type}</span>
          <span className="workshop-price">{workshop.price_unit}</span>
        </div>

        <div className="incoming-workshop__description">
          <p>Aujourd'hui</p>
          <span className="workshop-capacity-span">
            Matin — {availMatin?.available ?? workshop.capacity}/
            {workshop.capacity} places
          </span>
          <span className="workshop-capacity-span">
            Après-midi — {availApresMidi?.available ?? workshop.capacity}/
            {workshop.capacity} places
          </span>
        </div>

        <div className="incoming-workshop__footer">
          <div className="incoming-workshop__teacher-info">
            <button
              type="button"
              className="card-btn-register"
              onClick={() => setIsModalOpen(true)}
            >
              Voir l'espace
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
