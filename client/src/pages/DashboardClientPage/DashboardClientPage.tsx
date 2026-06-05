import BillingClient from "../../components/DashboardClient/BillingClient/BillingClient";
import OldBookingClient from "../../components/DashboardClient/OldBookingClient/OldBookingClient";
import OldEventClient from "../../components/DashboardClient/OldEventClient/OldEventClient";
import UpcomingEventClient from "../../components/DashboardClient/UpcomingEventClient/UpcomingEventClient";
import "./DashboardClientPage.css";
import UpcomingBookingClient from "../../components/DashboardClient/UpcomingBookingClient/UpcomingBookingClient";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";

export default function DashboardClientPage() {
  return (
    <section className="dashboard-client-page">
      <div className="dashboard-client-page__content">
        <div className="dashboard-client-page__stats">
          {/* ici on mettra les blocs de statistiques */}
        </div>
        <div className="dashboard-client-page__full">
          <UpcomingBookingClient />
          <OldBookingClient />
        </div>
        <UpcomingEventClient />
        <OldEventClient />
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
