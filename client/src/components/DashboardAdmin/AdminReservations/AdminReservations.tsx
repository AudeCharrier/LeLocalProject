import "./AdminReservations.css";
import useAdminBookings from "../../../hooks/useAdminBookings";

function formatReference(id: number) {
  return `B${String(id).padStart(3, "0")}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function formatClientName(firstname: string, lastname: string) {
  return `${firstname} ${lastname}`;
}

function getBookingStatus(index: number) {
  return index === 5 ? "pending" : "confirmed";
}

function AdminReservations() {
  const bookings = useAdminBookings();

  return (
    <section className="admin-reservations">
      <header className="admin-reservations__header">
        <h2 className="admin-reservations__title">Toutes les réservations</h2>
      </header>

      {bookings.length === 0 ? (
        <p className="admin-reservations__empty">Aucune réservation trouvée.</p>
      ) : (
        <div className="admin-reservations__table-scroll">
          <table className="admin-reservations__table">
            <thead>
              <tr>
                <th>Réf.</th>
                <th>Membre</th>
                <th>Espace</th>
                <th>Date</th>
                <th>Créneaux</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => {
                const status = getBookingStatus(index);

                return (
                  <tr key={booking.id}>
                    <td>{formatReference(booking.id)}</td>
                    <td>
                      {formatClientName(booking.firstname, booking.lastname)}
                    </td>
                    <td>{booking.space_name}</td>
                    <td>{formatDate(booking.start_date)}</td>
                    <td>
                      {booking.start_hour.slice(0, 5)}–
                      {booking.end_hour.slice(0, 5)}
                    </td>
                    <td>{booking.total_price}€</td>
                    <td>
                      <span
                        className={`admin-reservations__status admin-reservations__status--${status}`}
                      >
                        {status === "confirmed" ? "Confirmé" : "En attente"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminReservations;
