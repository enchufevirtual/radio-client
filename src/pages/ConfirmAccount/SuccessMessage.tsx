import React from 'react'
import { Link } from 'react-router-dom'

export const SuccessMessage = () => {
  return (
    <>
      <p>¡Felicidades! Su cuenta ha sido confirmada satisfactoriamente. Ahora puede acceder a todas las funciones de nuestra plataforma y disfrutar de una experiencia completa.</p>
      <br />
      <hr style={{outline: 'rgb(48, 54, 61) solid 1px', width: '100%'}}/>
      <br />
      <Link to="/login">Inicia Sesión</Link>
    </>
  )
}
