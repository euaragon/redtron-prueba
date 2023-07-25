"use client";
import React, { useEffect } from "react";
import { CoinsContext } from "./CoinsContext";
import { useUserContext } from "../UserContext/UserContext";
import { useCasinosContext } from "../CasinoContext/CasinoContext";

export const CoinsProvider = ({ children }: any) => {
  const [coinsDb, setCoinsDB] = React.useState();
  const [charge, setCharge] = React.useState(false);
  const { userDb } = useUserContext();
  const {casinosDb}=useCasinosContext();
  const tokenID = userDb?.token;
  

  const getCoinsDb = async () => {
    try {
      const response = await fetch("https://redtronapi-development.up.railway.app/coinsMovements", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + tokenID,
        }
      });
      const data = await response.json();
      setCoinsDB(data);
    } catch (error) {
      console.log("Error fetching coinsMovments:", error);
    }
  };

  useEffect(() => {
    tokenID && getCoinsDb();
  }, [userDb]);
 

  return (
    <CoinsContext.Provider value={{ coinsDb, setCharge, charge }}>
      {children}
    </CoinsContext.Provider>
  );
};