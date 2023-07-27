import { useContext, createContext, Dispatch, SetStateAction } from "react";

export interface CoinsContextValue {
  coinsDb?: Array<any> | null;
  setCoinsDb: Dispatch<SetStateAction<Array<any> | null>>;
  charge: boolean;
  setCharge: Dispatch<SetStateAction<boolean>>;
  lastMovementInfo: LastMovementInfo | null; 
  setLastMovementInfo: Dispatch<SetStateAction<LastMovementInfo | null>>; 
}

export interface LastMovementInfo {
  inflow_qty: string;
  casinoName: string;
  userName: string;
}

export const CoinsContext = createContext<CoinsContextValue>({
  coinsDb: null,
  setCoinsDb: () => {},
  charge: false,
  setCharge: () => {},
  lastMovementInfo: null, 
  setLastMovementInfo: () => {}
});

export const useCoinsContext = () => useContext(CoinsContext);

