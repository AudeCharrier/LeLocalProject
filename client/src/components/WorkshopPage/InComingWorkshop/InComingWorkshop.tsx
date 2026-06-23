import "./InComingWorkshop.css";

interface WorkshopProps {
  workshop: {
    id: number;
    name: string;
    description: string;
    space_name: string;
    url_image: string;
    price_unit: number;
    start_date: string;
    start_hour: string;
    end_hour: string;
    capacity: number;
  };
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
              {workshop.capacity} places libres
            </span>
          </div>
          <div className="incoming-workshop__badge-date">
            <span className="incoming-workshop__date-day">{day}</span>
            <span className="incoming-workshop__date-month">{month}</span>
          </div>
        </div>

        <div className="incoming-workshop__description">
          <span className="incoming-workshop__category">NUMÉRIQUE</span>
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
