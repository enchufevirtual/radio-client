import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react'
import { useGlobal } from "./useGlobal";
import { clientAxios } from "../config/axios";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { useAuth } from "./useAuth";

export function useLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { messageNotification } = useGlobal();
  const navigate = useNavigate();

  let result = true;
  const { setAuth, authUser } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email === '') {
      messageNotification('email', 'Ingrese un Email');
      result = false;
    }
    if (password === '') {
      messageNotification('password', 'Ingrese un password');
      result = false;
    }
    if (!result) return;
    try {
      const { data } = await  clientAxios.post('/users/login', { email, password });
      localStorage.setItem('token_ev', data.token);
      setAuth(data);
      authUser();
      navigate('/');
    } catch (error) {
      const message = getErrorMessage(error);
      console.clear();
      if (message === 'Esta cuenta no existe') {
        messageNotification('email', message);
      }
      if (message === 'Tu cuenta no ha sido confirmada') {
        messageNotification('email', message);
      }
      if (message === 'Lo siento, la contraseña que ha ingresado no es correcta.') {
        messageNotification('password', message);
      }
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit
  }
}
