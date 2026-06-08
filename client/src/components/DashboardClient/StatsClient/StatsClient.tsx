import "./StatsClient.css";

const FAKE_STATS = {
  bookings_count: 3,
  events_count: 2,
  total_spent: 159,
};

// TODO: remplacer par un hook useStatsClient(2) après

function StatsClient() {
  const stats = FAKE_STATS;

  return (
    <>
      <div className="stats-client__card">
        <span className="stats-client__value">{stats.bookings_count}</span>
        <span className="stats-client__label">Réservations ce mois</span>
      </div>
      <div className="stats-client__card">
        <span className="stats-client__value">{stats.events_count}</span>
        <span className="stats-client__label">Événements inscrits</span>
      </div>
      <div className="stats-client__card">
        <span className="stats-client__value">{stats.total_spent} €</span>
        <span className="stats-client__label">Total dépensé (mois)</span>
      </div>
    </>
  );
}

export default StatsClient;
