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

type AdminStats = {
  occupancy_rate: number;
  bookings_count: number;
  active_members: number;
};

// Pour regrouper nos différentes méthodes :
// calcul des statistiques d'occupation, du nombre de réservations et du nombre de membres actifs
class DashboardAdminRepository {
  async readAdminStats() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
        (                      
          SELECT ROUND(
            COUNT(DISTINCT a.space_id) * 100 / NULLIF(
              (SELECT COUNT(*) FROM space WHERE space_type != 'Evenements'),
              0
            )
          )
          FROM booking b
          JOIN activity a ON b.id_activity = a.id
          JOIN space s ON a.space_id = s.id
          WHERE s.space_type != 'Evenements'
        ) AS occupancy_rate,
        (
          SELECT COUNT(*)
          FROM booking b
          JOIN activity a ON b.id_activity = a.id
          JOIN space s ON a.space_id = s.id
          WHERE s.space_type != 'Evenements'
        ) AS bookings_count,
        (
          SELECT COUNT(*)
          FROM users
          WHERE role = 'client'
        ) AS active_members`,
    );

    return rows[0] as AdminStats;
  }

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
