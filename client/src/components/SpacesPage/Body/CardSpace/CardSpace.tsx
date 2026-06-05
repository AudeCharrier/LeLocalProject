import "./CardSpace.css";
import useTimeSlot from "../../../../hooks/useTimeSlot";
import type { Space } from "../../../../types/space";

type CardSpaceProps = {
  space: Space;
};

function CardSpace({ space }: CardSpaceProps) {
  const timeslots = useTimeSlot();

  return (
    <div className="card-space-card-div">
      <div className="card-space-card-img-div">
        <img
          className="card-space-card-img"
          src={`${import.meta.env.VITE_API_URL}${space.url_image}`}
          alt={space.space_name}
        />
      </div>
      <div className="card-space-card-info-div">
        <h3 className="card-space-card-name">{space.space_name}</h3>

        <p className="card-space-card-description">{space.description}</p>

        {timeslots.map((timeslot) => (
          <span className="card-space-card-timeslot" key={timeslot.id}>
            {timeslot.slot}
          </span>
        ))}
        <button type="button" className="card-space-card-reservation-button">
          Réserver
        </button>
      </div>
    </div>
  );
}

export default CardSpace;
