import React from "react"
import { ButtonContainer } from "./styles"
import { Link } from "react-router-dom"

export const ButtonLink = (): JSX.Element => {
  return (
    <ButtonContainer className="Login-create-account">
      <p>Ya tienes una cuenta? <Link to="/login">Inicia Sesión.</Link></p>
      <p>No tienes una cuenta? <Link to="/register">Crea una cuenta.</Link></p>
    </ButtonContainer>
  )
}
