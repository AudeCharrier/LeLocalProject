import type { RequestHandler } from "express";
import databaseLeLocal from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

const add: RequestHandler = async (req, res, next) => {
  try {
    const {
      space_id,
      time_slot_id,
      start_date,
      end_date,
      seats,
      months,
      users_id,
      total_price,
    } = req.body;

    const [existing] = await databaseLeLocal.query<Rows>(
      "SELECT * FROM activity WHERE space_id = ? AND start_date = ? AND time_slot_id = ?",
      [space_id, start_date, time_slot_id],
    );

    let activityId: number;

    if (existing.length > 0) {
      activityId = (existing[0] as { id: number }).id;
    } else {
      const [spaceRows] = await databaseLeLocal.query<Rows>(
        "SELECT * FROM space WHERE id = ?",
        [space_id],
      );
      const space = spaceRows[0] as {
        space_name: string;
        price_unit: number;
        url_image: string;
      };

      const [insertResult] = await databaseLeLocal.query<Result>(
        "INSERT INTO activity (time_slot_id, space_id, start_date, end_date, description, price_unit, url_image, name, users_id) VALUES (?, ?, ?, ?, NULL, ?, ?, ?, NULL)",
        [
          time_slot_id,
          space_id,
          start_date,
          end_date ?? start_date,
          space.price_unit,
          space.url_image,
          `Réservation - ${space.space_name}`,
        ],
      );

      activityId = insertResult.insertId;
    }

    const quantity = seats ?? months ?? 1;

    await databaseLeLocal.query(
      "INSERT INTO cart (quantity, total_price, users_id, id_activity) VALUES (?, ?, ?, ?)",
      [quantity, total_price, users_id, activityId],
    );

    res.status(201).json({ activityId });
  } catch (err) {
    next(err);
  }
};

export default { add };
