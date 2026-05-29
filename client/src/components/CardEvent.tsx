import { Link } from "react-router";
import "./CardEvent.css";

import { Calendar, MapPin } from "lucide-react";

function CardEvent() {
  //tableau tiré de la bdd : event, capacity, participants?
  const fakearray = [
    {
      name: "Soirée Pitch & Bière",
      description:
        "Pitchez votre projet en 3 minutes devant la communauté La Forge. Bières artisanales offertes.",
      imgSrc:
        "https://images.unsplash.com/photo-1767475048019-4cbf6d914472?w=800&h=600&fit=crop&auto=format",
      price: "Gratuit",
      start_day: "12 juin 2026",
      timeslot: "19h-22h",
      space_name: "Salle Evenementielle",
      participants: 54,
      remaining: 26,
      capacity: 80,
    },
    {
      name: "Workshop No Code",
      description:
        "Construisez votre première app sans écrire une ligne de code.",
      imgSrc:
        "https://images.unsplash.com/photo-1777559542626-a72e0ee96eca?w=800&h=600&fit=crop&auto=format",
      price: "5€",
      start_day: "18 juin 2026",
      timeslot: "14h-17h",
      space_name: "Lab Numérique",
      participants: 12,
      remaining: 3,
      capacity: 15,
    },
    {
      name: "Rencontres Makers",
      description:
        "Rencontre mensuelle des makers, fabbers et bricoleurs du 11e. Show and tell libre.",
      imgSrc:
        "https://images.unsplash.com/photo-1715593948000-adbdf0cee759?w=800&h=600&fit=crop&auto=format",
      price: "Gratuit",
      start_day: "25 juin 2026",
      timeslot: "18h-21h",
      space_name: "OpenSpace principal",
      participants: 38,
      remaining: 22,
      capacity: 60,
    },
  ];

  const progress = [
    (fakearray[0].participants / fakearray[0].capacity) * 100,
    (fakearray[1].participants / fakearray[1].capacity) * 100,
    (fakearray[2].participants / fakearray[2].capacity) * 100,
  ];

  return (
    <section className="home-events">
      <article className="card-event-container">
        <div className="card-img-container">
          <img src={fakearray[0].imgSrc} alt="" className="card-img" />
        </div>
        <span className="card-badge-price">{fakearray[0].price}</span>
        <div className="card-text-flex">
          <h3>{fakearray[0].name}</h3>
          <p>{fakearray[0].description}</p>
          <div className="card-event-row-infos">
            <Calendar size={16} />
            <span className="card-event-infos">
              {fakearray[0].start_day} {fakearray[0].timeslot}
            </span>
          </div>
          <div className="card-event-row-infos">
            <MapPin size={16} />
            <span className="card-event-infos">{fakearray[0].space_name}</span>
          </div>
          <div className="card-nbplaces-container">
            <p>{fakearray[0].participants} inscrit.es</p>
            <p>{fakearray[0].remaining} places restantes</p>
          </div>
          <div className="card-progressbar-wrapper">
            <div
              className="card-progressbar"
              style={{ width: `${progress[0]}%` }}
              aria-valuenow={progress[0]}
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
      <article className="card-event-container">
        <div className="card-img-container">
          <img src={fakearray[1].imgSrc} alt="" className="card-img" />
        </div>
        <span className="card-badge-price">{fakearray[1].price}</span>
        <div className="card-text-flex">
          <h3>{fakearray[1].name}</h3>
          <p>{fakearray[1].description}</p>
          <div className="card-event-row-infos">
            <Calendar size={16} />
            <span className="card-event-infos">
              {fakearray[1].start_day} {fakearray[1].timeslot}
            </span>
          </div>
          <div className="card-event-row-infos">
            <MapPin size={16} />
            <span className="card-event-infos">{fakearray[1].space_name}</span>
          </div>
          <div className="card-nbplaces-container">
            <p>{fakearray[1].participants} inscrit.es</p>
            <p>{fakearray[1].remaining} places restantes</p>
          </div>
          <div className="card-progressbar-wrapper">
            <div
              className="card-progressbar"
              style={{ width: `${progress[1]}%` }}
              aria-valuenow={progress[1]}
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
      <article className="card-event-container">
        <div className="card-img-container">
          <img src={fakearray[2].imgSrc} alt="" className="card-img" />
        </div>
        <span className="card-badge-price">{fakearray[2].price}</span>
        <div className="card-text-flex">
          <h3>{fakearray[2].name}</h3>
          <p>{fakearray[2].description}</p>
          <div className="card-event-row-infos">
            <Calendar size={16} />
            <span className="card-event-infos">
              {fakearray[2].start_day} {fakearray[2].timeslot}
            </span>
          </div>
          <div className="card-event-row-infos">
            <MapPin size={16} />
            <span className="card-event-infos">{fakearray[2].space_name}</span>
          </div>
          <div className="card-nbplaces-container">
            <p>{fakearray[2].participants} inscrit.es</p>
            <p>{fakearray[2].remaining} places restantes</p>
          </div>
          <div className="card-progressbar-wrapper">
            <div
              className="card-progressbar"
              style={{ width: `${progress[2]}%` }}
              aria-valuenow={progress[2]}
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
    </section>
  );
}

export default CardEvent;
