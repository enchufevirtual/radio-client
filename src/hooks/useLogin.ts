import { useLoginForm } from "./useLoginForm";

export function useLogin() {
  const { loginValue, password, setLoginValue, setPassword, handleLogin } = useLoginForm({
    loginFieldId: 'email',
    passwordFieldId: 'password',
    redirectTo: '/',
  });

  return {
    email: loginValue,
    password,
    setEmail: setLoginValue,
    setPassword,
    handleSubmit: handleLogin,
  };
}
