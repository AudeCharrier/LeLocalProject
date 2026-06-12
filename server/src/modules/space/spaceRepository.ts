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
  async read(id: number) {
    const [rows] = await databaseLeLocal.query<Rows>(
      "select * from item where id = ?",
      [id],
    );

    return rows[0] as Space;
  }

  async readAll() {
    const [rows] = await databaseLeLocal.query<Rows>("select * from space");
    return rows as Space[];
  }
}

export default new SpaceRepository();
