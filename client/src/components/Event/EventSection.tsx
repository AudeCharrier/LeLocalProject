import CardEvent from "../CardEvent";
import "./EventSection.css";

function EventSection() {
  //tableau tiré de la bdd : event, capacity, participants?
  const fakeArrayEvents = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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

  return (
    <section className="home-section-events">
      <h5>Agenda</h5>
      <div className="home-section-title">
        <h2>Evènements à venir</h2>
        <p>Voir tout</p>
      </div>
      <div className="home-events">
        {fakeArrayEvents.map((fakeArrayEvent) => (
          <CardEvent key={fakeArrayEvent.id} fakeArrayEvent={fakeArrayEvent} />
        ))}
      </div>
    </section>
  );
}

export default EventSection;
