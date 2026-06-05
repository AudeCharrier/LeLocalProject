import AdminBookings from "../../components/DashboardAdmin/AdminBookings/AdminBookings";
import AdminOverview from "../../components/DashboardAdmin/AdminOverview/AdminOverview";
import AdminStats from "../../components/DashboardAdmin/AdminStats/AdminStats";
import "./DashboardAdminPage.css";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
function DashboardAdminPage() {
  return (
    <section className="dashboard-admin-page">
      <div className="dashboard-admin-content">
        <div className="dashboard-admin-section">
          <AdminStats />
        </div>
        <div className="dashboard-admin-section">
          <AdminOverview />
        </div>
        <div className="dashboard-admin-section">
          <AdminBookings />
        </div>
      </div>
      <div className="dashboard-admin-footer">
        <FooterDashboard />
      </div>
    </section>
  );
}

export default DashboardAdminPage;
