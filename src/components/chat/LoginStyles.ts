import styled, { css } from "styled-components";
import { CssStyleButtons, CssButton } from "../../styles/Form/styles";

export const ContainerLogin = styled.div`
  background-color: rgb(33, 38, 45);
  outline: rgb(48, 54, 61) solid 1px;
  box-shadow: 0.08em 0.3em 0.8em 0.13em rgba(0,0,0,.15);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  max-width: 90%;
  height: 260px;
  inset: 0px;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);

  .DraggableLoginChat {
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 60px;
  }
  .LoginChat {
    width: 84%;
  }
  @media (max-width: 480px) {
    width: 80%;
    height: 300px;
  }
  @media (max-width: 310px) {
    height: 280px;
  }
  #alert {
    position: absolute;
    top: 48px;
    font-size: 12px;

    @media (max-width: 480px) {
      top: 62px;
    }
    @media (max-width: 310px) {
      top: 30px;
    }
  }
  label {
    margin-bottom: 24px;

    @media (max-width: 480px) {
     font-size: 22px;
    }
  }
  input {
    margin-bottom: 10px;
    width: 100%;
    @media (max-width: 480px) {
      height: 42px;
      font-size: 16px;
    }
  }
`;
export const ImageClose = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  width: 28px;
  height: 28px;

  &:hover {
    background-color: rgba(255, 255, 255, .1);
  }
`;
export const GroupButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  a {
    text-decoration: none;
    width: fit-content !important;
    ${css`${CssButton}`}

    @media (max-width: 310px) {
      width: 100% !important;
    }
  }

  button {
    ${css`${CssStyleButtons}`}
  }
  @media (max-width: 310px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;
