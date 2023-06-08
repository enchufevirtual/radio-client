import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled, { css } from "styled-components";
import { DEFAULT_BLUE, WARNINGS } from "../../styles/constants";

interface AlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  success?: boolean;
}

export const Alert = styled.div<AlertProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6px;
  gap: .5rem;
  color: ${WARNINGS};
  ${({success}) =>
  success &&
  css`
    color: ${DEFAULT_BLUE};
  `
  }
`;
