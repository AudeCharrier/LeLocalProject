import CardEvent from "../CardEvent";
import "./EventSection.css";

function EventSection() {
  return (
    <section className="home-section-events">
      <h5>Agenda</h5>
      <div className="Title">
        <h2>Evènements à venir</h2>
        <p>Voir tout</p>
      </div>

      <CardEvent />
    </section>
  );
}

export default EventSection;
