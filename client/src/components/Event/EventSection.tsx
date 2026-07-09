import CardEvent from "./CardEvent";
import "./EventSection.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ModalEventProvider } from "../../context/CloseEventModalContext";
import useParticipants from "../../hooks/useParticipants";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";

function EventSection() {
  const upcomingEvents = useUpcomingEvents();
  const participants = useParticipants();

  const [maxCardsforGrid, setMaxCardsForGrid] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280 && window.innerWidth > 428) {
        setMaxCardsForGrid(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {upcomingEvents.slice(0, maxCardsforGrid).map((upcomingEvent) => {
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
