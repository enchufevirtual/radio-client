import React from "react";
import { Link } from "react-router-dom";
import {
  FormStyles,
  GroupInput,
  Input,
  Label,
  Button
} from "../../styles/Form/styles";
import { ContainerLabel } from "./styles";
import { AlertMessage } from "../alert";
import { useLogin } from "../../hooks/useLogin";

export const Form = (): JSX.Element => {

  const { email, password, setEmail, setPassword, handleSubmit } = useLogin();

  return (
    <FormStyles onSubmit={handleSubmit} autoComplete="off" >
      <AlertMessage data={{id: 'send'}} />
      <GroupInput >
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <AlertMessage data={{id: 'email'}} />
      </GroupInput>
      <GroupInput>
        <ContainerLabel>
          <Label htmlFor="password">Contraseña</Label>
          <Link to="/password-reset">Olvidaste tu contraseña?</Link>
        </ContainerLabel>
        <Input
          type="password"
          id='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <AlertMessage data={{id: 'password'}} />
      </GroupInput>
      <Button aria-label="Ingresar" type="submit"> Ingresar </Button>
    </FormStyles>
  )
}
