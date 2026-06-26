import "./InComingWorkshop.css";
import { useWorkshopModalContext } from "../../../hooks/useWorkshopModalContext";
import type { Space } from "../../../types/space";
import RegisterWorkshopForm from "../../RegisterWorkshopForm/RegisterWorkshopForm";

interface WorkshopProps {
  workshop: Space;
}

function InComingWorkshop({ workshop }: WorkshopProps) {
  const { selectedWorkshopId, setSelectedWorkshopId } =
    useWorkshopModalContext();

  return (
    <div className="incoming-workshop">
      <div className="incoming-workshop__inner">
        <div
          className="incoming-workshop__top"
          style={{
            backgroundImage: workshop.url_image
              ? `url(${workshop.url_image})`
              : undefined,
          }}
        >
          <div className="incoming-workshop__top-row">
            {/* <span className="incoming-workshop__badge-places">
              {availability
                ? `${availability.available} places libres`
                : `${workshop.capacity} places`}
            </span> */}
          </div>
          {/* <div className="incoming-workshop__badge-date">
            <span className="incoming-workshop__date-day">{day}</span>
            <span className="incoming-workshop__date-month">{month}</span>
          </div> */}
        </div>

        <div className="incoming-workshop__description">
          <span className="incoming-workshop__category">
            {workshop.space_type}
          </span>
          <h2>{workshop.space_name}</h2>
          <p>{workshop.description}</p>
        </div>

        <div className="incoming-workshop__footer">
          <div className="incoming-workshop__teacher-info">
            <span className="incoming-workshop__price">
              {workshop.price_unit}€
            </span>
            <button
              type="button"
              className="card-btn-register"
              onClick={() => setSelectedWorkshopId(workshop.id)}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
      {selectedWorkshopId === workshop.id && (
        <RegisterWorkshopForm workshop={workshop} />
      )}
    </div>
  );
}

export default InComingWorkshop;
