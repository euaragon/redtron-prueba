import React from "react";
import { FaUser } from "react-icons/fa";
import { useUserContext } from "../../UserContext/UserContext";
import css from "./CardUser.module.css";

export const CardUser = ({ onClose }) => {
  const { userDb } = useUserContext();
  return (
    <div className={css.container} onClick={(e) => e.stopPropagation()} >
      <div>
        <input type="button" className={css.close} value="X" onClick={() => onClose()} />
      </div>

      <div className={css.box}>
        <div className={css.icon}>
          <FaUser />
        </div>

        <div className={css.username}>
          <h1>{userDb?.username.toUpperCase()}</h1>
          <h3>{userDb?.role}</h3>
        </div>
      </div>
      <div className={css.card_detail}>
        <div className={css.card_detail_info}>
          <h4 className={css.fonte}>Email: </h4>
          <h4> {userDb?.email}</h4>
        </div>
        <div className={css.card_detail_info}>
          <h4 className={css.fonte}>Telefono: </h4>
          <h4> {userDb?.phone.toString()}</h4>
        </div>
        <div className={css.card_detail_info}>
          <h4 className={css.fonte}>Rol: </h4>
          <h4> {userDb.role}</h4>
        </div>
      </div>
    </div>
  );
};
