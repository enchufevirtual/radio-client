import React from "react"
import { QuestionContainer } from "../../styles/Form/styles"
import { Link } from "react-router-dom"

export const ButtonCreateAccount = (): JSX.Element => {
  return (
    <QuestionContainer className="Login-create-account">
      <p>No tienes una cuenta? <Link to="/register">Crea una cuenta.</Link></p>
    </QuestionContainer>
  )
}
