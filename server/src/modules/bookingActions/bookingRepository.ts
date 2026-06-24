import databaseLeLocal from "../../../database/client";
import type { Rows } from "../../../database/client";

const create = async (
  userId: number,
  cartItems: { id_activity: number; quantity: number; total_price: number }[],
) => {
  for (const item of cartItems) {
    const year = new Date().getFullYear();
    const [rows] = await databaseLeLocal.query<Rows>(
      "SELECT COUNT(*) as count FROM booking WHERE bills_number LIKE ?",
      [`${year}-%`],
    );
    const count = (rows as { count: number }[])[0].count;
    const billsNumber = `${year}-${Number(count) + 1}`;

    await databaseLeLocal.query(
      `INSERT INTO booking (users_id, bills_number, quantity, total_price, id_activity) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, billsNumber, item.quantity, item.total_price, item.id_activity],
    );
  }

  await databaseLeLocal.query("DELETE FROM cart WHERE users_id = ?", [userId]);
};

export default { create };
