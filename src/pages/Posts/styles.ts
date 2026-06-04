import { DEFAULT_NAV_COLOR, DEFAULT_BLUE, DEFAULT_COLOR, DEFAULT_BG_COLOR } from "../../../src/styles/constants";
import styled, { keyframes } from "styled-components";

const skeletonLoading = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(240px);
  }
`;

export const ContainerPosts = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 500px;
  max-width: 100%;
  margin-top: 70px;
  position: relative;

`;

export const ParagraphLogin = styled.p`
  background-color: ${DEFAULT_NAV_COLOR};
  outline: rgb(48, 54, 61) solid 1px;
  border-radius: 6px;
  text-align: center;
  padding: 1rem;

  a {
    margin-right: 1rem;
    color: rgb(47, 129, 247);
  }

`;

export const CardPost = styled.div`
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

export const ButtonNextPrev = styled.button`
  background-color: ${DEFAULT_BLUE};
  border: none;
  color: black;
  padding: .5rem 1.4rem;
  border-radius: 6px;
  width: min-content;
  display: inline !important;
  cursor: pointer;
  align-self: center;
`;

export const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${DEFAULT_NAV_COLOR};
  border-radius: 10px;
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
