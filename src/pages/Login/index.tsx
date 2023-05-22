import React from "react"
import { Title } from "../../components/title"
import { Form } from "../../components/login/Form"
import { ButtonCreateAccount } from "../../components/login/ButtonCreateAccount"
import { LoginStyle } from "./styles"

export const Login = (): JSX.Element => {

  return (
    <LoginStyle>
      <Title title='Inicia Sesión' />
      <Form />
      <ButtonCreateAccount />
    </LoginStyle>
  )
}
