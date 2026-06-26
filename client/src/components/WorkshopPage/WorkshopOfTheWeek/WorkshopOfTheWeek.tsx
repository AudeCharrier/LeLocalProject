import "./WorkshopOfTheWeek.css";
import { useWorkshopModalContext } from "../../../hooks/useWorkshopModalContext";

import type { Space } from "../../../types/space";

interface WorkshopOfTheWeekProps {
  workshop: Space | undefined;
}

function WorkshopOfTheWeek({ workshop }: WorkshopOfTheWeekProps) {
  const { setSelectedWorkshopId } = useWorkshopModalContext();

  if (!workshop) return null;

  return (
    <section className="center-of-workshop-page">
      <div className="workshop-of-the-week">
        <h1 className="title-workshop-section">ATELIER DE LA SEMAINE</h1>

        <div className="workshop-of-the-week-card-parent">
          <div
            className="box-img-card-workshop-of-the-week"
            // style={{
            //   backgroundImage: workshop.url_image
            //     ? `url(${workshop.url_image})`
            //     : undefined,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
          >
            <span className="badge-level">TOUS NIVEAUX</span>
          </div>

          <div className="info-card-workshop-of-the-week">
            <div className="description-of-the-week-workshop">
              <span className="category-pill">{workshop.space_type}</span>
              <h1>{workshop.space_name}</h1>
              <p>{workshop.description}</p>
            </div>

            <div className="about-workshop-of-the-week">
              {/* <span>
                ⏱ {workshop.slot} – {formatHour(workshop.start_hour)} -
                {formatHour(workshop.end_hour)}(1 pause)
              </span> */}
              <span>👤 {workshop.capacity} participants max</span>
              <span>📍 {workshop.space_name}</span>
            </div>

            <div className="btn-and-price-for-workshop-of-the-week">
              <div className="btn-of-the-week">
                <button
                  type="button"
                  className="btn-reserve"
                  onClick={() => setSelectedWorkshopId(workshop.id)}
                >
                  Réserver ma place
                </button>
              </div>
              <div className="price">{workshop.price_unit}€</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkshopOfTheWeek;
