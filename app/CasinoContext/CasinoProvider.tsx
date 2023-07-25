/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { CasinosContext } from "./CasinoContext";
import { useUserContext } from "../UserContext/UserContext";

export const CasinoProvider = ({ children }: any) => {
  const [casinosDb, setCasinosDB] = React.useState();
  const [charge, setCharge] = React.useState(false);
  const { userDb } = useUserContext();
  const tokenID = userDb?.token;

  /************* Funcion para traer tods los casinos desde la base de datos y guardarlos en el estado global *************/
  const getCasinosDb = async () => {
    try {
      const response = await fetch("https://redtronapi-development.up.railway.app/casino", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + tokenID,
        }
      });
      const data = await response.json();
      setCasinosDB(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    tokenID && getCasinosDb();
  }, [userDb]);
 

  return (
    <CasinosContext.Provider value={{ casinosDb, setCharge, charge }}>
      {children}
    </CasinosContext.Provider>
  );
};