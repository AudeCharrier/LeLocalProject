import { Users } from "lucide-react";
import { useMemo } from "react";
import useAdminBookings from "../../../hooks/useAdminBookings";
import useSpaces from "../../../hooks/useSpaces";
import useTimeSlot from "../../../hooks/useTimeSlot";
import "./AdminSpaces.css";

function formatDateLabel() {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatClientName(firstname: string, lastname: string) {
  return `${firstname} ${lastname.charAt(0)}.`;
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

  const slotTemplates = useMemo(
    () =>
      timeSlots.map((slot) => ({
        time: `${slot.start_hour.slice(0, 5)}–${slot.end_hour.slice(0, 5)}`,
        status: "libre",
      })),
    [timeSlots],
  );

  const groupedSpaces = useMemo(() => {
    const filteredSpaces = spaces.filter(
      (space) =>
        space.space_type === "Coworking" || space.space_type === "Ateliers",
    );

    const mappedSpaces = filteredSpaces.map((space) => {
      const relatedBookings = bookings
        .filter((booking) => booking.space_name === space.space_name)
        .slice(0, Math.max(slotTemplates.length, 1));

      const maxSlots = slotTemplates.length || 4;
      const slots =
        slotTemplates.length > 0
          ? slotTemplates.map((template) => ({ ...template }))
          : Array.from({ length: 4 }, (_, index) => ({
              time: `Créneau ${index + 1}`,
              status: "libre",
            }));

      relatedBookings.forEach((booking, index) => {
        if (!slots[index]) return;

        slots[index] = {
          time: `${booking.start_hour.slice(0, 5)}–${booking.end_hour.slice(0, 5)}`,
          status: formatClientName(booking.firstname, booking.lastname),
        };
      });

      const occupancy = Math.round((relatedBookings.length / maxSlots) * 100);

      return {
        category: space.space_category,
        name: space.space_name,
        occupancy,
        tone: getTone(occupancy),
        capacity: `${space.capacity} places`,
        summary: `${relatedBookings.length}/${maxSlots} créneaux`,
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
  }, [bookings, slotTemplates, spaces]);

  return (
    <section className="admin-spaces">
      <header className="admin-spaces__header">
        <div>
          <h2 className="admin-spaces__title">Occupation des espaces</h2>
        </div>
        <p className="admin-spaces__date">{formatDateLabel()}</p>
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
                    <li key={`${space.name}-${slot.time}`} className="admin-spaces__slot">
                      <span className="admin-spaces__time">{slot.time}</span>
                      <span
                        className={`admin-spaces__status ${slot.status === "libre" ? "admin-spaces__status--free" : ""}`}
                      >
                        {slot.status}
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
