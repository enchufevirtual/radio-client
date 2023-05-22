import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { DEFAULT_BLUE } from "../../styles/constants";
import { Flex } from "../../styles/Form/styles";

export const LogoContainer = styled(Link)`
  ${css`${Flex}`}
  text-decoration: none;
  gap: 8px;
  margin: 1rem;
  cursor: pointer;
  span {
    color: ${DEFAULT_BLUE};
  }
`;

export const SvgStyle = styled.svg`
  width: 50px;
  height: 50px;
`;
