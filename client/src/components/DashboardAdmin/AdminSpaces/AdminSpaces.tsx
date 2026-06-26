import { Users } from "lucide-react";
import { useMemo, useState } from "react";
import useAdminBookings from "../../../hooks/useAdminBookings";
import useSpaces from "../../../hooks/useSpaces";
import useTimeSlot from "../../../hooks/useTimeSlot";
import "./AdminSpaces.css";

function getTodayValue() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateLabel(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getTone(occupancy: number) {
  if (occupancy >= 75) return "success";
  if (occupancy >= 40) return "danger";
  return "neutral";
}

function AdminSpaces() {
  const spaces = useSpaces();
  const bookings = useAdminBookings();
  const timeSlots = useTimeSlot();
  const [selectedDate, setSelectedDate] = useState(getTodayValue());

  const groupedSpaces = useMemo(() => {
    const slotTemplates = timeSlots.map((slot) => ({
      key: `${slot.start_hour}-${slot.end_hour}`,
      time: `${slot.start_hour.slice(0, 5)}–${slot.end_hour.slice(0, 5)}`,
      reserved: 0,
    }));

    const filteredSpaces = spaces.filter(
      (space) =>
        space.space_type === "Coworking" || space.space_type === "Ateliers",
    );

    const selectedBookings = bookings.filter(
      (booking) => booking.start_date.slice(0, 10) === selectedDate,
    );

    const mappedSpaces = filteredSpaces.map((space) => {
      const slots = slotTemplates.map((slot) => {
        const reservedPlaces = selectedBookings
          .filter(
            (booking) =>
              booking.space_name === space.space_name &&
              `${booking.start_hour}-${booking.end_hour}` === slot.key,
          )
          .reduce((total, booking) => total + booking.quantity, 0);

        const remainingPlaces = Math.max(space.capacity - reservedPlaces, 0);

        return {
          time: slot.time,
          reservedPlaces,
          remainingPlaces,
          label: `${remainingPlaces} place${remainingPlaces > 1 ? "s" : ""} restante${remainingPlaces > 1 ? "s" : ""} sur ${space.capacity}`,
        };
      });

      const occupiedSlots = slots.filter(
        (slot) => slot.reservedPlaces > 0,
      ).length;
      const totalSlots = Math.max(slots.length, 1);
      const occupancy = Math.round((occupiedSlots / totalSlots) * 100);

      return {
        category: space.space_category,
        name: space.space_name,
        occupancy,
        tone: getTone(occupancy),
        capacity: `${space.capacity} places`,
        summary: `${occupiedSlots}/${totalSlots} créneaux occupés`,
        slots,
        space_type: space.space_type,
      };
    });

    return [
      {
        title: "Espaces",
        items: mappedSpaces.filter((space) => space.space_type === "Coworking"),
      },
      {
        title: "Ateliers",
        items: mappedSpaces.filter((space) => space.space_type === "Ateliers"),
      },
    ];
  }, [bookings, selectedDate, spaces, timeSlots]);

  return (
    <section className="admin-spaces">
      <header className="admin-spaces__header">
        <div>
          <h2 className="admin-spaces__title">Occupation des espaces</h2>
        </div>

        <div className="admin-spaces__filters">
          <label className="admin-spaces__filter" htmlFor="admin-spaces-date">
            <span className="admin-spaces__filter-label">Jour</span>
            <input
              id="admin-spaces-date"
              className="admin-spaces__filter-input"
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </label>
          <p className="admin-spaces__date">{formatDateLabel(selectedDate)}</p>
        </div>
      </header>

      {groupedSpaces.map((group) => (
        <section key={group.title} className="admin-spaces__group">
          <h3 className="admin-spaces__group-title">{group.title}</h3>

          <div className="admin-spaces__grid">
            {group.items.map((space) => (
              <article
                key={space.name}
                className={`admin-spaces__card admin-spaces__card--${space.tone}`}
              >
                <div className="admin-spaces__card-header">
                  <div>
                    <p className="admin-spaces__category">{space.category}</p>
                    <h4 className="admin-spaces__name">{space.name}</h4>
                  </div>
                  <p className="admin-spaces__occupancy">{space.occupancy}%</p>
                </div>

                <div className="admin-spaces__progress">
                  <div
                    className="admin-spaces__progress-bar"
                    style={{ width: `${space.occupancy}%` }}
                  />
                </div>

                <ul className="admin-spaces__slots">
                  {space.slots.map((slot) => (
                    <li
                      key={`${space.name}-${slot.time}`}
                      className="admin-spaces__slot"
                    >
                      <span className="admin-spaces__time">{slot.time}</span>
                      <span
                        className={`admin-spaces__status ${slot.remainingPlaces > 0 ? "admin-spaces__status--free" : ""}`}
                      >
                        {slot.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <footer className="admin-spaces__footer">
                  <p className="admin-spaces__meta">
                    <Users size={14} />
                    <span>{space.capacity}</span>
                  </p>
                  <p className="admin-spaces__meta">{space.summary}</p>
                </footer>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

export default AdminSpaces;
