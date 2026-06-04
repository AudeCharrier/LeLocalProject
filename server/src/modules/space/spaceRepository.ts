import databaseLeLocal from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Space = {
  id: number;
  space_name: string;
  description: number;
  capacity: number;
  url_image: string;
  price_unit: number;
  space_type: string;
};

class SpaceRepository {
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
      "select * from item where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Space;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseLeLocal.query<Rows>("select * from space");

    // Return the array of items
    return rows as Space[];
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

export default new SpaceRepository();
