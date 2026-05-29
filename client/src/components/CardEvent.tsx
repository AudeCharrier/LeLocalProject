import { Link } from "react-router";
import "./CardEvent.css";

function CardEvent() {
  //tableau tiré de la bdd : event, capacity, participants?
  const fakearray = [
    {
      name: "Soirée Pitch & Bière",
      description:
        "Pitchez votre projet en 3 minutes devant la communauté La Forge. Bières artisanales offertes.",
      start_day: "12 juin 2026",
      timeslot: "19h-22h",
      space_name: "Salle Evenementielle",
      participants: 54,
      remaining: 26,
      capacity: 80,
    },
  ];

  const progress: number =
    (fakearray[0].participants / fakearray[0].capacity) * 100;

  return (
    <article className="card-event-container">
      <div className="card-img-container">
        <img src="" alt="" className="card-img" />
      </div>
      <span className="card-badge-price">Gratuit</span>
      <div className="card-text-flex">
        <h3>{fakearray[0].name}</h3>
        <p>{fakearray[0].description}</p>
        <span className="card-event-infos">
          icone {fakearray[0].start_day} {fakearray[0].timeslot}
        </span>
        <span className="card-event-infos">
          icone {fakearray[0].space_name}
        </span>
        <div className="card-nbplaces-container">
          <p>{fakearray[0].participants} inscrit.es</p>
          <p>{fakearray[0].remaining} places restantes</p>
        </div>
        <div className="card-progressbar-wrapper">
          <div
            className="card-progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          {/*
            progressbar est une balise vide de contenu : biome préfère utiliser des aria
          */}
        </div>
        <Link to="/evenements" className="card-link-register">
          <span className="sr-only">S'inscrire</span>
        </Link>
      </div>
    </article>
  );
}

export default CardEvent;
