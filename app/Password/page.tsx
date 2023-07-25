
import React from 'react'


export default function page() {

  return (
    <main>
        <h2>Restablecer Nueva Contraseña</h2>
        <input type="password" placeholder='Contraseña Anterior' />
        <input type="password" placeholder='Nueva Contraseña' />
        <input type="password" placeholder='Repetir Contraseña' />
        <button>Enviar</button>
        <a href={"/"}>volver</a>
    </main>
  )
}
