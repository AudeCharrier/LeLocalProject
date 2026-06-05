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

type SumParticipants = {
  id_activity: number;
  name: string;
  sum_participants: string;
  capacity: number;
};

class EventRepository {
  // The C of CRUD - Create operation
  /* 
  async create(space: Omit<Space, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseLeLocal.query<Result>(
      "insert into item (title, user_id) values (?, ?)",
      [space.space_name, space.id],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  } */

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseLeLocal.query<Rows>(
      "select * from activity where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Activity;
  }

  async readAllUpcomingEvents() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
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
    LIMIT 10`,
    );

    // Return the array of items
    return rows as Activity[];
  }

  async browseSumParticipantsToEvent() {
    const [rows] = await databaseLeLocal.query<Rows>(
      `SELECT 
    a.name,
    b.id_activity,
    s.capacity,
    SUM(b.quantity) AS sum_participants
    FROM booking as b
    JOIN activity as a ON b.id_activity = a.id
    JOIN space as s ON a.space_id = s.id
    WHERE s.space_type='Evenements'
    GROUP BY b.id_activity, a.name, s.capacity`,
    );

    // Return the array of items
    return rows as SumParticipants[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new EventRepository();
