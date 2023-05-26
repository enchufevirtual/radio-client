import styled, { css } from "styled-components";
import { CssInput, CssButton } from "../../styles/Form/styles";
import { DEFAULT_BLUE } from "../../styles/constants";

export const ChatStyle = styled.div`
  background-color: rgba(33, 38, 45, .97);
  outline: rgb(48, 54, 61) solid 1px;
  border-radius: 6px;
  padding: 1rem;
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 350px;
  max-width: 90%;
  height: 450px;
  z-index: 1000;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;

  @media (max-width: 991px) {
    right: 10px;
    bottom: 80px;
  }
  @media (max-width: 768px) {
    right: 10px;
    left: 10px;
    bottom: 80px;
    width: 100%;
    max-width: calc(100% - 20px);
    height: calc(100% - 90px);
  }
`;

export const ContainerMessages = styled.div`
  background-color: rgb(33, 38, 45);
  overflow-y: auto;
  width: auto;
  height: 92%;
`;
export const ContainerUserChat = styled.div`
  display: flex;
  position: relative;
  gap: .5rem;
  padding: 24px 8px 14px 0;
  width: 100%;
  border-bottom: rgb(48, 54, 61) solid 1px;

  span {
    position: absolute;
    font-size: 10px;
    top: 2px;
    right: 4px;
    color: ${DEFAULT_BLUE}
  }

  img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }

`;

export const BodyMessage = styled.div`
  display: inline-block;
  font-size: 14px;
  gap: 10px;

  h4 {
    display: inline-block;
    margin-right: 6px;
    font-size: 14px;
  }
`;


export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;

  svg {
    position: absolute;
    left: 20px;
    width: 18px;
    height: 18px;
    cursor: pointer;

    @media (max-width: 370px) {
      bottom: 67px;
   }
  }
  @media (max-width: 370px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  input {
    ${css`${CssInput}`}
    width: 100%;
    padding-left: 28px;
    padding-right: 10px;
  }
  .highlight-input {
    outline: 2px solid ${DEFAULT_BLUE};
  }

  button {
    ${css`${CssButton}`}
    width: 80px;

    @media (max-width: 370px) {
      width: 100%;
    }
  }
`;
// Picker Emojis
export const PickerContainerStyle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #151617;
  border-radius: 6px;
  padding: 4px;
`;
export const ContainerEmojis = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 14px;
  bottom: 57px;
  overflow: hidden;
  width: fit-content;
  width: 250px;

  @media (max-width: 370px) {
    bottom: 104px;
  }
  @media (max-width: 299px) {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10px;
    background-color: #151617;
    border-radius: 6px;
    z-index: 7;
  }
`;

export const PositionAlert = styled.div`
  position: absolute;
  width: 90%;
  bottom: 57px;
  display: flex;
  justify-content: center;
`;


