import "./AdminBookings.css";
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

function AdminBookings() {
  const bookings = useAdminBookings();

  return (
    <section className="admin-bookings">
      <div className="admin-bookings__header">
        <h2 className="admin-bookings__title">Réservations</h2>
        <span className="admin-bookings__action">Voir tout →</span>
      </div>

      {bookings.length === 0 ? (
        <p className="admin-bookings__action">Aucune réservation trouvée.</p>
      ) : (
        <div className="admin-bookings__table-scroll">
          <table className="admin-bookings__table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Client</th>
                <th>Description</th>
                <th>Espaces</th>
                <th>Date</th>
                <th>Horaire</th>
                <th>Montant</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{formatReference(booking.id)}</td>
                  <td>
                    {formatClientName(booking.firstname, booking.lastname)}
                  </td>
                  <td>{booking.name}</td>
                  <td>{booking.space_name}</td>
                  <td>{formatDate(booking.start_date)}</td>
                  <td>
                    {booking.start_hour.slice(0, 5)}–
                    {booking.end_hour.slice(0, 5)}
                  </td>
                  <td>{booking.total_price}€</td>
                  <td>{booking.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminBookings;
