import "./AdminStats.css";

const stats = [
  { label: "Taux d'occupation", value: "74%", detail: "+8% vs sem. dernière" },
  { label: "Total Réservations", value: "18", detail: "+3 depuis hier" },
  { label: "Membres actifs", value: "247", detail: "+12 ce mois" },
  { label: "Réclamations", value: "2", detail: "Non traitées" },
];

function AdminStats() {
  return (
    <section className="admin-stats" aria-label="Admin dashboard statistics">
      <div className="admin-stats__grid">
        {stats.map((stat) => (
          <article key={stat.label} className="admin-stats__card">
            <p className="admin-stats__label">{stat.label}</p>
            <p className="admin-stats__value">{stat.value}</p>
            <p className="admin-stats__detail">{stat.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdminStats;
