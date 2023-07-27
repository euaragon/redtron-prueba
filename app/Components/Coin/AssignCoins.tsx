/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import { useUserContext } from "../../UserContext/UserContext";
import { useCasinosContext } from "../../CasinoContext/CasinoContext";
import Link from "next/link";
import css from "./AssignCoins.module.css";
import { useUsersContext } from "../../UsersContext/UsersContext";


const AssignCoins = ({setAssigned}) => {
  const { userDb } = useUserContext();
  const { casinosDb } = useCasinosContext();
  const { charge, setCharge } = useUsersContext();

  const tokenId = userDb?.token;
  const userLoginId = userDb?.id;
  const [usersCasino, setUsersCasino] = useState(null);
  const [input, setInput] = useState({
    userCasinoId: "",
    inflow_qty: 0,
  });

  const [idCasino, setIdCasino] = useState({
    id: "",
  });

  const reload = () => {
    setCharge(!charge);
  };

  const getUserCasino = async (casinoId) => {
    try {
      const response = await fetch(
        `https://redtronapi-development.up.railway.app/userCasino?casinoId=${casinoId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + tokenId,
          },
        }
      );
      const data = await response.json();
      setUsersCasino(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  React.useEffect(() => {
    idCasino.id && getUserCasino(idCasino.id);
  }, [idCasino]);

  const postCoins = async (obj: object, token: string) => {
    try {
      const response = await fetch(
        `https://redtronapi-development.up.railway.app/coinsMovements/coinsInflow/${userLoginId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
          body: JSON.stringify(obj),
        }
      );
      console.log("data",response) 

      if (response.ok) {
        swal({
          title: "Fichas asignadas correctamente!",
          icon: "success",
        });
      } else {
        swal({
          title: "No se pudieron asignar las fichas",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    reload();
  };

  const handleInputChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLSelectElement> &
    React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleIdChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setIdCasino({
      ...idCasino,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({
    id: "",
    userCasinoId: "",
    inflow_qty: "",
  });

  const validateForm = () => {
    let hasErrors = false;
    const newErrors = {
      id: "",
      userCasinoId: "",
      inflow_qty: "",
    };

    if (!idCasino.id || idCasino.id === "Seleccionar Casino") {
      newErrors.id = "Debes seleccionar un casino.";
      hasErrors = true;
    }

    if (!input.userCasinoId || input.userCasinoId === "Seleccionar Usuario") {
      newErrors.userCasinoId = "Debes seleccionar un usuario.";
      hasErrors = true;
    }

    if (input.inflow_qty == 0 || isNaN(input.inflow_qty)|| !input.inflow_qty) {
      newErrors.inflow_qty = "Cantidad de fichas inválida.";
      hasErrors = true;
    } else if (input.inflow_qty < 1) {
      newErrors.inflow_qty =
        "La cantidad de fichas debe ser mayor o igual a 1.";
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postCoins(input, tokenId);
    setInput({
      userCasinoId: "",
      inflow_qty: "",
    });
    setAssigned(input.userCasinoId)
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className={css.container}>
      <div className={css.row}>
        <h2>Asignar Fichas</h2>
        <Link className={css.blanco} href="/Admin">
          cerrar
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Casino:</label>
        <select
          name="id"
          placeholder="Seleccionar Casino"
          value={idCasino.id}
          onChange={handleIdChange}
        >
          <div className={css.errores}>{errors.id && <p>{errors.id}</p>}</div>
          <option>Seleccionar Casino</option>
          {casinosDb?.map((Cs) => (
            <option key={Cs.id} value={Cs.id}>
              {Cs.name}
            </option>
          ))}
        </select>
        <label>Usuario:</label>
        <select
          name="userCasinoId"
          value={input.userCasinoId}
          onChange={handleInputChange}
        >
          <div className={css.errores}>{errors.userCasinoId && <p>{errors.userCasinoId}</p>}</div>
          
          <option>Seleccionar Usuario</option>
          {usersCasino?.map((Uc) => (
            <option key={Uc.id} value={Uc.id}>
              {Uc.user.username}
            </option>
          ))}
        </select>

        <label>Cantidad de fichas:</label>
        <input
          type="number"
          name="inflow_qty"
          value={input.inflow_qty}
          onChange={handleInputChange}
        />
        <div className={css.errores}>{errors.inflow_qty && <p>{errors.inflow_qty}</p>}</div>
        
        <button type="submit">Asignar fichas</button>
      </form>
    </div>
  );
};

export default AssignCoins;
