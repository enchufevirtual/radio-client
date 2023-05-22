import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clientAxios } from "../config/axios";
import { useGlobal } from "./useGlobal";
import { ErrorResponse } from "types/types";

export function useConfirmAccount() {

  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false)
  const { messageNotification } = useGlobal();
  const { id } = useParams();

  async function confirmAccount() {
    try {
      const { data } = await clientAxios(`/users/confirm/${id}`);
      messageNotification('send', data.message);
      setSuccess(true);
    } catch (error) {
      const { message } = (error as ErrorResponse).response.data;
      console.clear();
      messageNotification('send', message);
      setSuccess(false);
    }
  }

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return
    }
    confirmAccount();
  }, [id, mounted])

  return {
    success
  }
}
