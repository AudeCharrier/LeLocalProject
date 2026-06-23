import { useState } from "react";
import { useRef } from "react";
import Calendar from "react-calendar";
import CardEvent from "../../components/Event/CardEvent";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
import FirstArticle from "../../components/SpacesPage/Header/FirstArticle/FirstArticle";
import { ModalEventProvider } from "../../context/CloseEventModalContext";
import useSumParticipants from "../../hooks/useSumParticipants";
import useUpcomingEvents from "../../hooks/useUpcomingEvents";
import type { FirstArticleProps } from "../../types/firstarticleprops";
import "./Events.css";
import "react-calendar/dist/Calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const upcomingEvents = useUpcomingEvents();
  const participants = useSumParticipants();
  const maxCards = 6;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const chooseDate = (date: Date) => {
    // le calendrier affiche la case sélectionnée (style css)
    setSelectedDate(date);
  };

  //METTRE CA EN BACK END
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
  const [activeIndex, setActiveIndex] = useState(0);
  const isClickingDot = useRef(false);

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

      // 1. Gestion des flèches (toujours active)
      const isAtLeft = scrollLeft <= 10;
      const isAtRight = scrollLeft + clientWidth >= scrollWidth - 10;
      setCanScrollLeft(!isAtLeft);
      setCanScrollRight(!isAtRight);

      // 2. Gestion des dots : Bloquée si on a cliqué sur un dot !
      if (isClickingDot.current) return;

      // Sinon, mode normal (flèches ou scroll manuel au doigt)
      const cardWidth = clientWidth * 0.58;
      let newIndex = Math.round(scrollLeft / cardWidth);

      if (isAtRight) {
        newIndex = selectedEvents.length - 1;
      } else if (isAtLeft) {
        newIndex = 0;
      }

      if (
        newIndex >= 0 &&
        newIndex < selectedEvents.length &&
        newIndex !== activeIndex
      ) {
        setActiveIndex(newIndex);
      }
    }
  };
  const goToSlide = (index: number) => {
    if (carouselRef.current) {
      isClickingDot.current = true; // 1. On bloque handleScroll
      setActiveIndex(index); // 2. Le dot passe au rouge DIRECTEMENT

      const cardWidth = carouselRef.current.clientWidth * 0.58;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });

      // 3. On attend la fin de l'animation smooth (approx. 400ms) pour libérer le verrou
      setTimeout(() => {
        isClickingDot.current = false;
      }, 400);
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
              aria-label="Evènement précédent"
            >
              <ChevronLeft size={20} />
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
              aria-label="Evènement Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Les Dots sous le bloc carrousel */}
          {selectedEvents.length > 1 && (
            <div className="carousel-dots">
              {selectedEvents.map((selectedEvent, index) => (
                <button
                  key={
                    selectedEvent.id
                  } /* Biome va adorer : clé unique et stable */
                  type="button"
                  className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
                  onClick={() => goToSlide(index)} /* Propre et lisible */
                  aria-label={`Aller à la diapositive évènement ${index + 1}`}
                />
              ))}
            </div>
          )}
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
