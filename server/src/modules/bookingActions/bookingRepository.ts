import databaseLeLocal from "../../../database/client";
import type { Rows } from "../../../database/client";

const create = async (
  userId: number,
  cartItems: { id_activity: number; quantity: number; price_unit: number }[],
) => {
  for (const item of cartItems) {
    const totalPrice = item.price_unit * item.quantity;

    const year = new Date().getFullYear();
    const [rows] = await databaseLeLocal.query<Rows>(
      "SELECT COUNT(*) as count FROM booking WHERE bills_number LIKE ?",
      [`${year}-%`],
    );
    const count = (rows[0] as { count: number }).count;
    const billsNumber = `${year}-${Number(count) + 1}`;

    await databaseLeLocal.query(
      `INSERT INTO booking (users_id, bills_number, quantity, total_price, id_activity) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, billsNumber, item.quantity, totalPrice, item.id_activity],
    );
  }

  await databaseLeLocal.query("DELETE FROM cart WHERE users_id = ?", [userId]);
};

export default { create };
