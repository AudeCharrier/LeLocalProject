import "./CardSpace.css";
import useTimeSlot from "../../../../hooks/useTimeSlot";
import type { Space } from "../../../../types/space";

type CardSpaceProps = {
  space: Space;
};

function CardSpace({ space }: CardSpaceProps) {
  const timeslots = useTimeSlot();
  console.log(timeslots);

  return (
    <div className="card-space-card-div">
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
  );
}

export default CardSpace;
