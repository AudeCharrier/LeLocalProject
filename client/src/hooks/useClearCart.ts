import { useNavigate } from "react-router";
import { apiFetch } from "./apiFetch";

function useClearCart() {
  const navigate = useNavigate();

  return async (user_id: number | string) => {
    try {
      const response = await apiFetch(`/api/cart/user/${user_id}`, {
        method: "DELETE",
      });

      if (response.ok || response.status === 201) {
        navigate("/confirmation");
      }
    } catch (error) {
      console.error("Erreur Biome/Fetch lors du clear :", error);
    }
  };
}

export default useClearCart;
