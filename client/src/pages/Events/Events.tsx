import { useState } from "react";
import Calendar from "react-calendar";
import CardEvent from "../../components/Event/CardEvent";
import useSumParticipants from "../../hooks/useSumParticipants";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";

import FooterHome from "../../components/FooterHome/FooterHome";
import FirstArticle from "../../components/SpacesPage/Header/FirstArticle/FirstArticle";
import "./Events.css";
import "react-calendar/dist/Calendar.css";
import type { FirstArticleProps } from "../../types/firstarticleprops";

function Events() {
  const EventFirstArticle: FirstArticleProps = {
    bigtitle: "AGENDA DU TIERS LIEU",
    sloganBegin: "Des",
    sloganItalic: "évènements",
    sloganEnd: "qui créent du lien",
    description:
      "Conférences, concerts, expositions, workshops ouverts... Le Local anime son espace avec une programmation variée et inclusive",
    info1: 28,
    info1text: "CE MOIS-CI",
    info2: 340,
    info2text: "PARTICIPANTS / MOIS",
    info3: "12",
    info3text: "ORGANISATIONS",
  };

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
      <section className="events-section-hero">
        <FirstArticle pageData={EventFirstArticle} />
      </section>
      <section className="events-section-ALAUNE">
        <div className="events-big-title">
          <h2 className="events-title">Nos évènements</h2>
          <hr className="events-page-hr" />
        </div>
        <h2 className="events-title">A la une</h2>
        <div>faire composant event le plus proche</div>
      </section>
      <section className="events-section-AGENDA">
        <h2 className="events-title">Agenda</h2>
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
      </section>
      <section className="events-section-NEXT">
        <div className="events-div-next-events">
          <h2 className="events-title">Prochains évènements</h2>
          <button
            type="button"
            className="events-btn-see-all"
            onClick={() => setSelectedDate(null)}
          >
            Voir tous les évènements
          </button>
        </div>
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
      </section>
      <FooterHome />
    </>
  );
}

export default Events;

/*code repris de EventSection pour la demo-> voir pour refacto, faire un composant */
