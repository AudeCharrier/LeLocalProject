import "./CardSpace.css";
function CardSpace() {
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
    <section className="section-cardspace">
      <div className="div-Card">
        <h3>Openspace Principal</h3>
        <p>
          Grand espace lumineux de 200m² avec vue sur la cour intérieure
          végétalisée.
        </p>
        {creneaux
          .filter((creneau) => [1, 3, 7, 9, 11].includes(creneau.id))
          .map((creneau) => (
            <span key={creneau.id}>{creneau.heure}</span>
          ))}
        <button type="button">Réserver</button>
      </div>
      <div className="div-Card">
        <h3>Studio d'Enregistrement</h3>
        <p>
          Cabine insonorisée professionnelle avec régie son et matériel haut de
          gamme.
        </p>
        {creneaux
          .filter((creneau) => [3, 5, 7, 9, 11].includes(creneau.id))
          .map((creneau) => (
            <span key={creneau.id}>{creneau.heure}</span>
          ))}
        <button type="button">Réserver</button>
      </div>
      <div className="div-Card">
        <h3>Salle de Réunion</h3>
        <p>
          Salle conférence équipée pour workshops, présentations et réunions
          clients.
        </p>
        {creneaux
          .filter((creneau) => [2, 4, 7, 9].includes(creneau.id))
          .map((creneau) => (
            <span key={creneau.id}>{creneau.heure}</span>
          ))}
        <button type="button">Réserver</button>
      </div>
      <div className="div-Card">
        <h3>Studio Photo</h3>
        <p>
          Studio photo pro avec fonds colorés, lumières Profoto et espace de
          shoot.
        </p>
        {creneaux
          .filter((creneau) => [2, 4, 7, 9].includes(creneau.id))
          .map((creneau) => (
            <span key={creneau.id}>{creneau.heure}</span>
          ))}
        <button type="button">Réserver</button>
      </div>
    </section>
  );
}

export default CardSpace;
