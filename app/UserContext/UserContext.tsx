'use client'
import { useContext, createContext, Dispatch, SetStateAction } from "react";


type objectDb = {
  username: string;
  role: string;
  token: string;
  phone: Number;
  email: string;
  id: string;
};

interface AuthContextValue {
  userDb?: objectDb | null;
  setUserDB: Dispatch<SetStateAction<objectDb | null>>;
}

export const UserContext = createContext<AuthContextValue>({
  userDb: null,
  setUserDB: () => {}
});

export const useUserContext = () => useContext(UserContext);
