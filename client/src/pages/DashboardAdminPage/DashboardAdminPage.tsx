import { useLocation } from "react-router";
import AdminBookings from "../../components/DashboardAdmin/AdminBookings/AdminBookings";
import AdminEvents from "../../components/DashboardAdmin/AdminEvents/AdminEvents";
import DashboardAdminNav from "../../components/DashboardAdmin/DashboardAdminNav/DashboardAdminNav";
import AdminClaims from "../../components/DashboardAdmin/AdminClaims/AdminClaims";
import AdminOverview from "../../components/DashboardAdmin/AdminOverview/AdminOverview";
import AdminReservations from "../../components/DashboardAdmin/AdminReservations/AdminReservations";
import AdminSpaces from "../../components/DashboardAdmin/AdminSpaces/AdminSpaces";
import AdminStats from "../../components/DashboardAdmin/AdminStats/AdminStats";
import "./DashboardAdminPage.css";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
function DashboardAdminPage() {
  const location = useLocation();
  const isSpacesTab = location.hash === "#admin-spaces";
  const isBookingsTab = location.hash === "#admin-bookings";
  const isClaimsTab = location.hash === "#admin-claims";
  const isEventsTab = location.hash === "#admin-events";

  return (
    <section className="dashboard-admin-page">
      <div className="dashboard-admin-page__header">
        <h1 className="dashboard-admin-page__heading">Tableau de bord</h1>
      </div>
      <DashboardAdminNav />
      <div className="dashboard-admin-content">
        {isSpacesTab ? (
          <div className="dashboard-admin-section" id="admin-spaces">
            <AdminSpaces />
          </div>
        ) : isBookingsTab ? (
          <div className="dashboard-admin-section" id="admin-bookings">
            <AdminReservations />
          </div>
        ) : isClaimsTab ? (
          <div className="dashboard-admin-section" id="admin-claims">
            <AdminClaims />
          </div>
        ) : isEventsTab ? (
          <div className="dashboard-admin-section" id="admin-events">
            <AdminEvents />
          </div>
        ) : (
          <>
            <div className="dashboard-admin-section" id="admin-dashboard">
              <AdminStats />
            </div>
            <div className="dashboard-admin-section">
              <AdminOverview />
            </div>
            <div className="dashboard-admin-section" id="admin-bookings">
              <AdminBookings previewLimit={4} />
            </div>
          </>
        )}
      </div>
      <div className="dashboard-admin-footer">
        <FooterDashboard />
      </div>
    </section>
  );
}

export default DashboardAdminPage;
