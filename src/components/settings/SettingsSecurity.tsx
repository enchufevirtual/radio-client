import React from 'react'
import {
  ContainerInputs,
  SettingsInput,
  SettingsButton,
  ContainerSettings,
  Form,
  Title
} from './styles';
import { GroupInput, Label } from '../../styles/Form/styles';
import { AlertMessage } from '../alert';
import { useUpdatePassword } from '../../hooks/useUpdatePassword';

export const SettingsSecurity = (): JSX.Element => {

  const { handleChange, handleSubmit, password } = useUpdatePassword();

  return (
    <ContainerSettings>
      <Title>Cambiar Contraseña</Title>
      <Form onSubmit={handleSubmit} autoComplete='off' encType='multipart/form-data'>
        <ContainerInputs>
          <div className="containerForm">
            <GroupInput>
              <Label htmlFor="password">Contraseña Anterior</Label>
              <SettingsInput
                type="password"
                id='password'
                name='password'
                value={password.password}
                onChange={handleChange}
              />
              <AlertMessage data={{id: 'password'}} />
            </GroupInput>
            <GroupInput>
              <Label htmlFor="new_password">Nueva Contraseña</Label>
              <SettingsInput
                type="password"
                id='new_password'
                name='new_password'
                value={password.new_password}
                onChange={handleChange}
              />
              <AlertMessage data={{id: 'new_password'}} />
            </GroupInput>
            <GroupInput>
              <Label htmlFor="repeat_new_password">Repetir Nueva Contraseña</Label>
              <SettingsInput
                type="password"
                id='repeat_new_password'
                name='repeat_new_password'
                value={password.repeat_new_password}
                onChange={handleChange}
              />
              <AlertMessage data={{id: 'repeat_new_password'}} />
            </GroupInput>
          </div>
        </ContainerInputs>
        <SettingsButton aria-label='update password' type='submit'>Actualizar Contraseña</SettingsButton>
        <AlertMessage data={{id: 'send'}} />
      </Form>
    </ContainerSettings>
  )
}
