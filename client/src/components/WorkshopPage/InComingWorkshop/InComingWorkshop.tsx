import "./InComingWorkshop.css";
import useAvailability from "../../../hooks/useAvailability";
import type { Activity } from "../../../types/activity";

interface WorkshopProps {
  workshop: Activity;
}

function formatDate(isoDate: string) {
  const d = new Date(isoDate);
  return {
    day: d.getDate().toString(),
    month: d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase(),
  };
}

function InComingWorkshop({ workshop }: WorkshopProps) {
  const { day, month } = formatDate(workshop.start_date);

  const availability = useAvailability(
    workshop.space_id,
    workshop.start_date.slice(0, 10),
    workshop.time_slot_id?.toString(),
  );

  return (
    <div className="incoming-workshop">
      <div className="incoming-workshop__inner">
        <div
          className="incoming-workshop__top"
          style={{
            backgroundImage: workshop.url_image
              ? `url(${workshop.url_image})`
              : undefined,
          }}
        >
          <div className="incoming-workshop__top-row">
            <span className="incoming-workshop__badge-level">DÉBUTANT</span>
            <span className="incoming-workshop__badge-places">
              {availability
                ? `${availability.available} places libres`
                : `${workshop.capacity} places`}
            </span>
          </div>
          <div className="incoming-workshop__badge-date">
            <span className="incoming-workshop__date-day">{day}</span>
            <span className="incoming-workshop__date-month">{month}</span>
          </div>
        </div>

        <div className="incoming-workshop__description">
          <span className="incoming-workshop__category">
            {workshop.space_type}
          </span>
          <h2>{workshop.name}</h2>
          <p>{workshop.description}</p>
        </div>

        <div className="incoming-workshop__footer">
          <div className="incoming-workshop__avatar">TC</div>
          <div className="incoming-workshop__teacher-info">
            <span className="incoming-workshop__teacher-name">Thomas C.</span>
            <span className="incoming-workshop__price">
              {workshop.price_unit}€
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InComingWorkshop;
