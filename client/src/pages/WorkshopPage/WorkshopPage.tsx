import HeaderWorkshop from "../../components/WorkshopPage/HeaderWorkshop/HeaderWorkshop";
import InComingWorkshop from "../../components/WorkshopPage/InComingWorkshop/InComingWorkshop";
import WorkshopOfTheWeek from "../../components/WorkshopPage/WorkshopOfTheWeek/WorkshopOfTheWeek";
import "./WorkshopPage.css";

function WorkshopPage() {
  return (
    <>
      <HeaderWorkshop />
      <WorkshopOfTheWeek />
      <InComingWorkshop />
    </>
  );
}

export default WorkshopPage;
