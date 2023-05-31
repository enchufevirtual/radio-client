import { useEffect, useState } from "react";
import { useGlobal } from "./useGlobal";
import { clientAxios } from "../config/axios";
import { ErrorResponse } from "types/types";
import { useAuth } from "./useAuth";
import { useSocket } from "./useSocket";

export function useLoginChat() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { messageNotification } = useGlobal();
  const { setAllowed } = useSocket();

  const { setAuth, authUser } = useAuth();

  useEffect(() => {
    messageNotification('alert', '');
  }, [email, password]);

  async function handleLogin() {

    if (!email.trim()) {
      return messageNotification('alert', 'Ingrese su correo');
    } else if (!isEmail(email)) {
      return messageNotification('alert', 'Use un correo válido');
    }
    if (password === '') {
      return messageNotification('alert', 'Ingrese su password');
    }
    function isEmail(email: string): boolean {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
    }

    try {
      const { data } = await  clientAxios.post('/users/login', { email, password });
      localStorage.setItem('token_ev', data.token);
      setAuth(data);
      setAllowed(true);
      authUser();
    } catch (error) {
      const { message } = (error as ErrorResponse).response.data;
      console.clear();
      if (message == 'Esta cuenta no existe') {
        messageNotification('alert', message);
      }
      if (message == 'Tu cuenta no ha sido confirmada') {
        messageNotification('alert', message);
      }
      if (message == 'Lo siento, la contraseña que ha ingresado no es correcta.') {
        messageNotification('alert', 'Contraseña incorrecta');
      }
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin
  }
}
