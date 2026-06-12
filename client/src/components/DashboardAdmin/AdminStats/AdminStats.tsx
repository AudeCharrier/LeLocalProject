import "./AdminStats.css";
import useAdminStats from "../../../hooks/useAdminStats";

function AdminStats() {
  const { occupancy_rate, bookings_count, active_members, claims_count } =
    useAdminStats();

  return (
    <section className="admin-stats" aria-label="Admin dashboard statistics">
      <div className="admin-stats__grid">
        <article className="admin-stats__card">
          <p className="admin-stats__label">Taux d&apos;occupation</p>
          <p className="admin-stats__value">{occupancy_rate}%</p>
          <p className="admin-stats__detail">Espaces réservés</p>
        </article>

        <article className="admin-stats__card">
          <p className="admin-stats__label">Total Réservations</p>
          <p className="admin-stats__value">{bookings_count}</p>
          <p className="admin-stats__detail">Toutes périodes</p>
        </article>

        <article className="admin-stats__card">
          <p className="admin-stats__label">Membres actifs</p>
          <p className="admin-stats__value">{active_members}</p>
          <p className="admin-stats__detail">Rôle client</p>
        </article>

        <article className="admin-stats__card">
          <p className="admin-stats__label">Réclamations</p>
          <p className="admin-stats__value">{claims_count}</p>
          <p className="admin-stats__detail">Total déclarées</p>
        </article>
      </div>
    </section>
  );
}

export default AdminStats;
