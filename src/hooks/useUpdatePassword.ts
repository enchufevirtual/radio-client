import { useState } from "react";
import type { ChangeEvent, FormEvent } from 'react';
import { useGlobal } from "./useGlobal";
import { useAuth } from "./useAuth";


export function useUpdatePassword() {

  const initialState = {
    password: '',
    new_password: '',
    repeat_new_password: ''
  }

  const [password, setPassword] = useState(initialState);

  const { messageNotification } = useGlobal();
  const { updateUserPassword } = useAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();

    if (Object.values(password).some(field => field === '')) {
      messageNotification('send', 'Los campos no pueden ir vacíos');
      return;
    }
    if (password.new_password.length < 6) {
      messageNotification('new_password', 'La contraseña es muy corta, agrega mínimo 6 caracteres');
      return;
    }
    if (password.new_password !== password.repeat_new_password) {
      messageNotification('repeat_new_password', 'Las contraseñas no son iguales');
      return;
    }

    updateUserPassword({password: password.password, new_password: password.new_password})

  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setPassword({
      ...password,
      [name]: value
    })
  }

  return {
    handleSubmit,
    handleChange,
    password
  }
}
