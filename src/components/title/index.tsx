import React from "react";
import { TitleStyle } from "../../styles/Form/styles";

type TitleType = { title: string }

export const Title = ({title}: TitleType): JSX.Element => {
  return (
    <TitleStyle>
      <h1>{title}</h1>
    </TitleStyle>
  )
}
