import { useContext } from "react";
import { ModalEventContext } from "../context/CloseEventModalContext";

// Créer un hook personnalisé pour consommer le contexte facilement et de manière sécurisée
export function useEventModalContext() {
  const context = useContext(ModalEventContext);
  if (!context) {
    throw new Error(
      "useEventModalContext doit être utilisé à l'intérieur d'un EventProvider",
    );
  }
  return context;
}
