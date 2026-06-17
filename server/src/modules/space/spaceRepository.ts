import type { PoolConnection } from "mysql2/promise";
import databaseLeLocal from "../../../database/client";
import type { Rows } from "../../../database/client";

type Space = {
  id: number;
  space_name: string;
  description: string;
  capacity: number;
  url_image: string;
  price_unit: number;
  space_type: string;
  space_category: string;
};

class SpaceRepository {
  async read(id: number) {
    const [rows] = await databaseLeLocal.query<Rows>(
      "select * from space where id = ?",
      [id],
    );
    return rows[0] as Space;
  }

  async readAll() {
    const [rows] = await databaseLeLocal.query<Rows>("select * from space");
    return rows as Space[];
  }

  async readForUpdate(
    connection: PoolConnection,
    id: number,
  ): Promise<Space | null> {
    const [rows] = await connection.query<Rows>(
      "SELECT * FROM space WHERE id = ? FOR UPDATE",
      [id],
    );
    return (rows[0] as Space) ?? null;
  }

  async countBookedSeats(
    connection: PoolConnection,
    spaceId: number,
    date: string,
    timeSlotId: number,
  ): Promise<number> {
    const [rows] = await connection.query<Rows>(
      `SELECT COALESCE(SUM(b.quantity), 0) AS booked
       FROM activity a
       LEFT JOIN cart b ON b.id_activity = a.id
       WHERE a.space_id = ? AND a.start_date = ? AND a.time_slot_id = ?`,
      [spaceId, date, timeSlotId],
    );
    return Number((rows[0] as { booked: number })?.booked) || 0;
  }
}

export default new SpaceRepository();
