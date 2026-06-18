import type { PoolConnection } from "mysql2/promise";
import databaseLeLocal from "../../../database/client";
import type { Rows } from "../../../database/client";

type Activity = {
  id: number;
  time_slot_id: number;
  space_id: number;
  start_date: string;
  end_date: string;
  description: string | null;
  price_unit: number;
  url_image: string;
  name: string | null;
  users_id: number | null;
};

class ActivityRepository {
  async findBySpaceDateSlot(
    spaceId: number,
    date: string,
    timeSlotId: number,
  ): Promise<Activity | null> {
    const [rows] = await databaseLeLocal.query<Rows>(
      `SELECT * FROM activity
       WHERE space_id = ? AND start_date = ? AND time_slot_id = ?`,
      [spaceId, date, timeSlotId],
    );
    return (rows[0] as Activity) ?? null;
  }

  async findBySpaceDateSlotForUpdate(
    connection: PoolConnection,
    spaceId: number,
    date: string,
    timeSlotId: number,
  ): Promise<Activity | null> {
    const [rows] = await connection.query<Rows>(
      `SELECT * FROM activity
       WHERE space_id = ? AND start_date = ? AND time_slot_id = ?
       FOR UPDATE`,
      [spaceId, date, timeSlotId],
    );
    return (rows[0] as Activity) ?? null;
  }

  async findOrCreate(
    connection: PoolConnection,
    activity: {
      timeSlotId: number;
      spaceId: number;
      startDate: string;
      endDate: string;
      priceUnit: number;
      urlImage: string;
    },
  ): Promise<Activity> {
    try {
      const [result] = await connection.query(
        `INSERT INTO activity
           (time_slot_id, space_id, start_date, end_date, description, price_unit, url_image, name, users_id)
         VALUES (?, ?, ?, ?, NULL, ?, ?, NULL, NULL)`,
        [
          activity.timeSlotId,
          activity.spaceId,
          activity.startDate,
          activity.endDate,
          activity.priceUnit,
          activity.urlImage,
        ],
      );

      const insertId = (result as { insertId: number }).insertId;
      const [rows] = await connection.query<Rows>(
        "SELECT * FROM activity WHERE id = ?",
        [insertId],
      );
      return rows[0] as Activity;
    } catch (err) {
      const isDuplicate = (err as { code?: string }).code === "ER_DUP_ENTRY";
      if (!isDuplicate) throw err;

      const existing = await this.findBySpaceDateSlotForUpdate(
        connection,
        activity.spaceId,
        activity.startDate,
        activity.timeSlotId,
      );
      if (existing == null) throw err;
      return existing;
    }
  }

  async create(activity: {
    timeSlotId: number;
    spaceId: number;
    startDate: string;
    endDate: string;
    priceUnit: number;
    urlImage: string;
  }): Promise<Activity> {
    const [result] = await databaseLeLocal.query(
      `INSERT INTO activity
         (time_slot_id, space_id, start_date, end_date, description, price_unit, url_image, name, users_id)
       VALUES (?, ?, ?, ?, NULL, ?, ?, NULL, NULL)`,
      [
        activity.timeSlotId,
        activity.spaceId,
        activity.startDate,
        activity.endDate,
        activity.priceUnit,
        activity.urlImage,
      ],
    );

    const insertId = (result as { insertId: number }).insertId;

    const [rows] = await databaseLeLocal.query<Rows>(
      "SELECT * FROM activity WHERE id = ?",
      [insertId],
    );
    return rows[0] as Activity;
  }
}

export default new ActivityRepository();
