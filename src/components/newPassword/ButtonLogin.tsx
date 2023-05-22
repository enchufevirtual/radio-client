import React from 'react'
import { QuestionContainer } from "../../styles/Form/styles"
import { Link } from "react-router-dom"

export const ButtonLogin = () => {
  return (
    <QuestionContainer>
      <p>Inicia Sesión <Link to="/login">Inicia Sesión.</Link></p>
    </QuestionContainer>
  )
}
