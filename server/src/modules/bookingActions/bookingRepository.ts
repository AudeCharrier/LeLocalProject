import databaseLeLocal from "../../../database/client";

const create = async (
  userId: number,
  cartItems: { id_activity: number; quantity: number; price_unit: number }[],
) => {
  const billsNumber = Date.now();

  for (const item of cartItems) {
    const totalPrice = item.price_unit * item.quantity;

    await databaseLeLocal.query(
      `INSERT INTO booking (users_id, bills_number, quantity, total_price, id_activity) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, billsNumber, item.quantity, totalPrice, item.id_activity],
    );
  }

  await databaseLeLocal.query("DELETE * FROM cart WHERE users_id = ?", [
    userId,
  ]);
};

export default { create };
