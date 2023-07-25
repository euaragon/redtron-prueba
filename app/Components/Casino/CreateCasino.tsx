import React, { useState } from "react";
import { useUserContext } from "../../UserContext/UserContext";
import swal from "sweetalert";
import css from "./CreateCasino.module.css";

const CreateCasino = ({ onClose, Reload }) => {
  const { userDb } = useUserContext();
  const tokenId = userDb?.token;

  const [input, setInput] = useState({
    name: "",
    image_url: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image_url: "",
  });

  const postCasino = async (obj, token) => {
    try {
      const response = await fetch("https://redtronapi-development.up.railway.app/casino", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        throw new Error("Error al crear el casino.");
      }

      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const validateForm = () => {
    let hasErrors = false;
    const newErrors = {
      name: "",
      image_url: "",
    };

    if (!input.name) {
      newErrors.name = "Debe ingresar un nombre de casino.";
      hasErrors = true;
    }

    if (!input.image_url) {
      newErrors.image_url = "Debe ingresar una URL de imagen.";
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await postCasino(input, tokenId);

        // setInput({
        //   name: "",
        //   image_url: "",
        // });

        onClose();
        Reload();

        swal({
          title: "Casino creado correctamente!",
          icon: "success",
        });
      } catch (error) {
        swal({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <form className={css.formulario} onSubmit={handlerSubmit}>
        <h2>Crear Casino</h2>
        <div className={css.formGroup}>
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Nombre del Casino"
            onChange={handlerInputChange}
          />
          {errors.name && <p className={css.errorMsg}>{errors.name}</p>}
        </div>
        <div className={css.formGroup}>
          <input
            type="text"
            name="image_url"
            value={input.image_url}
            placeholder="URL de imagen"
            onChange={handlerInputChange}
          />
          {errors.image_url && <p className={css.errorMsg}>{errors.image_url}</p>}
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateCasino;
