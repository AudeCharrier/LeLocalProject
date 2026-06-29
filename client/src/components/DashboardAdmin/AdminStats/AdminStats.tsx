import "./AdminStats.css";
import useAdminStats from "../../../hooks/useAdminStats";

type AdminStatsProps = {
  selectedDate: string;
};

function AdminStats({ selectedDate }: AdminStatsProps) {
  const { occupancy_rate, bookings_count, active_members, claims_count } =
    useAdminStats(selectedDate);

  return (
    <section className="admin-stats" aria-label="Admin dashboard statistics">
      <div className="admin-stats__grid">
        <article className="admin-stats__card">
          <p className="admin-stats__label">Taux d&apos;occupation</p>
          <p className="admin-stats__value">{occupancy_rate}%</p>
          <p className="admin-stats__detail">Jour sélectionné</p>
        </article>

        <article className="admin-stats__card">
          <p className="admin-stats__label">Total Réservations</p>
          <p className="admin-stats__value">{bookings_count}</p>
          <p className="admin-stats__detail">Jour sélectionné</p>
        </article>

        <article className="admin-stats__card">
          <p className="admin-stats__label">Membres actifs</p>
          <p className="admin-stats__value">{active_members}</p>
          <p className="admin-stats__detail">Jour sélectionné</p>
        </article>

        <article className="admin-stats__card">
          <p className="admin-stats__label">Réclamations</p>
          <p className="admin-stats__value">{claims_count}</p>
          <p className="admin-stats__detail">Jour sélectionné</p>
        </article>
      </div>
    </section>
  );
}

export default AdminStats;
