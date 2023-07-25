"use client";
import React, { useEffect } from "react";
import { UsersContext } from "./UsersContext";
import { useUserContext } from "../UserContext/UserContext";

export const UsersProvider = ({ children }: any) => {
  const [usersDb, setUsersDB] = React.useState();
  const [charge, setCharge] = React.useState(false);
  const { userDb } = useUserContext();
  const tokenID = userDb?.token;
 

  const getUsersDb = async () => {
    try {
      const response = await fetch("https://redtronapi-development.up.railway.app/users", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + tokenID,
        }
      });
      const data = await response.json();
      setUsersDB(data.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    tokenID && getUsersDb();
  }, [userDb.token,charge]);
 

  return (
    <UsersContext.Provider value={{ usersDb, setCharge, charge }}>
      {children}
    </UsersContext.Provider>
  );
};
