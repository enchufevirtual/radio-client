import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clientAxios } from "../config/axios";
import { useGlobal } from "./useGlobal";
import { getErrorMessage } from "../helpers/getErrorMessage";

export function useConfirmAccount() {

  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { messageNotification } = useGlobal();
  const { id } = useParams();

  async function confirmAccount() {
    setLoading(true);

    try {
      const { data } = await clientAxios(`/users/confirm/${id}`);
      messageNotification('send', data.message);
      setSuccess(true);
    } catch (error) {
      const message = getErrorMessage(error);
      console.clear();
      messageNotification('send', message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    confirmAccount();
  }, [id]);

  return {
    success,
    loading
  }
}
