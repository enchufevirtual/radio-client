import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { CssButton } from "../../styles/Form/styles";

export const ContainerNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  min-height: calc(100vh - 50px);
  margin: 0 auto;
  padding-top: 60px;
`;

export const ButtonHome = styled(Link)`
  ${css`${CssButton}`}
  text-decoration: none;
  width: fit-content;
`;
