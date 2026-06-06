import { useLoginForm } from "./useLoginForm";
import { useSocket } from "./useSocket";
import { useAuth } from "./useAuth";

export function useLoginChat() {
  const { setAllowed } = useSocket();
  const { authUser } = useAuth();

  const { loginValue, password, setLoginValue, setPassword, handleLogin } = useLoginForm({
    alertFieldId: 'alert',
    onSuccess: () => {
      setAllowed(true);
      authUser();
    },
  });

  return {
    loginValue,
    password,
    setLoginValue,
    setPassword,
    handleLogin,
  };
}
