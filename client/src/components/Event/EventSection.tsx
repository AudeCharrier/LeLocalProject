import CardEvent from "./CardEvent";
import "./EventSection.css";

import useSumParticipants from "../../hooks/useSumParticipants";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";
import { ModalEventProvider } from "../../context/CloseEventModalContext";

function EventSection() {
  const upcomingEvents = useUpcomingEvents();
  const participants = useSumParticipants();

  return (
    <section className="home-section-events">
      <h5>Agenda</h5>
      <div className="home-section-title">
        <h2>Evènements à venir</h2>
        <p>Voir tout</p>
      </div>
      <div className="home-events">
        {upcomingEvents.map((upcomingEvent) => {
          const eventParticipants = participants.find(
            (p) => p.id_activity === upcomingEvent.id,
          );
          return (
            <ModalEventProvider key={upcomingEvent.id}>
              <CardEvent
                /* key={upcomingEvent.id} */
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
