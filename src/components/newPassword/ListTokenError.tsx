import React from 'react'

const ListTokenError = (): JSX.Element => {
  return (
    <ol>
      <li>Lamentablemente, ha habido un error con el enlace que se proporcionó para cambiar su contraseña.</li>
      <br />
      <li>Este enlace no es válido y no se puede utilizar para restablecer su contraseña.</li>
      <br />
      <li>Le recomendamos que se ponga en contacto con nuestro equipo de soporte para obtener ayuda adicional en la recuperación de su cuenta y el restablecimiento de su contraseña.</li>
    </ol>
  )
}

export default ListTokenError
