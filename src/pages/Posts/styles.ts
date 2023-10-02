import { DEFAULT_NAV_COLOR, DEFAULT_BLUE, DEFAULT_COLOR, DEFAULT_BG_COLOR } from "../../../src/styles/constants";
import styled from "styled-components";

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
