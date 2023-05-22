import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { DEFAULT_NAV_COLOR } from "../../styles/constants";
import { CssButton } from "../../styles/Form/styles";

export const ContainerProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 90%;
  max-width: 500px;
  margin-top: 70px;
`;

export const ContainerImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${DEFAULT_NAV_COLOR};
  outline: rgb(48, 54, 61) solid 1px;
  border-radius: 6px;
  padding: 1rem;
  gap: 10px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    outline: rgb(48, 54, 61) solid 2px;
  }
`;

export const ContainerName = styled(ContainerImage)`
  flex-direction: row;
  outline: none;
  padding: 0;
  gap: 10px;
`;

export const ContainerAbout = styled(ContainerImage)`
  align-items: flex-start;
  gap: 10px;
`;

export const ContainerSocial = styled(ContainerImage)`
  flex-direction: row;
  justify-content: flex-start;

`;

export const AccountCreationDate = styled(ContainerImage)`

`;

export const ButtonEditProfile = styled(Link)`
  ${css`${CssButton}`}
  text-decoration: none;
  width: fit-content;
`;
