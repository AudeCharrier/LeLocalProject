import type { ResultSetHeader, RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

type CartItem = {
  users_id: number;
  id_activity: number;
  quantity: number;
  total_price: number;
};

const readAll = async (userId: number) => {
  const [rows] = await databaseClient.query<RowDataPacket[]>(
    `
    SELECT
      c.id,
      c.quantity,
      c.total_price,
      a.id AS id_activity,
      a.name,
      a.description,
      a.start_date,
      a.end_date,
      a.price_unit,

      s.id AS id_space,
      s.space_name,
      s.url_image,
      s.capacity,
      s.space_type,
      s.space_category

    FROM cart c

    JOIN activity a
      ON c.id_activity = a.id

    JOIN space s
      ON a.space_id = s.id

    WHERE c.users_id = ?
    `,
    [userId],
  );

  return rows;
};

const create = async (item: Omit<CartItem, "id">) => {
  const [existing] = await databaseClient.query<RowDataPacket[]>(
    "SELECT id, quantity FROM cart WHERE users_id = ? AND id_activity = ?",
    [item.users_id, item.id_activity],
  );

  if (existing.length > 0) {
    const newQuantity = existing[0].quantity + item.quantity;
    await databaseClient.query<ResultSetHeader>(
      "UPDATE cart SET quantity = ? WHERE id = ?",
      [newQuantity, existing[0].id],
    );
    return existing[0].id;
  }

  const [result] = await databaseClient.query<ResultSetHeader>(
    "INSERT INTO cart (users_id, id_activity, quantity) VALUES (?, ?, ?)",
    [item.users_id, item.id_activity, item.quantity],
  );

  return result.insertId;
};

const updateQuantity = async (cartItemId: number, quantity: number) => {
  const [result] = await databaseClient.query<ResultSetHeader>(
    "UPDATE cart SET quantity = ? WHERE id = ?",
    [quantity, cartItemId],
  );

  return result.affectedRows;
};

/* const updateTotalPrice = async (
  cartItemId: number,
  quantity: number,
  total_price: number,
) => {
  const [result] = await databaseClient.query<ResultSetHeader>(
    "UPDATE cart AS c JOIN activity AS a ON a.id = c.id_activity SET c.total_price = c.quantity * a.price_unit WHERE c.id = ?",
  );
  return result.affectedRows;
}; */

const destroy = async (cartItemId: number) => {
  const [result] = await databaseClient.query<ResultSetHeader>(
    "DELETE FROM cart WHERE id = ?",
    [cartItemId],
  );

  return result.affectedRows;
};

const destroyAll = async (userId: number) => {
  const [result] = await databaseClient.query<ResultSetHeader>(
    "DELETE FROM cart WHERE users_id = ?",
    [userId],
  );

  return result.affectedRows;
};

export default { readAll, create, updateQuantity, destroy, destroyAll };
