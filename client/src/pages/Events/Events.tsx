import "./Events.css";

import useUpcomingEvents from "../../hooks/useUpcomingEvents";

function Events() {
  const upcomingEvents = useUpcomingEvents();
  return (
    <>
      {upcomingEvents.map((upcomingEvent) => (
        <article key={upcomingEvent.id}>
          <p>name = {upcomingEvent.name}</p>
          <p>start date = {upcomingEvent.start_date}</p>
          <p>end date = {upcomingEvent.end_date}</p>
          <p>start hour = {upcomingEvent.start_hour}</p>
          <p>end hour = {upcomingEvent.end_hour}</p>
          <p>space name = {upcomingEvent.space_name}</p>
          <p>price unit = {upcomingEvent.price_unit}</p>
          <p>url img = {upcomingEvent.url_image}</p>
        </article>
      ))}
    </>
  );
}

export default Events;

/* id: number;
  name: string;
  space_name: string;
  space_type: string;
  start_date: string;
  end_date: string;
  start_hour: string;
  end_hour: string;
  price_unit: number;
  url_image?: string; */
