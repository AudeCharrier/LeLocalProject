import { useState } from "react";
import Calendar from "react-calendar";
import CardEvent from "../../components/Event/CardEvent";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
import FirstArticle from "../../components/SpacesPage/Header/FirstArticle/FirstArticle";
import { ModalEventProvider } from "../../context/CloseEventModalContext";
import useParticipants from "../../hooks/useParticipants";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";
import type { FirstArticleProps } from "../../types/firstarticleprops";
import "./Events.css";
import "react-calendar/dist/Calendar.css";
import CarrousselEvents from "../../components/Event/CarrousselEvents";
import useEventsOfTheDay from "../../hooks/useEventsOfTheDay";

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

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [maxCardsForGrid, setMaxCardsForGrid] = useState<number>(3);

  const chooseDate = (date: Date) => {
    // le calendrier affiche la case sélectionnée
    setSelectedDate(date);
  };
  const dateCalendarFormatted = selectedDate
    ? selectedDate.toLocaleDateString("fr-CA")
    : null;

  const eventsOfTheDay = useEventsOfTheDay(dateCalendarFormatted);
  const upcomingEvents = useUpcomingEvents();
  const participants = useParticipants();

  // style css cases calendrier
  const dynamicTileClassName = ({
    date,
    view,
  }: { date: Date; view: string }) => {
    // On ne veut ajouter la classe que sur la vue "mois" (pas année/décennie)
    if (view === "month") {
      const dateTileFormatted = date.toLocaleDateString("fr-CA");

      // On cherche si un événement en BDD correspond à la date de cette case
      const hasEvent = upcomingEvents.some(
        (event) => event.start_date.slice(0, 10) === dateTileFormatted,
      );

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
      <section className="events-section-agenda">
        <div className="events-big-title">
          <h1 className="events-page-title">Nos évènements</h1>
          <hr className="events-page-hr" />
        </div>
        <p className="events-text">
          Au Local, il se passe toujours quelque chose. Conférences, rencontres,
          moments conviviaux : notre programmation évolue au fil des envies et
          des initiatives de chacun. Venez découvrir, apprendre, partager ou
          simplement passer un bon moment.
        </p>
        <h2 className="events-title">Agenda</h2>
        <p className="events-text">
          Consultez notre agenda et choisissez une date pour découvrir les
          événements prévus. Planifiez votre visite à l'avance ou cherchez une
          activité de dernière minute, retrouvez facilement ce qui vous attend
          au Local.
        </p>
        <div className="events-calendar-container">
          {/* Calendrier centré qui ne s'étire plus */}
          <div className="calendar-wrapper">
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
          </div>
          {/* Structure du Carrousel avec ses contrôles */}
          <CarrousselEvents events={eventsOfTheDay} />
        </div>
      </section>
      <section className="events-section-upcoming">
        <div className="events-div-upcoming-events">
          <h2 className="events-title">Prochains évènements</h2>
          <button
            type="button"
            className="events-btn-see-all"
            onClick={() => setMaxCardsForGrid(50)}
          >
            Voir tous les évènements
          </button>
        </div>
        <p className="events-text">
          Retrouvez ici l'ensemble des événements programmés dans les prochaines
          semaines. Parcourez les différentes propositions, réservez votre place
          si nécessaire et rejoignez-nous pour partager ces moments.
        </p>
        <div className="events-grid-container">
          {upcomingEvents.slice(0, maxCardsForGrid).map((upcomingEvent) => {
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
      <FooterDashboard />
    </>
  );
}

export default Events;
