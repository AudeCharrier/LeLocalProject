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
function InComingWorkshop({ workshop }: WorkshopProps) {
  return (
    <div className="Parent-Container-In-Coming-Workshop">
      <h3 className="Title-Workshop-Section">PROCHAINS ATELIERS</h3>
      <div className="Box-Img-In-Coming-Workshop">
        {/* top vert */}
        <div className="Box-Img-Top">
          <div className="Box-Img-Top-Row">
            <img
              src={workshop.url_image}
              alt={workshop.name}
              className="imgWorkshopCard"
            />
            <span className="Badge-In-Coming-Workshop-Level">DÉBUTANT</span>
            <span className="Badge-In-Coming-Workshop-Places">
              {workshop.capacity}
            </span>
          </div>
          <div className="Badge-In-Coming-Workshop-Date">
            <span className="Badge-In-Coming-Workshop-Date-Day">
              {workshop.start_date}
              <span className="Badge-In-Coming-Workshop-Date-Month">JUIN</span>
            </span>
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
