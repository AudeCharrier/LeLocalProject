import databaseLeLocal from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Workshop = {
  id: number;
  name: string;
  space_name: string;
  description: string;
  space_type: string;
  start_date: string;
  end_date: string;
  start_hour: string;
  end_hour: string;
  price_unit: number;
  url_image: string;
  capacity: number;
};

class WorkshopRepository {
  async read(id: number) {
    const [rows] = await databaseLeLocal.query<Rows>(
      "select * from item where id = ?",
      [id],
    );

    return rows[0] as Workshop;
  }

  async readAll() {
    const [rows] = await databaseLeLocal.query<Rows>("select * from activity");
    return rows as Workshop[];
  }
}

export default new WorkshopRepository();
