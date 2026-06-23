import { Plus } from "lucide-react";
import HeaderWorkshop from "../../components/WorkshopPage/HeaderWorkshop/HeaderWorkshop";
import InComingWorkshop from "../../components/WorkshopPage/InComingWorkshop/InComingWorkshop";
import WorkshopOfTheWeek from "../../components/WorkshopPage/WorkshopOfTheWeek/WorkshopOfTheWeek";
import useWorkshop from "../../hooks/useWorkshop";
import "./WorkshopPage.css";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
import TeacherWorkshop from "../../components/WorkshopPage/TeacherWorkshop/TeacherWorkshop";

function WorkshopPage() {
  const workshops = useWorkshop();

  return (
    <>
      <HeaderWorkshop />
      <WorkshopOfTheWeek />
      <div className="workshop-grid">
        {workshops.map((workshop) => (
          <InComingWorkshop key={workshop.id} workshop={workshop} />
        ))}
        <div className="workshop-grid__suggest">
          <Plus className="workshop-grid__suggest-icon" />
          <h2 className="workshop-grid__suggest-title">Proposer un atelier</h2>
          <p className="workshop-grid__suggest-text">
            Vous avez un savoir-faire à partager ?
          </p>
          <button type="button" className="workshop-grid__suggest-btn">
            Candidater
          </button>
        </div>
      </div>
      <TeacherWorkshop />
      <FooterDashboard />
    </>
  );
}

export default WorkshopPage;
