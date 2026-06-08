import BillingClient from "../../components/DashboardClient/BillingClient/BillingClient";
import PastClient from "../../components/DashboardClient/PastClient/PastClient";
import StatsClient from "../../components/DashboardClient/StatsClient/StatsClient";
import UpcomingBookingClient from "../../components/DashboardClient/UpcomingBookingClient/UpcomingBookingClient";
import UpcomingEventClient from "../../components/DashboardClient/UpcomingEventClient/UpcomingEventClient";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
import "./DashboardClientPage.css";

export default function DashboardClientPage() {
  return (
    <section className="dashboard-client-page">
      <div className="dashboard-client-page__header">
        <h1 className="dashboard-client-page__heading">Mon récap</h1>
      </div>
      <div className="dashboard-client-content">
        <div className="dashboard-client-section">
          <StatsClient />
        </div>
        <div className="dashboard-client-section">
          <div className="dashboard-client-grid">
            <UpcomingBookingClient />
            <div className="dashboard-client-past">
              <PastClient />
            </div>
            <UpcomingEventClient />
          </div>
        </div>
        <div className="dashboard-client-section">
          <BillingClient />
        </div>
        <div className="dashboard-client-section">
          {/* Formulaire réclamation TODO */}
        </div>
      </div>
      <div className="dashboard-client-footer">
        <FooterDashboard />
      </div>
    </section>
  );
}
