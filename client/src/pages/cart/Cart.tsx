import { Trash2 } from "lucide-react";
import { useState } from "react";
import "./Cart.css";

type EventType = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
};

function Cart() {
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: "Festival de Musique de Bordeaux",
      description:
        "Trois jours de concerts avec des artistes locaux et internationaux.",
      location: "Bordeaux",
      date: "2026-07-15",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
      category: "Musique",
      price: 45,
      quantity: 1,
    },
    {
      id: 2,
      title: "Salon du Développement Web",
      description:
        "Conférences, ateliers et rencontres autour des technologies web.",
      location: "Paris",
      date: "2026-09-10",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
      category: "Tech",
      price: 20,
      quantity: 1,
    },
    {
      id: 3,
      title: "Marathon de Lyon",
      description: "Course annuelle ouverte aux amateurs et professionnels.",
      location: "Lyon",
      date: "2026-10-04",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
      category: "Sport",
      price: 10,
      quantity: 1,
    },
    {
      id: 4,
      title: "Marché de Noël",
      description: "Artisanat local, animations et spécialités gourmandes.",
      location: "Strasbourg",
      date: "2026-12-05",
      image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be",
      category: "Culture",
      price: 0,
      quantity: 1,
    },
  ]);
  const [message, setMessage] = useState<string>("");

  const increaseQuantity = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, quantity: event.quantity + 1 } : event,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id && event.quantity > 1
          ? { ...event, quantity: event.quantity - 1 }
          : event,
      ),
    );
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));

    setMessage("Article supprimé");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const totalPrice = events.reduce(
    (total, event) => total + event.price * event.quantity,
    0,
  );

  return (
    <>
      <section className="section-card-cart">
        <h2>Total panier : {totalPrice} €</h2>
        {message && <p className="deleted-message">{message}</p>}
        {events.map((event) => (
          <div key={event.id} className="card-cart">
            <img src={event.image} width="200" alt={event.title} />

            <div className="card-cart-text">
              <div className="card-cart-high-text">
                <p className="card-cart-high-text-title">{event.title}</p>

                <span className="card-cart-high-text-price">
                  {event.price === 0
                    ? "Gratuit"
                    : `${event.price * event.quantity} €`}
                </span>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteEvent(event.id)}
                >
                  <Trash2 />
                </button>
              </div>

              <p className="card-cart-text-description">{event.description}</p>

              <div className="card-cart-low-text">
                <p>{event.location}</p>
                <p>{event.date}</p>
                <p>{event.category}</p>
              </div>

              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={() => decreaseQuantity(event.id)}
                  className="decreaseQuantity-button"
                >
                  <p>-</p>
                </button>

                <span>{event.quantity}</span>

                <button
                  type="button"
                  onClick={() => increaseQuantity(event.id)}
                  className="increaseQuantity-button"
                >
                  <p>+</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Cart;
