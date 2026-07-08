import CardEvent from "./CardEvent";
import "./EventSection.css";
import { Link } from "react-router";
import { ModalEventProvider } from "../../context/CloseEventModalContext";
import useParticipants from "../../hooks/useParticipants";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";

function EventSection() {
  const upcomingEvents = useUpcomingEvents();
  const participants = useParticipants();

  return (
    <section className="home-section-events">
      <h3 className="home-section-events-subtitle">Agenda</h3>
      <div className="home-section-title">
        <h2>Evènements à venir</h2>
        <Link to="/evenements" className="space-section-see-all">
          Voir tout
        </Link>
      </div>
      <div className="home-events">
        {upcomingEvents.slice(0, 3).map((upcomingEvent) => {
          const eventParticipants = participants.find(
            (p) => p.id_activity === upcomingEvent.id,
          );
          return (
            <ModalEventProvider key={upcomingEvent.id}>
              <CardEvent
                event={upcomingEvent}
                participants={eventParticipants}
              />
            </ModalEventProvider>
          );
        })}
      </div>
    </section>
  );
}
export default EventSection;
