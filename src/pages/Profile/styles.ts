import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { COLOR_CONTAINER } from "../../styles/constants";
import { CssButton } from "../../styles/Form/styles";

const skeletonLoading = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(240px);
  }
`;

export const ContainerProfile = styled.div<{ hasTopMargin?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: ${({ hasTopMargin }) => (hasTopMargin ?? true ? '70px' : '0')};
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
  margin-top: 70px;
  gap: 1rem;
  @media (max-width: 991px) {
    width: 500px;
  }
`;
export const ContainerPostProfile= styled.div`
  display: flex;
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

export const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${COLOR_CONTAINER};
  border-radius: 10px;
  margin-top: -70px;
  padding: 1rem;
  width: 100%;
  min-height: 140px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -150px;
    width: 120px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    animation: ${skeletonLoading} 1.2s infinite;
  }
`;
export const SkeletonNoMarginCard = styled(SkeletonCard)`
  margin-top: 0 !important;
`;

export const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SkeletonCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.08);
`;

export const SkeletonLine = styled.div<{ width?: string; height?: string; }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '14px'};
  background-color: rgba(255,255,255,0.08);
  border-radius: 6px;
`;
