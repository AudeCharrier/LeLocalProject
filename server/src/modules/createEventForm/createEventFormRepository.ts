import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type NewEvent = {
  name: string;
  description: string;
  price_unit: number;
  start_date: string;
  end_date: string;
  space_id: number;
  time_slot_id: number;
  url_image: string | null;
};

class CreateEventFormRepository {
  async isEventSlotTaken(
    spaceId: number,
    startDate: string,
    timeSlotId: number,
  ): Promise<boolean> {
    const overlappingSlotIds = this.getOverlappingSlotIds(timeSlotId);

    const [rows] = await databaseClient.query<Rows>(
      `SELECT id
       FROM activity
       WHERE space_id = ?
         AND start_date = ?
         AND time_slot_id IN (?)`,
      [spaceId, startDate, overlappingSlotIds],
    );

    return rows.length > 0;
  }

  async create(event: NewEvent): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      `INSERT INTO activity (
        name,
        description,
        price_unit,
        start_date,
        end_date,
        space_id,
        time_slot_id,
        url_image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event.name,
        event.description,
        event.price_unit,
        event.start_date,
        event.end_date,
        event.space_id,
        event.time_slot_id,
        event.url_image,
      ],
    );
    return result.insertId;
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
}

export default new CreateEventFormRepository();
