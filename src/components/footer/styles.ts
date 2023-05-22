import styled from "styled-components";
import { DEFAULT_BLUE } from "../../styles/constants";

export const FooterStyle = styled.footer`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin-top: auto;
  text-align: center;
  width: 90%;
  margin-top: 2rem;
  z-index: -1;
  ::before {
    content: '';
    position: absolute;
    width: 100%;
    top: 10px;
    border-bottom: 1px solid rgb(48, 54, 61);
  }
  a {
    text-decoration: none;
    color: ${DEFAULT_BLUE};
  }
`;
