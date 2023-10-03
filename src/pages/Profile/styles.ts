import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { COLOR_CONTAINER } from "../../styles/constants";
import { CssButton } from "../../styles/Form/styles";

export const ContainerProfile = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 70px;
  width: 900px;
  max-width: 100%;
  gap: 14px;

  @media (max-width: 991px) {
    grid-template-columns: 100%;
    place-items: center;
    place-content: center;
    gap: 2rem
  }
`;
export const ContainerInfoProfile= styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 1rem;
  @media (max-width: 991px) {
    width: 500px;
  }
`;
export const ContainerPostProfile= styled.div`
  display: flex;
  margin-top: -70px;
  align-self: flex-start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;


export const ContainerImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR_CONTAINER};
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
