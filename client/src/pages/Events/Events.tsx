import "./Events.css";

import CardEvent from "../../components/Event/CardEvent";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";

function Events() {
  const upcomingEvents = useUpcomingEvents();
  return (
    <>
      {upcomingEvents.map((upcomingEvent) => (
        <CardEvent event={upcomingEvent} key={upcomingEvent.id} />
      ))}
    </>
  );
}

export default Events;
