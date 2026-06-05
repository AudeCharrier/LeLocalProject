import BillingClient from "../../components/DashboardClient/BillingClient/BillingClient";
import PastClient from "../../components/DashboardClient/PastClient/PastClient";
import UpcomingBookingClient from "../../components/DashboardClient/UpcomingBookingClient/UpcomingBookingClient";
import UpcomingEventClient from "../../components/DashboardClient/UpcomingEventClient/UpcomingEventClient";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
import "./DashboardClientPage.css";

export default function DashboardClientPage() {
  return (
    <section className="dashboard-client-page">
      <div className="dashboard-client-page__content">
        <div className="dashboard-client-page__stats">
          {/* ici on mettra les blocs de statistiques */}
        </div>
        <UpcomingBookingClient />
        <div className="dashboard-client-page__past">
          <PastClient />
        </div>
        <UpcomingEventClient />
        <div className="dashboard-client-page__full">
          <BillingClient />
        </div>
        <div className="dashboard-client-page__full">
          {/* Formulaire réclamation TODO */}
        </div>
      </div>
      <FooterDashboard />
    </section>
  );
}
