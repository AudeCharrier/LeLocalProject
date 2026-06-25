import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface WorkshopContextType {
  selectedWorkshopId: number | null;
  setSelectedWorkshopId: (id: number | null) => void;
}

export const ModalWorkshopContext = createContext<
  WorkshopContextType | undefined
>(undefined);

export function ModalWorkshopProvider({ children }: { children: ReactNode }) {
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<number | null>(
    null,
  );

  return (
    <ModalWorkshopContext.Provider
      value={{ selectedWorkshopId, setSelectedWorkshopId }}
    >
      {children}
    </ModalWorkshopContext.Provider>
  );
}
