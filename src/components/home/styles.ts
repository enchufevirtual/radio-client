import { BORDER, DEFAULT_NAV_COLOR } from "../../styles/constants";
import styled from "styled-components";

export const ContainerHero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1c1c;

  img {
    width: 100%;
    object-fit: cover;
    height: 100vh;
    border-radius: 6px;
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.7);
    outline: 1px solid ${BORDER};
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export const ContainerDescription = styled.div`
  background-color: rgba(33, 38, 45, .9);
  outline: 1px solid ${BORDER};
  user-select: none;
  padding: 2rem;
  width: 100%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  z-index: 7;
  gap: 1rem;

  h2 {
    font-family: 'Poppins';
    font-size: 32px;
    word-spacing: 4px;
  }
`;
