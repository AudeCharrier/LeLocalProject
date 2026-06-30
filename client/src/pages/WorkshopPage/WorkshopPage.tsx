import HeaderWorkshop from "../../components/WorkshopPage/HeaderWorkshop/HeaderWorkshop";
import InComingWorkshop from "../../components/WorkshopPage/InComingWorkshop/InComingWorkshop";
import WorkshopOfTheWeek from "../../components/WorkshopPage/WorkshopOfTheWeek/WorkshopOfTheWeek";
import useWorkshop from "../../hooks/useWorkshop";
import "./WorkshopPage.css";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";

function WorkshopPage() {
  const workshops = useWorkshop();

  if (workshops.length === 0) return null;

  const sortedByPrice = [...workshops].sort(
    (a, b) => Number(b.price_unit) - Number(a.price_unit),
  );
  const featuredSpace = sortedByPrice[0];
  const remainingSpace = sortedByPrice.slice(1);

  return (
    <>
      <HeaderWorkshop />
      <WorkshopOfTheWeek workshop={featuredSpace} />
      <div className="workshop-grid">
        {remainingSpace.map((space) => (
          <InComingWorkshop key={space.id} workshop={space} />
        ))}
      </div>

      <FooterDashboard />
    </>
  );
}

export default WorkshopPage;
