/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useUsersContext } from "../../UsersContext/UsersContext";
import css from "./Casino.module.css";
import { useUserContext } from "../../UserContext/UserContext";

const Casino = ({ id, name, imageUrl, onClose }) => {
  const { usersDb, charge, setCharge } = useUsersContext();
  const [option, setOption] = useState({
    usersId: [],
    casinoId: id,
  });
  const [usersCasino, setUsersCasino] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { userDb } = useUserContext();
  const tokenID = userDb?.token;

  const userCasinoAsigned = usersCasino?.map((el) => el.user.username);
  const userOptions = usersDb?.filter(
    (el) => !userCasinoAsigned?.includes(el.username)
  );
  const userSelected = usersDb?.filter((el) => option.usersId?.includes(el.id));

  const handleOptionChange = ({ target: { value } }) => {
    if (option.usersId.includes(value)) return;
    setOption({
      ...option,
      usersId: option.usersId.concat(value),
    });
  };

  const getUserCasino = async (casinoId) => {
    try {
      const response = await fetch(
        `https://redtronapi-development.up.railway.app/userCasino?casinoId=${casinoId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + tokenID,
          },
        }
      );
      const data = await response.json();
      setUsersCasino(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const postUserCasino = async () => {
    try {
      const response = await fetch("https://redtronapi-development.up.railway.app/userCasino", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + tokenID,
        },
        body: JSON.stringify(option),
      });
      setRefresh(!refresh);
      setOption({
        usersId: [],
        casinoId: id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserCasino(id);
  }, [id, refresh]);


  const [isButtonVisible, setButtonVisibility] = useState(null);

  // Función para mostrar el botón cuando el cursor está encima del elemento h3
  const showButton = (userId) => {
    setButtonVisibility(userId);
  };

  // Función para ocultar el botón cuando el cursor sale del elemento h3
  const hideButton = () => {
    setButtonVisibility(null);
  };

  // Función para manejar el clic en el botón
  const handleButtonClick = (userId) => {
    // Coloca aquí la lógica para eliminar al usuario según su ID (userId)
    // Por ejemplo, puedes llamar a una función para eliminar al usuario de la lista
    console.log("Usuario eliminado:", userId);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className={css.container}>
      <div className={css.title}>
        <h1>{name}</h1>
        <img src={imageUrl} alt={name} />
        <button onClick={onClose}>cerrar</button>
      </div>
      <div className={css.boxes}>
        <div className={css.box1}>
          {usersCasino?.map((el) => (
            <h3
              key={el.user.id}
              onMouseEnter={() => showButton(el.user.id)}
              onMouseLeave={() => hideButton()}
            >
              {el.user.username}{" "}
              <button
                className={`${css.btn_close} ${
                  isButtonVisible === el.user.id ? "" : "hidden"
                }`}
                onClick={() => handleButtonClick(el.user.id)}
              >
                eliminar
              </button>
            </h3>
          ))}
        </div>

        <div className={css.box2}>
          <select
            name="Cajeros"
            placeholder="cajeros"
            onChange={handleOptionChange}
          >
            <option>Cajeros</option>
            {userOptions?.map((e) => (
              <option key={e.id} value={e.id}>
                {e.username}
              </option>
            ))}
          </select>
          <div className={css.box3}>
            {userSelected?.map((obj) => (
              <h3 key={obj.id}>{obj.username}</h3>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => postUserCasino()}>AGREGAR</button>
    </div>
  );
};

export default Casino;
