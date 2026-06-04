import OldEventClient from "../../components/DashboardClient/OldEventClient/OldEventClient";
import UpcomingEventClient from "../../components/DashboardClient/UpcomingEventClient/UpcomingEventClient";
import "./DashboardClientPage.css";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
export default function DashboardClientPage() {
  return (
    <section className="dashboard-client-page">
      <div className="dashboard-client-page__content">
        <div className="dashboard-client-page__stats">
          {/* ici on mettra les blocs de statistiques */}
        </div>
        <UpcomingEventClient />
        <OldEventClient />
        <div className="dashboard-client-page__full">
          {/* la partie facturation des activités passées */}
        </div>
        <div className="dashboard-client-page__full">
          {/* Formulaire réclamation TODO */}
        </div>
      </div>
      <FooterDashboard />
    </section>
  );
}
