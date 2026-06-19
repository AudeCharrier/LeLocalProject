import "./CardSpace.css";
import useTimeSlot from "../../../hooks/useTimeSlot";

interface CardSpaceProps {
  fakeArraySpace: {
    id: number;
    space_name: string;
    description: string;
    url_image: string;
    price_unit: number;
    capacity: number;
    space_type: string;
  };
}

function CardSpace({ fakeArraySpace }: CardSpaceProps) {
  const creneaux = useTimeSlot();
  return (
    <div className="div-Card">
      <h3>{fakeArraySpace.space_name}</h3>
      <p>{fakeArraySpace.description}</p>
      {creneaux
        .filter((slot) => slot.slot !== "Soir")
        .map((creneau) => (
          <div key={creneau.id}>
            <span>{creneau.slot}</span>
            <span>{fakeArraySpace.price_unit}</span>
          </div>
        ))}
      <button type="button">Réserver</button>
    </div>
  );
}

export default CardSpace;
