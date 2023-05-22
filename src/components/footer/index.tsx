import React from 'react';
import { FooterStyle } from './styles';

export const Footer = (): JSX.Element => {
  return (
    <FooterStyle>
      <p>Todos los derechos Reservados - Enchufe Virtual</p>
      <p>Desarrollado por <a href="https://chendo.dev" target='_blank'>@chendodev</a></p>
    </FooterStyle>
  )
}
