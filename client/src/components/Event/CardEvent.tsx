import { Link } from "react-router";
import "./CardEvent.css";

import { Calendar, MapPin } from "lucide-react";

interface CardEventProps {
  event: {
    id: number;
    name: string;
    description: string;
    space_name: string;
    url_image: string;
    price_unit: number;
    start_date: string;
    start_hour: string;
    end_hour: string;
    capacity: number;
  };
  participants?: {
    activity_id: number;
    name: string;
    sum_participants: number;
    capacity: number;
  };
}

function CardEvent({ event, participants }: CardEventProps) {
  const capacity = participants?.capacity ?? 0;
  const sumParticipants = participants?.sum_participants ?? 0;
  const progress = capacity > 0 ? (sumParticipants / capacity) * 100 : 0;
  const remaining = Math.max(capacity - sumParticipants, 0);
  /*on redéfinit sumParticipants, c'est plus simple car "participants" peut etre null (aucun inscrit, aucun calcul possible en bdd)*/

  return (
    <article className="card-event-container">
      <div className="card-img-container">
        <img src={event.url_image} alt="" className="card-img" />
      </div>
      <span className="card-badge-price">
        {event.price_unit === 0 ? "Gratuit" : `${event.price_unit} €`}
      </span>
      <div className="card-text-flex">
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <div className="card-event-row-infos">
          <span className="card-event-infos">
            <Calendar size={16} />
          </span>
          <span className="card-event-infos">
            {event.start_date &&
              `${event.start_date.slice(8, 10)}-${event.start_date.slice(5, 7)}-${event.start_date.slice(0, 4)}`}{" "}
            {event.start_hour?.slice(0, 5)} - {event.end_hour?.slice(0, 5)}
          </span>{" "}
          {/*event.start_hour? : si end_hour est null/undefined, il court-circuite et retourne undefined. Sinon, il appelle .slice(0, 5)*/}
        </div>
        <div className="card-event-row-infos">
          <span className="card-event-infos">
            <MapPin size={16} />
          </span>
          <span className="card-event-infos">{event.space_name}</span>
        </div>
        <div className="card-nbplaces-container">
          <p>{sumParticipants} inscrit.es</p>
          <p>{remaining} places restantes</p>
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
