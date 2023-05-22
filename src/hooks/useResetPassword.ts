import { useState } from "react";
import type { FormEvent } from 'react';
import { useGlobal } from "./useGlobal";
import { ErrorResponse } from "types/types";
import { clientAxios } from "../config/axios";

export function useResetPassword() {

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const { messageNotification } = useGlobal();

  async function handleSubmit(e: FormEvent<HTMLFormElement> ) {

    e.preventDefault();

    if (email === '') {
      setSuccess(false);
      messageNotification('resetPassword', 'Agrega un email');
      return;
    }
    try {
      const { data } = await clientAxios.post('/users/identify', {email});
      messageNotification('resetPassword', data.message);
      setSuccess(true);
      setEmail('');
    } catch (error) {
      const { message } = (error as ErrorResponse).response.data;
      console.clear();
      setSuccess(false);
      messageNotification('resetPassword', message);
    }
  }

  return {
    email,
    setEmail,
    handleSubmit,
    success
  }

}
