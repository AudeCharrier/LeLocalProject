export type QuantityConfig = {
  value: number;
  min: number;
  max: number;
  error: "MIN_ERROR" | "MAX_ERROR" | null;
};
