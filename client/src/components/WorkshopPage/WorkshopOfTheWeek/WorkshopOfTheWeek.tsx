import "./WorkshopOfTheWeek.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import useSpaceAvailability from "../../../hooks/useSpaceAvailability";
import SpaceModal from "../../SpacesPage/Body/SpaceModal/SpaceModal";
import SpaceModalContent from "../../SpacesPage/Body/SpaceModal/SpaceModalContent/SpaceModalContent";

import type { Space } from "../../../types/space";

interface WorkshopOfTheWeekProps {
  workshop: Space;
}

function WorkshopOfTheWeek({ workshop }: WorkshopOfTheWeekProps) {
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

  if (!workshop) return null;

  return (
    <section className="center-of-workshop-page">
      <div className="workshop-of-the-week">
        <div className="title-workshop-div">
          <h1 className="title-workshop-h1">NOS ATELIER</h1>
          <hr className="workshop-page-hr" />
        </div>

        <div className="workshop-of-the-week-card-parent">
          <div
            className="box-img-card-workshop-of-the-week"
            style={{
              backgroundImage: workshop.url_image
                ? `url(${import.meta.env.VITE_API_URL}${workshop.url_image})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="workshop-price">{workshop.price_unit} €</span>
            <span className="workshop__category">{workshop.space_type}</span>
          </div>

          <div className="info-card-workshop-of-the-week">
            <div className="description-of-the-week-workshop">
              <h1>{workshop.space_name}</h1>
            </div>

            <div className="about-workshop-of-the-week">
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

            <div className="btn-and-price-for-workshop-of-the-week">
              <div className="btn-of-the-week">
                <button
                  type="button"
                  className="btn-reserve"
                  onClick={() => setIsModalOpen(true)}
                >
                  Réserver ma place
                </button>
              </div>
            </div>
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
    </section>
  );
}

export default WorkshopOfTheWeek;
