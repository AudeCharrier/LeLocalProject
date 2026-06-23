import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./AdminOverview.css";
import useAdminNotifications from "../../../hooks/useAdminNotifications";

const chartMargin = { top: 12, right: 8, left: -24, bottom: 0 };

const chartTickStyle = {
  fill: "var(--color-text-muted)",
  fontFamily: "var(--font-ui)",
  fontSize: 12,
};

const tooltipContentStyle = {
  border: "1px solid var(--color-border-card)",
  borderRadius: "8px",
  background: "var(--color-bg-white)",
  fontFamily: "var(--font-body)",
};

const tooltipLabelStyle = {
  color: "var(--color-text-primary)",
};

const chartDotStyle = {
  r: 5,
  fill: "var(--color-bg-white)",
  stroke: "var(--color-primary)",
  strokeWidth: 3,
};

const occupancyData = [
  { day: "Lun", rate: 58 },
  { day: "Mar", rate: 64 },
  { day: "Mer", rate: 60 },
  { day: "Jeu", rate: 72 },
  { day: "Ven", rate: 74 },
];

function AdminOverview() {
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const notifications = useAdminNotifications();
  const warningCount = notifications.length;

  const visibleNotifications = showAllNotifications
    ? notifications
    : notifications.slice(0, 4);

  return (
    <section className="admin-overview">
      <article className="admin-overview__panel admin-overview__panel--chart">
        <header className="admin-overview__panel-header">
          <h2 className="admin-overview__title">Taux d&apos;occupation</h2>
        </header>

        <div className="admin-overview__chart-card">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={occupancyData} margin={chartMargin}>
              <CartesianGrid
                stroke="rgba(98, 13, 20, 0.14)"
                strokeDasharray="4 4"
                vertical={false}
              />
              <XAxis
                axisLine={false}
                dataKey="day"
                tickLine={false}
                tickMargin={12}
                tick={chartTickStyle}
              />
              <YAxis
                axisLine={false}
                domain={[40, 80]}
                tickLine={false}
                tickMargin={12}
                tick={chartTickStyle}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={tooltipContentStyle}
                formatter={(value) => [`${value ?? ""}%`, "Occupation"]}
                labelStyle={tooltipLabelStyle}
              />
              <Line
                dataKey="rate"
                dot={chartDotStyle}
                stroke="var(--color-primary)"
                strokeWidth={3}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="admin-overview__panel admin-overview__panel--notifications">
        <header className="admin-overview__panel-header">
          <h2 className="admin-overview__title">Notifications</h2>
          <div className="admin-overview__header-actions">
            <span
              className="admin-overview__badge"
              aria-label={`${warningCount} alertes`}
            >
              {warningCount} alertes
            </span>
            <button
              className="admin-overview__button"
              onClick={() => setShowAllNotifications((current) => !current)}
              type="button"
            >
              {showAllNotifications ? "Réduire" : "Voir tout"}
            </button>
          </div>
        </header>

        <ul className="admin-overview__notification-list">
          {visibleNotifications.map((notification) => (
            <li
              key={notification.id}
              className={`admin-overview__notification admin-overview__notification--${notification.variant}`}
            >
              <div className="admin-overview__notification-marker" />
              <div className="admin-overview__notification-content">
                <p className="admin-overview__notification-title">
                  {notification.title}
                </p>
                <p className="admin-overview__notification-detail">
                  {notification.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default AdminOverview;
