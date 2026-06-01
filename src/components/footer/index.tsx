import React from 'react';
import { FooterStyle } from './styles';

export const Footer = (): JSX.Element => {
  return (
    <FooterStyle>
      <p>Todos los derechos Reservados - Enchufe Virtual</p>
      <p>Desarrollado por <a href="https://soychendo.com" target='_blank'>@soychendo</a></p>
    </FooterStyle>
  )
}
