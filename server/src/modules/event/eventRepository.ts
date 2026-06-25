import databaseLeLocal from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Activity = {
  id: number;
  space_name: string;
  name: string;
  start_date: string;
  end_date: string;
  start_hour: string;
  end_hour: string;
  description: string;
  url_image: string;
  price_unit: number;
};

type Participants = {
  id_activity: number;
  name: string;
  sum_participants: number;
  remaining_slots: number;
  capacity: number;
};

type RemainingSlotsRow = {
  sum_participants: number | null;
  capacity: number;
  remaining_slots: number;
};

class EventRepository {
  async read(id: number) {
    const [rows] = await databaseLeLocal.query<Rows>(
      "select * from activity where id = ?",
      [id],
    );

    return rows[0] as Activity;
  }

  async readAllUpcomingEvents() {
    const [rows] = await databaseLeLocal.query<Rows>(
      `SELECT
      a.id,
      a.name,
      a.start_date,
      a.end_date,
      a.description,
      a.url_image,
      a.price_unit,
      s.space_name,
      t.start_hour,
      t.end_hour,
      s.capacity
    FROM activity AS a
    INNER JOIN time_slot AS t ON a.time_slot_id = t.id
    INNER JOIN space AS s ON a.space_id = s.id
    WHERE s.space_type = 'Evenements'
    AND a.start_date >= CURRENT_DATE()
    ORDER BY a.start_date ASC 
  `,
    );

    return rows as Activity[];
  }

  // check participants and remaining slots for all events to map them
  async browseParticipantsToEvent() {
    const [rows] = await databaseLeLocal.query<Rows>(
      `SELECT
    a.name,
    b.id_activity,
    s.capacity,
    SUM(b.quantity) AS sum_participants,
    (s.capacity - SUM(b.quantity)) AS remaining_slots
    FROM booking as b
    JOIN activity as a ON b.id_activity = a.id
    JOIN space as s ON a.space_id = s.id
    WHERE s.space_type='Evenements'
    GROUP BY b.id_activity, a.name, s.capacity`,
    );

    const formattedRows = rows.map((row) => ({
      ...row,
      sum_participants: Number(row.sum_participants) || 0,
      remaining_slots: Number(row.remaining_slots) || Number(row.capacity),
    }));

    return formattedRows as Participants[];
  }

  // check remaining slots when adding to cart
  async getRemainingSlotsByEvent(id: number): Promise<number | null> {
    const [rows] = await databaseLeLocal.query<Rows>(
      `
    SELECT 
      s.capacity,
      IFNULL(SUM(b.quantity), 0) AS sum_participants,
      (s.capacity - SUM(b.quantity)) AS remaining_slots
    FROM activity as a
    JOIN space as s ON a.space_id = s.id
    LEFT JOIN booking as b ON b.id_activity = a.id
    WHERE a.id = ?
  `,
      [id],
    );

    const row = rows[0];
    if (!row) return null;

    return Number(row.remaining_slots);
  }

  async browseEventsOfTheDay(date: string) {
    const [rows] = await databaseLeLocal.query<Rows>(
      `SELECT
      a.id,
      a.name,
      a.start_date,
      a.end_date,
      a.description,
      a.url_image,
      a.price_unit,
      s.space_name,
      t.start_hour,
      t.end_hour,
      s.capacity
    FROM activity AS a
    INNER JOIN time_slot AS t ON a.time_slot_id = t.id
    INNER JOIN space AS s ON a.space_id = s.id
    WHERE s.space_type = 'Evenements'
    AND a.start_date = ?
    ORDER BY t.start_hour ASC  `,
      [date],
    );
    return rows as Activity[];
  }
}

export default new EventRepository();
