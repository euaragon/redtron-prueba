'use client'
import React from 'react'
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
  return (
    <main>
        <h2>CREAR NUEVO USUARIO</h2>
        <input type="text" placeholder='nombre' />
        <input type="email" placeholder='email' />
        <input type="text" placeholder='porcentaje asignado' />
        <input type="text" placeholder='activo o inactivo?' />
        <button>CREAR</button>
        <a onClick={()=> router.push('/Admin')}>volver</a>
    </main>
  )
}

export default Page;