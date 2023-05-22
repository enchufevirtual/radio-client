import React from "react";
import { Link } from "react-router-dom";
import { AlertMessage } from "../../components/alert";
import { InfoContainer } from "./styles";
import { useConfirmAccount } from "../../hooks/useConfirmAccount";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";

export const ConfirmAccount = (): JSX.Element => {

  const { success } = useConfirmAccount();

  return (
    <InfoContainer>
      <AlertMessage data={{id: 'send', success: success}} />
      <br />
      { !success ? <ErrorMessage /> :  <SuccessMessage /> }
    </InfoContainer>
  )
}
