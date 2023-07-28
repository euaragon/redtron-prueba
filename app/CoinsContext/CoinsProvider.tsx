import React, { useEffect } from "react";
import { CoinsContext, CoinsContextValue } from "./CoinsContext"; // Asegúrate de importar el contexto adecuadamente
import { useUserContext } from "../UserContext/UserContext";
import { useCasinosContext } from "../CasinoContext/CasinoContext";

export const CoinsProvider = ({ children, userCasinoId }: any) => {
  const [coinsDb, setCoinsDB] = React.useState<Array<any> | null>(null); // Especifiquemos el tipo de 'coinsDb'
  const [charge, setCharge] = React.useState(false);
  const { userDb } = useUserContext();
  const { casinosDb } = useCasinosContext();
  const tokenID = userDb?.token;

  const getCoinsDb = async (userCasinoId: string) => {
    try {
      const response = await fetch(`https://redtronapi-development.up.railway.app/coinsMovements?userCasinoId=${userCasinoId}`, {
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
    if (tokenID && userCasinoId) { // Verifiquemos que tanto el tokenID como el userCasinoId tengan valores válidos
      getCoinsDb(userCasinoId);
    }
  }, [tokenID, userCasinoId]);

  // Asegurémonos de que el contexto tenga un valor adecuado si aún no se ha obtenido data
  const coinsContextValue: CoinsContextValue = {
    coinsDb,
    setCoinsDb: setCoinsDB,
    charge,
    setCharge,
    lastMovementInfo: null, 
    setLastMovementInfo: () => {}
  };

  return (
    <CoinsContext.Provider value={coinsContextValue}>
      {children}
    </CoinsContext.Provider>
  );
};
