import HeaderWorkshop from "../../components/WorkshopPage/HeaderWorkshop/HeaderWorkshop";
import InComingWorkshop from "../../components/WorkshopPage/InComingWorkshop/InComingWorkshop";
import WorkshopOfTheWeek from "../../components/WorkshopPage/WorkshopOfTheWeek/WorkshopOfTheWeek";
import useWorkshop from "../../hooks/useWorkshop";
import "./WorkshopPage.css";

function WorkshopPage() {
  const workshops = useWorkshop();

  return (
    <>
      <HeaderWorkshop />
      <WorkshopOfTheWeek />
      {workshops.map((workshop) => (
        <InComingWorkshop key={workshop.id} workshop={workshop} />
      ))}
    </>
  );
}

export default WorkshopPage;
