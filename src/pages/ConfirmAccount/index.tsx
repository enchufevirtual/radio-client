import React from "react";
import { Link } from "react-router-dom";
import { AlertMessage } from "../../components/alert";
import { InfoContainer } from "./styles";
import { useConfirmAccount } from "../../hooks/useConfirmAccount";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";

export const ConfirmAccount = (): JSX.Element => {

  const { success, loading } = useConfirmAccount();

  return (
    <InfoContainer>
      <AlertMessage data={{ id: 'send', success: success ?? undefined }} />
      <br />
      {loading ? (
        <p>Verificando enlace...</p>
      ) : success ? (
        <SuccessMessage />
      ) : (
        <ErrorMessage />
      )}
    </InfoContainer>
  )
}
