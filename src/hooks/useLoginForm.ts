import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useGlobal } from "./useGlobal";
import { useAuth } from "./useAuth";
import { clientAxios } from "../config/axios";
import { getErrorMessage } from "../helpers/getErrorMessage";

type UseLoginFormOptions = {
  loginFieldId?: string;
  passwordFieldId?: string;
  alertFieldId?: string;
  redirectTo?: string;
  onSuccess?: (data: any) => void;
};

export function useLoginForm(options: UseLoginFormOptions = {}) {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const { messageNotification } = useGlobal();
  const { setAuth, authUser } = useAuth();
  const navigate = useNavigate();

  const loginFieldId = options.loginFieldId ?? 'login';
  const passwordFieldId = options.passwordFieldId ?? 'password';
  const alertFieldId = options.alertFieldId;

  useEffect(() => {
    if (alertFieldId) {
      messageNotification(alertFieldId, '');
    }
  }, [loginValue, password, alertFieldId, messageNotification]);

  function isEmail(value: string): boolean {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i.test(value);
  }

  const notify = (message: string, field?: string) => {
    if (!field) return;
    messageNotification(field, message);
  };

  const handleLogin = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    const trimmedLogin = loginValue.trim();
    if (!trimmedLogin) {
      notify('Ingrese su usuario o correo', alertFieldId ?? loginFieldId);
      return;
    }

    if (trimmedLogin.includes('@') && !isEmail(trimmedLogin)) {
      notify('Use un correo válido', alertFieldId ?? loginFieldId);
      return;
    }

    if (!password) {
      notify('Ingrese su contraseña', alertFieldId ?? passwordFieldId);
      return;
    }

    const payload: Record<string, string> = { password };
    if (trimmedLogin.includes('@')) {
      payload.email = trimmedLogin;
    } else {
      payload.username = trimmedLogin;
    }

    try {
      const { data } = await clientAxios.post('/users/login', payload);
      localStorage.setItem('token_ev', data.token);
      setAuth(data);

      if (options.onSuccess) {
        options.onSuccess(data);
      } else {
        authUser();
        if (options.redirectTo) {
          navigate(options.redirectTo);
        }
      }
    } catch (error) {
      const message = getErrorMessage(error);
      console.clear();
      if (message === 'Esta cuenta no existe') {
        notify(message, alertFieldId ?? loginFieldId);
        return;
      }
      if (message === 'Tu cuenta no ha sido confirmada') {
        notify(message, alertFieldId ?? loginFieldId);
        return;
      }
      if (message === 'Lo siento, la contraseña que ha ingresado no es correcta.') {
        notify('Contraseña incorrecta', alertFieldId ?? passwordFieldId);
        return;
      }
      notify(message, alertFieldId ?? alertFieldId ?? loginFieldId);
    }
  };

  return {
    loginValue,
    password,
    setLoginValue,
    setPassword,
    handleLogin,
  };
}
