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
      <div className="Workshop-Grid-Section">
        {workshops.map((workshop) => (
          <InComingWorkshop key={workshop.id} workshop={workshop} />
        ))}
        <div className="Workshop-Grid-Card-Propose">
          <h3>Proposer un atelier</h3>
          <p>Vous avez un savoir-faire à partager ?</p>
          <button type="button">Candidater</button>
        </div>
      </div>
    </>
  );
}

export default WorkshopPage;
