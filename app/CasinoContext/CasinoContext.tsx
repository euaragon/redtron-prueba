"use client";
import { useContext, createContext ,Dispatch, SetStateAction } from "react";

export interface AuthContextValue {
  casinosDb?: Array<any> | null;
  setCharge: Dispatch<SetStateAction<boolean | null>>;
  charge: boolean;
}

export const CasinosContext = createContext<AuthContextValue>({
  casinosDb: null,
  setCharge: () => {},
  charge:false
});

export const useCasinosContext = () => useContext(CasinosContext);