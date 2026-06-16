import {
  BarChart3,
  CalendarDays,
  Inbox,
  LayoutGrid,
  ReceiptText,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import "./DashboardAdminNav.css";

const adminNavItems = [
  {
    label: "Dashboard",
    icon: BarChart3,
    to: "/dashboard-admin",
  },
  {
    label: "Espaces",
    icon: LayoutGrid,
    to: "/dashboard-admin#admin-spaces",
  },
  {
    label: "Réservations",
    icon: ReceiptText,
    to: "/dashboard-admin#admin-bookings",
  },
  {
    label: "Réclamations",
    icon: Inbox,
    to: "/dashboard-admin#admin-claims",
  },
  {
    label: "Événements",
    icon: CalendarDays,
    to: "/dashboard-admin#admin-events",
  },
];

function DashboardAdminNav() {
  const location = useLocation();

  return (
    <nav className="dashboard-admin-nav" aria-label="Navigation dashboard admin">
      <ul className="dashboard-admin-nav__list">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === "/dashboard-admin"
              ? location.pathname === "/dashboard-admin" &&
                location.hash !== "#admin-bookings" &&
                location.hash !== "#admin-claims" &&
                location.hash !== "#admin-spaces" &&
                location.hash !== "#admin-events"
              : item.to === "/dashboard-admin#admin-bookings"
                ? location.pathname === "/dashboard-admin" &&
                  location.hash === "#admin-bookings"
                : item.to === "/dashboard-admin#admin-claims"
                  ? location.pathname === "/dashboard-admin" &&
                    location.hash === "#admin-claims"
                : item.to === "/dashboard-admin#admin-spaces"
                  ? location.pathname === "/dashboard-admin" &&
                    location.hash === "#admin-spaces"
                  : item.to === "/dashboard-admin#admin-events"
                    ? location.pathname === "/dashboard-admin" &&
                      location.hash === "#admin-events"
                  : location.pathname === item.to;

          return (
            <li key={item.label} className="dashboard-admin-nav__item">
              <Link
                className={`dashboard-admin-nav__link ${isActive ? "dashboard-admin-nav__link--active" : ""}`}
                to={item.to}
              >
                <Icon className="dashboard-admin-nav__icon" size={22} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default DashboardAdminNav;
