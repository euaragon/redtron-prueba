"use client";
import Image from "next/image";
import Logo from "/app/assets/logo.png";
import React, { useEffect } from "react";
import { useUserContext } from "./UserContext/UserContext";
import { useRouter } from "next/navigation";
import {AiOutlineEye} from 'react-icons/ai'

export default function Home() {
  const router = useRouter();
  const [input, setInput] = React.useState({
    username: "",
    password: "",
  });
  const { userDb, setUserDB } = useUserContext();
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    userDb.role === "ADMIN" ? router.push("/Admin") : null;
  }, [userDb]);

  const handlerInputChange = ({ target: { name, value } }) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const adminLogin = async (input) => {
    const userDb = await fetch("https://redtronapi-development.up.railway.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((response) => {
        let user = {
          id: response?.data.id,
          username: response?.data.username,
          role: response?.data.role,
          phone: response?.data.phone,
          email: response?.data.email,
          token: response?.data.token,
        };
        return user;
      });
    setUserDB(userDb);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    adminLogin(input);
  };

  return (
    <main>
      <Image src={Logo} alt="REDTRON Logo" width={191} height={182} priority />
      <h2>BIENVENIDO!</h2>
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="username"
          value={input.username}
          onChange={handlerInputChange}
          required
        />
        <input
          type={showPassword ? "text" : "password"} // Cambia el tipo del input
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={handlerInputChange}
          required
        />
        <AiOutlineEye className="eye" onClick={toggleShowPassword}/>
        
       
        <button type="submit">ENTRAR</button>
      </form>
    </main>
  );
<<<<<<< HEAD
}
=======
}

>>>>>>> 99630665d0ed1c28119e8113e021968109d75075
