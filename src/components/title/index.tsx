import React from "react";
import { TitleStyle } from "../../styles/Form/styles";

export const Title = ({title}): JSX.Element => {
  return (
    <TitleStyle>
      <h1>{title}</h1>
    </TitleStyle>
  )
}
