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
  claims_count: number;
};

type AdminClaimNotification = {
  id: number;
  title: string;
  detail: string;
  variant: "warning";
};

type Claim = {
  id: number;
  title: string;
  category: string;
  message: string;
  claim_date: string;
  firstname: string;
  lastname: string;
};

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
        ) AS active_members,
        (
          SELECT COUNT(*)
          FROM claim
        ) AS claims_count`,
    );
    return rows[0] as AdminStats;
  }

  async readAdminClaimNotifications() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
        c.id,
        CONCAT('Réclamation: ', c.title) AS title,
        CONCAT(c.category, ' • ', c.claim_date) AS detail,
        'warning' AS variant
      FROM claim c
      ORDER BY c.id DESC`,
    );
    return rows as AdminClaimNotification[];
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

  async readAllClaims() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
        c.id,
        c.title,
        c.category,
        c.message,
        c.claim_date,
        u.firstname,
        u.lastname
      FROM claim c
      JOIN users u ON c.users_id = u.id
      ORDER BY c.claim_date DESC`,
    );
    return rows as Claim[];
  }

  async readAllEventRequests() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
        a.id,
        a.name,
        a.description,
        a.start_date,
        a.end_date,
        a.status,
        s.space_name,
        t.start_hour,
        t.end_hour,
        u.firstname,
        u.lastname
      FROM activity a
      JOIN space s ON a.space_id = s.id
      JOIN time_slot t ON a.time_slot_id = t.id
      JOIN users u ON a.users_id = u.id
      WHERE s.space_type = 'Evenements'
      AND a.status IN ('pending', 'refused')
      ORDER BY a.start_date DESC`,
    );
    return rows;
  }

  async updateEventRequestStatus(
    activityId: number,
    status: "approved" | "refused",
  ) {
    await databaseClient.query("UPDATE activity SET status = ? WHERE id = ?", [
      status,
      activityId,
    ]);
  }

  async createBookingForRequest(activityId: number, userId: number) {
    const year = new Date().getFullYear();

    const [priceRows] = await databaseClient.query<Rows>(
      `SELECT s.price_unit FROM activity a 
     JOIN space s ON a.space_id = s.id 
     WHERE a.id = ?`,
      [activityId],
    );
    const priceUnit = (priceRows[0] as { price_unit: number }).price_unit;

    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) as count FROM booking WHERE bills_number LIKE ?",
      [`${year}-%`],
    );
    const count = (rows as { count: number }[])[0].count;
    const billsNumber = `${year}-${Number(count) + 1}`;

    await databaseClient.query(
      `INSERT INTO booking (users_id, bills_number, quantity, total_price, id_activity, payment_status)
     VALUES (?, ?, 1, ?, ?, 'pending')`,
      [userId, billsNumber, priceUnit, activityId],
    );
  }

  async getEventRequest(activityId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, users_id FROM activity WHERE id = ?",
      [activityId],
    );
    return rows[0] as { id: number; users_id: number };
  }
}

export default new DashboardAdminRepository();
