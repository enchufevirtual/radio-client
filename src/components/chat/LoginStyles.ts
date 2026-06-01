import styled, { css } from "styled-components";
import { CssStyleButtons, CssButton } from "../../styles/Form/styles";

export const ContainerLogin = styled.div`
  background-color: rgb(33, 38, 45);
  outline: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  border-radius: 0.375em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  max-width: 90%;
  height: 200px;
  inset: 0px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  padding: 0;

  .DraggableLoginChat {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 24px;
    cursor: grab;
  }
  .LoginChat {
    width: 92%;
    margin-bottom: 0 !important;
  }
  @media (max-width: 480px) {
    width: 92%;
    height: 240px;
  }
  @media (max-width: 310px) {
    height: 250px;
  }
  #alert {
    position: absolute;
    top: 1px;
    font-size: 12px;
    color: #ff8a8a;
    width: 100%;
    text-align: center;

    @media (max-width: 480px) {
      top: 58px;
    }
    @media (max-width: 310px) {
      top: 45px;
    }
  }
  label {
    margin-bottom: 12px;
    font-size: 18px;
    letter-spacing: 0.02em;
    color: #f8f9fb;

    @media (max-width: 480px) {
     font-size: 18px;
    }
  }
  input {
    margin-bottom: 10px;
    width: 100%;
    font-size: 14px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
    border-radius: 0.375em;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: rgba(29, 147, 255, 0.75);
      outline: none;
    }

    @media (max-width: 480px) {
      height: 40px;
      font-size: 15px;
    }
  }
`;
export const ImageClose = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  margin: 6px;
  width: 28px;
  height: 28px;
  background: rgba(83, 83, 95, 0.38);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: rgba(255, 255, 255, .1);
  }
`;
export const GroupButtons = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;

  a {
    text-decoration: none;
    font-size: 13px;
    padding: 5px !important;
    width: 80px;
    text-align: center;
    border-radius: 0.375em;
    background: rgba(255,255,255,0.08);
    color: #fff;

    &:hover {
      background: rgba(255,255,255,0.14);
    }
  }

  button {
    width: 40%;
    height: 100% !important;
    font-size: 13px;
    border-radius: 0.375em;
  }

  @media (max-width: 310px) {
    flex-direction: column;

    a,
    button {
      width: 100%;
    }
  }
`;
