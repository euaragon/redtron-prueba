"use client";
import { useContext, createContext ,Dispatch, SetStateAction } from "react";

export interface AuthContextValue {
  usersDb?: Array<any> | null;
  setCharge: Dispatch<SetStateAction<boolean | null>>;
  charge: boolean;
}

export const UsersContext = createContext<AuthContextValue>({
  usersDb: null,
  setCharge: () => {},
  charge:false
});

export const useUsersContext = () => useContext(UsersContext);
