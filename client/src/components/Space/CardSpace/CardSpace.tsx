import "./CardSpace.css";

interface CardSpaceProps {
  fakeArraySpace: {
    id: number;
    space_name: string;
    description: string;
    url_image: string;
    price: number;
    capacity: number;
    space_type: string;
  };
}

function CardSpace({ fakeArraySpace }: CardSpaceProps) {
  const creneaux = [
    { id: 1, heure: "8h-10h" },
    { id: 2, heure: "9h-11h" },
    { id: 3, heure: "10h-12h" },
    { id: 4, heure: "11h-13h" },
    { id: 5, heure: "12h-14h" },
    { id: 6, heure: "13h-15h" },
    { id: 7, heure: "14h-16h" },
    { id: 8, heure: "15h-17h" },
    { id: 9, heure: "16h-18h" },
    { id: 10, heure: "17h-19h" },
    { id: 11, heure: "18h-20h" },
    { id: 12, heure: "19h-21h" },
    { id: 13, heure: "20h-22h" },
  ];

  return (
    <div className="div-Card">
      <h3>{fakeArraySpace.space_name}</h3>
      <p>{fakeArraySpace.description}</p>
      {creneaux
        .filter((creneau) => [1, 3, 7, 9, 11].includes(creneau.id))
        .map((creneau) => (
          <span key={creneau.id}>{creneau.heure}</span>
        ))}
      <button type="button">Réserver</button>
    </div>
  );
}

export default CardSpace;
