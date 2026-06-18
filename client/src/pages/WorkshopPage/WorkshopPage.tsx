import { Plus } from "lucide-react";
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

        <div className="Parent-Card-Workshop-Suggestion-Container">
          <Plus className="Add-Logo-Workshop-Suggestion" />
          <h1 className="Workshop-Suggestion">Proposer un atelier</h1>
          <p className="Workshop-Suggestion-Sentence">
            Vous avez un savoir-faire à partager ?
          </p>
          <button type="button" className="Workshop-Suggestion-btn">
            Candidater
          </button>
        </div>
      </div>
    </>
  );
}

export default WorkshopPage;
