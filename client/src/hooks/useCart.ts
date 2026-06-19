import { useEffect, useState } from "react";
import type { CartItem } from "../types/cart";
import { apiFetch } from "./apiFetch";

function useCart(user_id: number) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    apiFetch(`/api/cart/${user_id}`)
      .then((res) => res.json())
      .then((data) => setCart(Array.isArray(data) ? data : []));
  }, [user_id]);

  return cart;
}

export default useCart;
