import "./AdminBookings.css";

const bookings = [
  {
    reference: "B001",
    member: "Sophie Laurent",
    space: "Openspace",
    date: "21/05",
    slot: "8h–10h",
    amount: "16€",
    status: "confirmed",
  },
  {
    reference: "B002",
    member: "Léa Kühn",
    space: "Studio Son",
    date: "21/05",
    slot: "10h–12h",
    amount: "50€",
    status: "confirmed",
  },
  {
    reference: "B003",
    member: "Camille Perrin",
    space: "Studio Photo",
    date: "21/05",
    slot: "9h–12h",
    amount: "105€",
    status: "confirmed",
  },
  {
    reference: "B004",
    member: "Design Sprint Co.",
    space: "Salle Réunion",
    date: "21/05",
    slot: "11h–13h",
    amount: "40€",
    status: "confirmed",
  },
  {
    reference: "B005",
    member: "Archi Students ENSA",
    space: "Atelier 3D",
    date: "21/05",
    slot: "13h–16h",
    amount: "54€",
    status: "confirmed",
  },
  {
    reference: "B006",
    member: "Formation UX",
    space: "Lab Numérique",
    date: "21/05",
    slot: "9h–11h",
    amount: "24€",
    status: "pending",
  },
];

function AdminBookings() {
  return (
    <section className="admin-bookings">
      <div className="admin-bookings__header">
        <h2 className="admin-bookings__title">Réservations du jour</h2>
        <span className="admin-bookings__action">Voir tout →</span>
      </div>

      <div className="admin-bookings__table-scroll">
        <table className="admin-bookings__table">
          <thead>
            <tr>
              <th>Réf.</th>
              <th>Membre</th>
              <th>Espace</th>
              <th>Date</th>
              <th>Créneau</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.reference}>
                <td>{booking.reference}</td>
                <td>{booking.member}</td>
                <td>{booking.space}</td>
                <td>{booking.date}</td>
                <td>{booking.slot}</td>
                <td>{booking.amount}</td>
                <td>
                  <span
                    className={`admin-bookings__status admin-bookings__status--${booking.status}`}
                  >
                    {booking.status === "confirmed" ? "Confirmé" : "En attente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminBookings;
