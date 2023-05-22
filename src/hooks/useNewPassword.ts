import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { clientAxios } from "../config/axios";
import { useGlobal } from "./useGlobal";

export function useNewPassword() {

  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenConfirm, setTokenConfirm] = useState(false);
  const { token } = useParams();
  const { messageNotification } = useGlobal();

  useEffect(() => {
    async function checkToken() {
      try {
        await clientAxios(`/users/identify/${token}`);
        messageNotification('infoPassword', 'Algunas sugerencias');
        setTokenConfirm(true);
      } catch (error) {
        messageNotification('infoPassword', 'Hubo un error con el enlace')
        setTokenConfirm(false);
      }
    }

    checkToken();
  }, [token]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length < 6) {
      messageNotification('newPassword', 'La contraseña debe ser mínimo de 6 caracteres.')
      setSuccess(false);
      return;
    }
    try {
      const { data } = await clientAxios.post(`/users/identify/${token}`, {password});
      messageNotification('newPassword', data.message);
      setSuccess(true);
    } catch (error) {
      console.clear();
      messageNotification('newPassword', 'Hubo un error al guardar el password');
      setSuccess(false);
    } finally {
      setPassword('');
    }
  }

  return {
    handleSubmit,
    tokenConfirm,
    setPassword,
    password,
    success
  }
}
