import React from "react";
import { Title } from "../../components/title";
import { Form } from "../../components/newPassword/Form";
import { NewPasswordStyle } from "./styles";

export const NewPassword = (): JSX.Element => {

  return (
    <NewPasswordStyle>
      <Title title='Nueva Contraseña' />
      <Form />
    </NewPasswordStyle>
  )
}
