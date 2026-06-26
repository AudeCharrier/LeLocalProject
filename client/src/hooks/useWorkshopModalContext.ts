import { useContext } from "react";
import { ModalWorkshopContext } from "../context/ModalWorkshopContext";

export function useWorkshopModalContext() {
  const context = useContext(ModalWorkshopContext);
  if (!context)
    throw new Error(
      "useWorkshopModalContext doit être utilisé à l'intérieur d'un ModalWorkshopProvider",
    );
  return context;
}
