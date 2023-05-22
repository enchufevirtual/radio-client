import React from "react"
import { Title } from "../../components/title"
import { Form } from "../../components/register/Form"
import { ButtonSignIn } from "../../components/register/ButtonSignIn"
import { RegisterStyle } from "./styles"

export const Register = (): JSX.Element => {
  return (
    <RegisterStyle>
      <Title title='Crear Cuenta' />
      <Form />
      <ButtonSignIn />
    </RegisterStyle>
  )
}
