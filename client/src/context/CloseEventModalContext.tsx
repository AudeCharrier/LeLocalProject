import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface EventContextType {
  isForm: boolean;
  setIsForm: (value: boolean) => void;
}

// Créer le contexte avec une valeur par défaut indéfinie
export const ModalEventContext = createContext<EventContextType | undefined>(
  undefined,
);

// Créer le Provider qui va entourer les composants
export function ModalEventProvider({ children }: { children: ReactNode }) {
  const [isForm, setIsForm] = useState<boolean>(false);

  return (
    <ModalEventContext.Provider value={{ isForm, setIsForm }}>
      {children}
    </ModalEventContext.Provider>
  );
}
