import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { DEFAULT_BLUE, NAV_COLOR } from "../../styles/constants";
import { CssButton, Flex, CssStyleButtons } from "../../styles/Form/styles";

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  background-color: rgba(33, 38, 45);
  outline: rgb(48, 54, 61) solid 1px;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 24px;
  z-index: 9;
`;

export const ContainerLogoNav = styled.div`
  text-decoration: none;
  cursor: pointer;
  .Logo {
    margin: 0;
  }
  svg {
    width: 30px;
    height: 30px;
  }
  span {
    color: #fff;
  }
`;

export const ContainerStyle = styled.div`
  ${css`${Flex}`}
  gap: .5rem;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: opacity .2s ease-in-out;
    &:hover {
      opacity: .7;
    }
  }
`;
export const ContainerButtonStyle = styled.div`
   ${css`${Flex}`}
`;
export const LinkLoginButton = styled(Link)`
  ${css`${CssStyleButtons}`}
  ${css`${Flex}`}
  gap: 0;
  text-decoration: none;
`;

export const LinkRegisterButton = styled(Link)`
  ${css`${CssButton}`}
  ${css`${Flex}`}
  gap: 0;
  text-decoration: none;
  color: #333;
`;

export const NavStyle = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${NAV_COLOR};
  width: 150px;
  height: auto;
  outline: rgb(48, 54, 61) solid 1px;
  position: absolute;
  top: 44px;
  right: 14px;
  border-radius: 6px;
  padding: 10px 0;
  box-shadow: 0 2px 8px #000;
  z-index: 10;

  ::before {
    content: "";
    position: absolute;
    top: -10px;
    right: 10px;
    border-width: 0 11px 11px 11px;
    border-style: solid;
    border-color: transparent transparent #21262d transparent;
  }
  ::after {
    content: "";
    position: absolute;
    top: -11px;
    right: 11px;
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent #30363d transparent;
    z-index: -1;
  }

  a, button {
    text-decoration: none;
    color: #e6edf3;
    padding: 3px 20px;
    width: 100%;
    font-size: 14px;
    &:hover {
      background-color: ${DEFAULT_BLUE};
      color: #000;
    }
  }

  button {
    margin-top: 20px;
    background-color: transparent;
    text-align: start;
    position: relative;
    padding: 6px 20px;
    cursor: pointer;
    ::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 0;
      right: 0;
      width: 100%;
      border-top: rgb(48, 54, 61) solid 1px;
    }
  }
`;
