import React from 'react'
import { Link } from 'react-router-dom'

export const ErrorMessage = () => {
  return (
    <>
      <p>El enlace que has seguido es inválido o ya ha sido utilizado. Por favor, asegúrate de utilizar el enlace de confirmación correcto o solicita un nuevo enlace de confirmación.</p>
      <br />
      <hr style={{outline: 'rgb(48, 54, 61) solid 1px', width: '100%'}}/>
      <br />
      <p>Aún no tienes una cuenta?.</p>
      <Link to="/register">Crea una nueva cuenta</Link>
    </>
  )
}
