import { createContext, useContext } from "react";

export const ProductionContext = createContext();

export function useProductionContext() {
  const productionData = useContext(ProductionContext);

  if (productionData === undefined) {
    throw new Error(
      "useProductionContext must be used within a ProductionContext.Provider"
    );
  }
  return productionData;
}
