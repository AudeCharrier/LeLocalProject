import { Link } from "react-router";
import "./CardEvent.css";

import { Calendar, MapPin } from "lucide-react";

interface CardEventProps {
  fakeArrayEvent: {
    id: number;
    name: string;
    description: string;
    imgSrc: string;
    price: string;
    start_day: string;
    timeslot: string;
    space_name: string;
    participants: number;
    remaining: number;
    capacity: number;
  };
}

function CardEvent({ fakeArrayEvent }: CardEventProps) {
  const progress =
    (fakeArrayEvent.participants / fakeArrayEvent.capacity) * 100;

  return (
    <article className="card-event-container" key={fakeArrayEvent.id}>
      <div className="card-img-container">
        <img src={fakeArrayEvent.imgSrc} alt="" className="card-img" />
      </div>
      <span className="card-badge-price">{fakeArrayEvent.price}</span>
      <div className="card-text-flex">
        <h3>{fakeArrayEvent.name}</h3>
        <p>{fakeArrayEvent.description}</p>
        <div className="card-event-row-infos">
          <span className="card-event-infos">
            <Calendar size={16} />
          </span>
          <span className="card-event-infos">
            {fakeArrayEvent.start_day} {fakeArrayEvent.timeslot}
          </span>
        </div>
        <div className="card-event-row-infos">
          <span className="card-event-infos">
            <MapPin size={16} />
          </span>
          <span className="card-event-infos">{fakeArrayEvent.space_name}</span>
        </div>
        <div className="card-nbplaces-container">
          <p>{fakeArrayEvent.participants} inscrit.es</p>
          <p>{fakeArrayEvent.remaining} places restantes</p>
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
