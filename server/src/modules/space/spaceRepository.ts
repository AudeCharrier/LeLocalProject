import type { Pool, PoolConnection } from "mysql2/promise";
import databaseLeLocal from "../../../database/client";
import type { Rows } from "../../../database/client";

type Queryable = Pool | PoolConnection;

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

  async isSlotTaken(
    connection: Queryable,
    spaceId: number,
    date: string,
    timeSlotId: number,
  ): Promise<boolean> {
    const overlappingSlotIds = this.getOverlappingSlotIds(timeSlotId);

    const [rows] = await connection.query<Rows>(
      `SELECT COALESCE(SUM(c.quantity), 0) AS booked
       FROM activity a
       LEFT JOIN cart c ON c.id_activity = a.id
       WHERE a.space_id = ?
         AND a.start_date = ?
         AND a.time_slot_id IN (?)`,
      [spaceId, date, overlappingSlotIds],
    );
    const booked = Number((rows[0] as { booked: number })?.booked) || 0;
    return booked > 0;
  }

  private getOverlappingSlotIds(timeSlotId: number): number[] {
    const MATIN = 1;
    const APRES_MIDI = 2;
    const JOURNEE = 4;

    if (timeSlotId === JOURNEE) {
      return [MATIN, APRES_MIDI, JOURNEE];
    }
    if (timeSlotId === MATIN || timeSlotId === APRES_MIDI) {
      return [timeSlotId, JOURNEE];
    }

    return [timeSlotId];
  }

  async hasOverlappingDateRange(
    connection: Queryable,
    spaceId: number,
    startDate: string,
    endDate: string,
  ): Promise<boolean> {
    const [rows] = await connection.query<Rows>(
      `SELECT COALESCE(SUM(c.quantity), 0) AS booked
       FROM activity a
       LEFT JOIN cart c ON c.id_activity = a.id
       WHERE a.space_id = ?
         AND a.start_date < ?
         AND ? < a.end_date`,
      [spaceId, endDate, startDate],
    );
    const booked = Number((rows[0] as { booked: number })?.booked) || 0;
    return booked > 0;
  }
}

export default new SpaceRepository();
