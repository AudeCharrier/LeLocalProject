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
    <div className="Parent-Container-In-Coming-Workshop">
      <div className="Box-Img-In-Coming-Workshop">
        {/* top — image en background */}
        <div
          className="Box-Img-Top"
          style={{
            backgroundImage: workshop.url_image
              ? `url(${workshop.url_image})`
              : undefined,
          }}
        >
          <div className="Box-Img-Top-Row">
            <span className="Badge-In-Coming-Workshop-Level">DÉBUTANT</span>
            <span className="Badge-In-Coming-Workshop-Places">
              {workshop.capacity} places libres
            </span>
          </div>
          <div className="Badge-In-Coming-Workshop-Date">
            <span className="Badge-In-Coming-Workshop-Date-Day">{day}</span>
            <span className="Badge-In-Coming-Workshop-Date-Month">{month}</span>
          </div>
        </div>

        {/* bas crème */}
        <div className="Description-In-Coming-Workshop">
          <span className="Category-Pill">NUMÉRIQUE</span>
          <h1>{workshop.name}</h1>
          <p>{workshop.description}</p>
        </div>

        <div className="Teacher-For-The-Workshop-Of-The-Week">
          <div className="Teacher-Avatar">TC</div>
          <div className="Teacher-Info">
            <span className="Name-Of-The-Teacher-Of-The-Week">Thomas C.</span>
            <span className="Price">{workshop.price_unit}€</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InComingWorkshop;
