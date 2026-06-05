import "./CardSpace.css";
import useTimeSlot from "../../../../hooks/useTimeSlot";
import type { Space } from "../../../../types/space";

type CardSpaceProps = {
  space: Space;
};

function CardSpace({ space }: CardSpaceProps) {
  const timeslots = useTimeSlot();
  console.log(space.url_image);
  return (
    <div className="card-space-card-div">
      <h3 className="card-space-card-name">{space.space_name}</h3>

      <p className="card-space-card-description">{space.description}</p>

      {timeslots.map((timeslot) => (
        <span className="card-space-card-timeslot" key={timeslot.id}>
          {timeslot.slot}
        </span>
      ))}
      <img
        src={`${import.meta.env.VITE_API_URL}${space.url_image}`}
        alt={space.space_name}
      />
      <button type="button" className="card-space-card-reservation-button">
        Réserver
      </button>
    </div>
  );
}

export default CardSpace;
