import "./Events.css";

import CardEvent from "../../components/Event/CardEvent";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";
import useSumParticipants from "../../hooks/useSumParticipants";

function Events() {
  const upcomingEvents = useUpcomingEvents();
  const participants = useSumParticipants();

  return (
    <div className="home-events">
      {upcomingEvents.map((upcomingEvent) => {
        const eventParticipants = participants.find(
          (p) => p.id_activity === upcomingEvent.id,
        );
        return (
          <CardEvent
            key={upcomingEvent.id}
            event={upcomingEvent}
            participants={eventParticipants}
          />
        );
      })}
    </div>
  );
}
/*code repris de EventSection pour la demo-> voir pour refacto, faire un composant */

export default Events;
