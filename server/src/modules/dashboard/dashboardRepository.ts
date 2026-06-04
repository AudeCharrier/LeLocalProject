import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Activity = {
  id: number;
  name: string;
  space_name: string;
  space_type: string;
  start_date: string;
  end_date: string;
  start_hour: string;
  end_hour: string;
  price_unit: number;
};

type Booking = {
  id: number;
  name: string;
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
class DashboardRepository {
  // The Rs of CRUD - Read operations

  // Sert à récupérer les évènements où l'utilisateur était inscrit
  // On utilise le filtre space_type = "Evenements"
  // et on rajoute la condition date < à aujourd'hui.

  async readPastEvents(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        a.id,
        a.name,
        s.space_name,
        s.space_type,
        a.start_date,
        a.end_date,
        t.start_hour,
        t.end_hour,
        a.price_unit
      FROM booking b
      JOIN activity a ON b.id_activity = a.id
      JOIN space s ON a.space_id = s.id
      JOIN time_slot t ON a.time_slot_id = t.id
      WHERE b.users_id = ?
      AND s.space_type = 'Evenements'
      AND a.end_date < CURDATE()
      ORDER BY a.end_date DESC
      LIMIT 3`,
      [userId],
    );
    return rows as Activity[];
  }

  // Sert à récupérer les évènements futurs où l'utilisateur est inscrit
  // On utilise le filtre space_type = "Evenements"
  // et on rajoute la condition date > à aujourd'hui.

  async readUpcomingEvents(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        a.id,
        a.name,
        s.space_name,
        s.space_type,
        a.start_date,
        a.end_date,
        t.start_hour,
        t.end_hour,
        a.price_unit
      FROM booking b
      JOIN activity a ON b.id_activity = a.id
      JOIN space s ON a.space_id = s.id
      JOIN time_slot t ON a.time_slot_id = t.id
      WHERE b.users_id = ?
      AND s.space_type = 'Evenements'
      AND a.start_date > CURDATE()
      ORDER BY a.start_date ASC
      LIMIT 3`,
      [userId],
    );
    return rows as Activity[];
  }

  async readUpcomingBookings(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        a.id,
        a.name,
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
      JOIN space s ON a.space_id = s.id
      JOIN time_slot t ON a.time_slot_id = t.id
      WHERE b.users_id = ?
      AND s.space_type != 'Evenements'
      AND a.start_date > CURDATE()
      ORDER BY a.start_date ASC`,
      [userId],
    );
    return rows as Booking[];
  }
}

export default new DashboardRepository();
