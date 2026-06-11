import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";

type NewEvent = {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  space_id: number;
  time_slot_id: number;
};

class CreateEventFormRepository {
  async create(event: NewEvent): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      `INSERT INTO activity (
        name,
        description,
        start_date,
        end_date,
        space_id,
        time_slot_id
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        event.name,
        event.description,
        event.start_date,
        event.end_date,
        event.space_id,
        event.time_slot_id,
      ],
    );

    return result.insertId;
  }
}

export default new CreateEventFormRepository();
