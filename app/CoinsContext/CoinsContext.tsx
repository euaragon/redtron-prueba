import { useContext, createContext, Dispatch, SetStateAction } from "react";

export interface CoinsContextValue {
  coinsDb?: Array<any> | null;
  setCharge: Dispatch<SetStateAction<boolean>>;
  charge: boolean;
}

export const CoinsContext = createContext<CoinsContextValue>({
  coinsDb: null,
  setCharge: () => {},
  charge: false
});

export const useCoinsContext = () => useContext(CoinsContext);
