/* eslint-disable @next/next/no-img-element */
"use client";

import css from "./Casinos.module.css";
import React, { useState } from "react";
import { useCasinosContext } from "../CasinoContext/CasinoContext";
import { Modal } from "../Components/modal/modal";
import Casino from "../Components/Casino/Casino";
import CreateCasino from "../Components/Casino/CreateCasino";

export default function Page() {
  const { casinosDb, charge, setCharge } = useCasinosContext();
  const [open, setOpen] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const [casino, setCasino] = React.useState(null);
  const onClose = () => setOpen(!open);
  const onCloseTwo = () => setOpenTwo(!openTwo);
  const reload = () => setCharge(!charge);
  const openCasino = (casino) => {
    setOpen(!open);
    setCasino(casino);
  };

  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para almacenar la cantidad de casinos por página (en este caso, 6 por página)
  const casinosPerPage = 3;
  // Estado para calcular el índice del último casino en cada página
  const indexOfLastCasino = currentPage * casinosPerPage;
  // Estado para calcular el índice del primer casino en cada página
  const indexOfFirstCasino = indexOfLastCasino - casinosPerPage;
  // Estado para obtener los casinos que se mostrarán en la página actual
  const currentCasinos = casinosDb?.slice(
    indexOfFirstCasino,
    indexOfLastCasino
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(casinosDb?.length / casinosPerPage); i++) {
    pageNumbers.push(i);
  }

  // Función para ir a la página siguiente
  const nextPage = () => {
    if (currentPage < Math.ceil(casinosDb.length / casinosPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Función para ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <main className="jc-sa">
      {open ? (
        <Modal onClose={onClose}>
          <Casino
            id={casino?.id}
            name={casino?.name}
            imageUrl={casino?.imageUrl}
            onClose={onClose}
          />
        </Modal>
      ) : openTwo ? (
        <Modal onClose={onCloseTwo}>
          <CreateCasino onClose={onCloseTwo} Reload={reload} />
        </Modal>
      ) : (
        <div className={css.casinos}>
          <h1>Casinos Redtron</h1>
          <button className="btn-create" onClick={() => setOpenTwo(!openTwo)}>
            <span>+</span>
            CREAR NUEVO CASINO
          </button>
          <div className={css.pagination}>
            <button
              className={css.antpost}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            <p>{currentPage} de {pageNumbers.length}</p>
            {/* {pageNumbers.map((number) => (
              <button key={number} onClick={() => paginate(number)} className={number === currentPage ? css.active : ""}>
                {number}
              </button>
            ))} */}
            <button
              className={css.antpost}
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(casinosDb?.length / casinosPerPage)
              }
            >
               {">>"}
            </button>
          </div>
          <div className={css.tri}>
            {currentCasinos?.map((e) => (
              <div key={e.id} onClick={() => openCasino(e)}>
                <img src={e.imageUrl} alt="casino" width={150} height={150} />
                <h3>{e.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
