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

type BookingHistory = {
  id: number;
  bills_number: number;
  quantity: number;
  total_price: number;
  name: string;
  start_date: string;
  space_name: string;
};

// Pour regrouper nos différentes méthodes :
class DashboardClientRepository {
  // The Rs of CRUD - Read operations

  // Retrieve past events the user attended
  // Filter on space_type = "Evenements" and end_date < today
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
      LIMIT 6`,
      [userId],
    );
    return rows as Activity[];
  }

  // Retrieve upcoming events the user is registered for
  // Filter on space_type = "Evenements" and start_date > today
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
      LIMIT 6`,
      [userId],
    );
    return rows as Activity[];
  }

  // Retrieve upcoming space bookings for a specific user
  // Filter on space_type != "Evenements" and start_date > today
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

  async readBookingHistory(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
        b.id,
        b.bills_number,
        b.quantity,
        b.total_price,
        a.name,
        a.start_date,
        s.space_name
      FROM booking b
      JOIN activity a ON b.id_activity = a.id
      JOIN space s ON a.space_id = s.id
      WHERE b.users_id = ?
      ORDER BY a.start_date DESC`,
      [userId],
    );
    return rows as BookingHistory[];
  }
  async readOldBookings(userId: number) {
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
      AND a.end_date < CURDATE()
      ORDER BY a.start_date DESC`,
      [userId],
    );
    return rows as Booking[];
  }
}

export default new DashboardClientRepository();
