import { useNavigate } from "react-router";

function useClearCart() {
  const navigate = useNavigate();

  return async (user_id: number | string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/user/${user_id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok || response.status === 201) {
        navigate("/confirmation");
      }
    } catch (error) {
      console.error("Erreur Biome/Fetch lors du clear :", error);
    }
  };
}

export default useClearCart;
