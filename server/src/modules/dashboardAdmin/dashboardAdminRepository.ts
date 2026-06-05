import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Booking = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  space_name: string;
  space_type: string;
  start_date: string;
  end_date: string;
  start_hour: string;
  end_hour: string;
  total_price: number;
  quantity: number;
};

// Pour regrouper nos différentes méthodes :
class DashboardAdminRepository {
  async readAdminBookings() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        b.id,
        a.name,
        u.firstname,
        u.lastname,
        s.space_name,
        s.space_type,
        a.start_date,
        a.end_date,
        t.start_hour,
        t.end_hour,
        b.total_price,
        b.quantity
      FROM booking b
      JOIN activity a ON b.id_activity = a.id
      JOIN users u ON b.users_id = u.id
      JOIN space s ON a.space_id = s.id
      JOIN time_slot t ON a.time_slot_id = t.id
      ORDER BY a.start_date ASC, t.start_hour ASC`,
    );
    return rows as Booking[];
  }
}
export default new DashboardAdminRepository();
