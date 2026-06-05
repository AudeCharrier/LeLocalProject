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
    <div className="div-Card">
      <h3>{space.space_name}</h3>

      <p>{space.description}</p>

      {timeslots.map((timeslot) => (
        <span key={timeslot.id}>{timeslot.slot}</span>
      ))}

      <button type="button">Réserver</button>
    </div>
  );
}

export default CardSpace;
