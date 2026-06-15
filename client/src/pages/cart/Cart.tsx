import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router";
import useCart from "../../hooks/useCart";
import type { CartItem } from "../../types/cart";

function Cart() {
  const cart = useCart(2);

  const [carts, setCarts] = useState<CartItem[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCarts(cart);
  }, [cart]);
  useEffect(() => {
    console.log(carts);
  }, [carts]);
  const increaseQuantity = async (id: number) => {
    const item = carts.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + 1;

    try {
      await fetch(`http://localhost:3310/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      setCarts((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i)),
      );
    } catch (error) {
      console.error("Erreur augmentation quantité :", error);
    }
  };

  const decreaseQuantity = async (id: number) => {
    const item = carts.find((i) => i.id === id);
    if (!item || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    try {
      await fetch(`http://localhost:3310/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      setCarts((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i)),
      );
    } catch (error) {
      console.error("Erreur diminution quantité :", error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await fetch(`http://localhost:3310/api/cart/${id}`, {
        method: "DELETE",
      });

      setCarts((prev) => prev.filter((item) => item.id !== id));
      setMessage("Article supprimé");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  const totalPrice = carts.reduce(
    (total, item) => total + item.price_unit * item.quantity,
    0,
  );

  if (carts.length === 0) {
    return (
      <section className="cart-page">
        <p className="cart-empty">Votre panier est vide.</p>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <section className="cart-items-list">
        {carts.map((item) => (
          <article key={item.id} className="cart-item-card">
            <img
              src={
                item.url_image.startsWith("http")
                  ? item.url_image
                  : `http://localhost:3310${item.url_image}`
              }
              alt={item.space_name}
              className="cart-item-image"
            />
            <div className="cart-item-content">
              <div className="cart-item-header">
                <div>
                  <p className="cart-space-name">{item.space_name}</p>

                  <h2 className="cart-activity-title">{item.name}</h2>
                </div>

                <button
                  type="button"
                  className="cart-delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  <Trash2 />
                </button>
              </div>

              <p className="cart-activity-description">{item.description}</p>

              <div className="cart-item-footer">
                <div className="cart-item-informations">
                  <span>
                    Du {new Date(item.start_date).toLocaleDateString("fr-FR")}
                  </span>

                  <span>
                    au {new Date(item.end_date).toLocaleDateString("fr-FR")}
                  </span>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-quantity-selector">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-item-price">
                    {item.price_unit * item.quantity} €
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="cart-summary">
        <div className="cart-summary-card">
          <h2>Récapitulatif</h2>

          <div className="cart-summary-row">
            <span>Sous-total</span>
            <span>{totalPrice} €</span>
          </div>

          <div className="cart-summary-total">
            <span>Total TTC</span>
            <span>{totalPrice} €</span>
          </div>

          <div className="cart-promo-section">
            <label htmlFor="promo">Code promo</label>

            <div className="cart-promo-field">
              <input
                id="promo"
                type="text"
                placeholder="Saisissez votre code..."
              />

              <button type="button">Appliquer</button>
            </div>
          </div>
          <Link to="/payment" state={{ totalPrice }}>
            <button type="button" className="cart-payment-button">
              Procéder au paiement
            </button>
          </Link>
        </div>

        {message && <p className="cart-notification">{message}</p>}
      </aside>
    </section>
  );
}

export default Cart;
