import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { GroupInput, Input, Label } from '../../styles/Form/styles';
import { ContainerLogin, GroupButtons, ImageClose } from './LoginStyles';
import { useLoginChat } from '../../hooks/useLoginChat';
import { AlertMessage } from '../alert';
import { useGlobal } from '../../hooks/useGlobal';
import Close from '../../public/assets/close.svg';
import { useDraggable } from '../../hooks/useDraggable';
import { CLOSE_LOGIN_CHAT } from '../../../src/context/constants';

export const LoginChat = () => {

  const { email, password, setEmail, setPassword, handleLogin } = useLoginChat();
  const { dispatch } = useGlobal();
  const dragLoginChat = useRef(null);
  useDraggable(dragLoginChat, 'DraggableLoginChat');

  const setCloseLoginChat = () => {
    dispatch({type: CLOSE_LOGIN_CHAT, payload: true})
  }

  return (
    <ContainerLogin ref={dragLoginChat}>
      <ImageClose onClick={setCloseLoginChat} src={Close} alt="Close Login" />
      <div className='DraggableLoginChat'></div>
      <GroupInput className='LoginChat'>
        <Label>Iniciar sesión</Label>
        <AlertMessage data={{id: 'alert'}} />
        <Input
          type="email"
          id='email'
          name='email'
          value={email}
          placeholder="Correo electrónico"
          onChange={e => setEmail(e.target.value)}
        />
         <Input
          type="password"
          id='password'
          name='password'
          value={password}
          placeholder="Contraseña"
          onChange={e => setPassword(e.target.value)}
        />
        <GroupButtons>
          <Link to='/register'>Registrarse</Link>
          <button type='button' onClick={handleLogin}>Acceder</button>
        </GroupButtons>
      </GroupInput>
    </ContainerLogin>
  )
}
