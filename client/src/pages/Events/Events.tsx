import { useState } from "react";
import CardEvent from "../../components/Event/CardEvent";
import useSumParticipants from "../../hooks/useSumParticipants";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";
import Calendar from "react-calendar";

import "./Events.css";
import "react-calendar/dist/Calendar.css";

function Events() {
  //données bdd
  const upcomingEvents = useUpcomingEvents();
  const participants = useSumParticipants();

  //sélection de date pour filtrer les events
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const chooseDate = (date: Date) => {
    // le calendrier affiche la case sélectionnée (style css)
    setSelectedDate(date);
  };

  const selectedEvents = selectedDate
    ? upcomingEvents.filter((event) => {
        // On transforme la date du calendrier en "AAAA-MM-JJ" (comme en bdd)
        const dateCalendrierFormatee = selectedDate.toLocaleDateString("fr-CA");

        // On compare la date sélectionnée et celles des events pour garder els bons events
        return event.start_date.slice(0, 10) === dateCalendrierFormatee;
      })
    : upcomingEvents;

  // style css

  // on analyse chaque case (tile) du calendrier
  const dynamicTileClassName = ({
    date,
    view,
  }: { date: Date; view: string }) => {
    // On ne veut ajouter la classe que sur la vue "mois" (pas année/décennie)
    if (view === "month") {
      const dateCaseFormatee = date.toLocaleDateString("fr-CA");

      // On cherche si un événement en BDD correspond à la date de cette case
      const hasEvent = upcomingEvents.some(
        (event) => event.start_date.slice(0, 10) === dateCaseFormatee,
      );

      // Si oui, on renvoie le nom de la classe CSS
      if (hasEvent) {
        return "has-event";
      }
    }
    return "no-event";
  };

  return (
    <>
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            chooseDate(value);
          }
        }}
        value={selectedDate}
        tileClassName={dynamicTileClassName}
      />
      {/*tileClassName est une propriété de calendar pour le css*/}
      <button
        type="button"
        className="events-btn-see-all"
        onClick={() => setSelectedDate(null)}
      >
        Voir tous les évènements
      </button>
      <div className="home-events">
        {selectedEvents.map((selectedEvent) => {
          const eventParticipants = participants.find(
            (p) => p.id_activity === selectedEvent.id,
          );
          return (
            <CardEvent
              key={selectedEvent.id}
              event={selectedEvent}
              participants={eventParticipants}
            />
          );
        })}
      </div>
    </>
  );
}
/*code repris de EventSection pour la demo-> voir pour refacto, faire un composant */

export default Events;
