import React from "react";
import { useGlobal } from "../../hooks/useGlobal";
import {
  FormStyles,
  GroupInput,
  Input,
  Label,
  Button
} from "../../styles/Form/styles";
import { AlertMessage } from "../alert";

export const Form = (): JSX.Element => {

  const { check, username, success, email, password, repeatPassword } = useGlobal();
  const { onSubmit, onChange, handleFile } = check;

  return (
    <FormStyles onSubmit={e => onSubmit(e)} autoComplete="off" encType='multipart/form-data'>
      <AlertMessage data={{id: 'send', success: success}} />
      <GroupInput>
        <Label htmlFor="username">Username</Label>
        <Input type="text" id='username' name='username' value={username} onChange={onChange} />
        <AlertMessage data={{id: 'username'}} />
      </GroupInput>
      <GroupInput >
        <Label htmlFor="email">Email</Label>
        <Input type="email" id='email' name='email' value={email} onChange={onChange} />
        <AlertMessage data={{id: 'email'}} />
      </GroupInput>
      <GroupInput>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          type="password"
          id='password'
          name='password'
          value={password}
          onChange={onChange}
        />
        <AlertMessage data={{id: 'password'}} />
      </GroupInput>
      <GroupInput>
        <Label htmlFor="repeatPassword">Repetir Contraseña</Label>
        <Input
          type="password"
          id='repeatPassword'
          name='repeatPassword'
          value={repeatPassword}
          onChange={onChange}
        />
        <AlertMessage data={{id: 'repeatPassword'}} />
      </GroupInput>
      <GroupInput>
        <Label>Imagen de Perfil</Label>
        <Input
          type="file"
          id='image'
          name='image'
          accept="image/png, image/gif, image/jpeg, image/jpg"
          onChange={handleFile}
        />
        <AlertMessage data={{id: 'image'}} />
      </GroupInput>
      <Button aria-label="Registrar" type="submit">Registrar</Button>
    </FormStyles>
  )
}
