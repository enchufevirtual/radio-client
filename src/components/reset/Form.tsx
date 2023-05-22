import React from "react";
import { AlertMessage } from "../alert";
import { useResetPassword } from "../../hooks/useResetPassword";
import {
  FormStyles,
  GroupInput,
  Input,
  Label,
  Button
} from "../../styles/Form/styles";

export const Form = (): JSX.Element => {

  const { email, handleSubmit, success, setEmail } = useResetPassword();

  return (
    <FormStyles onSubmit={handleSubmit} autoComplete="off" >
      <p>Ingresa tu correo electrónico asociado a tu cuenta para recibir asistencia con tu contraseña.</p>
      <br />
      <GroupInput >
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id='resetPassword'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <AlertMessage data={{id: 'resetPassword', success}} />
      </GroupInput>
      <Button type="submit"> Enviar Intrucciones </Button>
    </FormStyles>
  )
}
