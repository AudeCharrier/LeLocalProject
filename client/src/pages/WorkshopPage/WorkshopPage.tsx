import HeaderWorkshop from "../../components/WorkshopPage/HeaderWorkshop/HeaderWorkshop";
import InComingWorkshop from "../../components/WorkshopPage/InComingWorkshop/InComingWorkshop";
import WorkshopOfTheWeek from "../../components/WorkshopPage/WorkshopOfTheWeek/WorkshopOfTheWeek";
import useWorkshop from "../../hooks/useWorkshop";
import "./WorkshopPage.css";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
import RegisterWorkshopForm from "../../components/RegisterWorkshopForm/RegisterWorkshopForm";

import { useWorkshopModalContext } from "../../hooks/useWorkshopModalContext";

function WorkshopPage() {
  const workshops = useWorkshop();
  const { selectedWorkshopId } = useWorkshopModalContext();

  if (workshops.length === 0) return null;

  const selectedWorkshop = workshops.find((w) => w.id === selectedWorkshopId);

  const ateliers = workshops.filter((w) => w.space_type === "Ateliers");

  const sortedByPrice = [...ateliers].sort(
    (a, b) => b.price_unit - a.price_unit,
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

      {selectedWorkshop && <RegisterWorkshopForm workshop={selectedWorkshop} />}
    </>
  );
}

export default WorkshopPage;
