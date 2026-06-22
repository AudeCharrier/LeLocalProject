import { useState } from "react";
import { useRef } from "react";
import Calendar from "react-calendar";
import CardEvent from "../../components/Event/CardEvent";
import FirstArticle from "../../components/SpacesPage/Header/FirstArticle/FirstArticle";
import { ModalEventProvider } from "../../context/CloseEventModalContext";
import useSumParticipants from "../../hooks/useSumParticipants";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";
import "./Events.css";
import "react-calendar/dist/Calendar.css";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
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
  const maxCards = 6;
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

  // Carrousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [_activeIndex, setActiveIndex] = useState(0);

  // Gestion du scroll au clic sur les flèches
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;

      // On utilise 0.58 pour correspondre aux 55% de la carte + le gap
      const cardWidth = clientWidth * 0.58;

      const scrollTo =
        direction === "left" ? scrollLeft - cardWidth : scrollLeft + cardWidth;

      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  // Surveiller le scroll pour activer/désactiver les flèches ET mettre à jour les dots
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      // 1. Gestion des flèches
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

      // 2. Gestion des dots (calcul basé sur la taille d'une carte)
      const cardWidth = clientWidth * 0.58;
      const newIndex = Math.round(scrollLeft / cardWidth);

      // Sécurité pour rester dans les bornes du tableau
      if (newIndex >= 0 && newIndex < selectedEvents.length) {
        setActiveIndex(newIndex);
      }
    }
  };
  return (
    <>
      <section className="events-section-hero">
        <FirstArticle pageData={EventFirstArticle} />
      </section>
      <section className="events-section-ALAUNE">
        <div className="events-big-title">
          <h2 className="events-page-title">Nos évènements</h2>
          <hr className="events-page-hr" />
        </div>
        <h2 className="events-title">A la une</h2>
        <div>faire composant event le plus proche</div>
      </section>
      <section className="events-section-AGENDA">
        <h2 className="events-title">Agenda</h2>
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
          <div className="carousel-container">
            {/* Flèche Gauche */}
            <button
              type="button"
              className={`carousel-arrow left ${!canScrollLeft ? "disabled" : ""}`}
              onClick={() => scroll("left")}
              aria-label="Précédent"
            >
              ‹
            </button>

            {/* Fenêtre visible du carrousel */}
            <div
              className="events-div-selected-events"
              ref={carouselRef}
              onScroll={handleScroll}
            >
              <div className="home-events">
                {selectedEvents.map((selectedEvent) => {
                  const eventParticipants = participants.find(
                    (p) => p.id_activity === selectedEvent.id,
                  );
                  return (
                    <div className="carousel-item" key={selectedEvent.id}>
                      <ModalEventProvider key={selectedEvent.id}>
                        <CardEvent
                          event={selectedEvent}
                          participants={eventParticipants}
                        />
                      </ModalEventProvider>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Flèche Droite */}
            <button
              type="button"
              className={`carousel-arrow right ${!canScrollRight ? "disabled" : ""}`}
              onClick={() => scroll("right")}
              aria-label="Suivant"
            >
              ›
            </button>
          </div>

          {/* Les Dots sous le bloc carrousel */}
          {/* {selectedEvents.length > 1 && (
            <div className="carousel-dots">
              {selectedEvents.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
                  onClick={() => {
                    if (carouselRef.current) {
                      const cardWidth = carouselRef.current.clientWidth * 0.58;
                      carouselRef.current.scrollTo({
                        left: index * cardWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  aria-label={`Aller à la diapositive évènement ${index + 1}`}
                />
              ))}
            </div>
          )} */}
        </div>
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
        <div className="home-events-grid-container">
          {upcomingEvents.slice(0, maxCards).map((upcomingEvent) => {
            const eventParticipants = participants.find(
              (p) => p.id_activity === upcomingEvent.id,
            );
            return (
              <ModalEventProvider key={upcomingEvent.id}>
                <CardEvent
                  /*  key={upcomingEvent.id} */
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

/*code repris de EventSection -> voir pour refacto, faire un composant */
