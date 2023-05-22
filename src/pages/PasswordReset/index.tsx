import React from "react"
import { Title } from "../../components/title"
import { Form } from "../../components/reset/Form"
import { ButtonLink } from "../../components/reset/ButtonLink"
import { PasswordResetStyle } from "./styles"

export const PasswordReset = (): JSX.Element => {
  return (
    <PasswordResetStyle>
      <Title title='Reestablecer contraseña' />
      <Form />
      <ButtonLink />
    </PasswordResetStyle>
  )
}
