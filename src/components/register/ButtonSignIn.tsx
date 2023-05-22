import React from "react";
import { Link } from "react-router-dom";
import { QuestionContainer } from "../../styles/Form/styles";

export const ButtonSignIn = (): JSX.Element => {
  return (
    <QuestionContainer className="Login-create-account">
      <p>Ya tienes una cuenta? <Link to="/login">Inicia Sesión.</Link></p>
    </QuestionContainer>
  )
}
