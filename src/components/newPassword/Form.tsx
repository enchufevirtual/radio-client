import React from "react";
import { AlertMessage } from "../alert";
import { useNewPassword } from "../../hooks/useNewPassword";
import {
  GroupInput,
  Input,
  Label,
  Button
} from "../../styles/Form/styles";
import { NewFormStyle } from "./styles";
import { ListTokenConfirm } from "./ListTokenConfirm";
import ListTokenError from "./ListTokenError";
import { ButtonLogin } from "./ButtonLogin";

export const Form = (): JSX.Element => {

  const { handleSubmit, tokenConfirm, success, setPassword, password } = useNewPassword();

  return (
    <>
    <NewFormStyle onSubmit={handleSubmit}  autoComplete="off" >
      <AlertMessage data={{id: 'infoPassword', success: tokenConfirm}} />
      {tokenConfirm ? (
      <>
        <ListTokenConfirm />
        <br />
        <GroupInput >
          <Label htmlFor="password">Nueva Contraseña</Label>
          <Input
            type="password"
            id='newPassword'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <AlertMessage data={{id: 'newPassword', success}} />
        </GroupInput>
        <Button type="submit" disabled={success}> Guardar Contraseña </Button>
      </>
      ):(
        <ListTokenError />
      )}
    </NewFormStyle>
    {success && <ButtonLogin />}
    </>
  )
}
