/* eslint-disable @next/next/no-img-element */
"use client";

import { useCoinsContext } from "../CoinsContext/CoinsContext";

import React,{useState} from "react";
import Coin from "../Components/Coin/Coin";
import AssignCoins from "../Components/Coin/AssignCoins";

export default function Page() {
  const { coinsDb, charge, setCharge } = useCoinsContext();
  const[assignedId, setAssignediD]=useState(null);

  return (
    <main>
     <AssignCoins key={charge.toString()} setAssigned={setAssignediD} />
     <Coin assignedId={assignedId}/>
    </main>
  );
}
