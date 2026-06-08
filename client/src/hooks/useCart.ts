import { useEffect, useState } from "react";
import type { Cart } from "../types/cart";

function useCart(user_id: number) {
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cart/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCart(data);
      });
  }, [user_id]);

  return cart;
}

export default useCart;
