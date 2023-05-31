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
  z-index: 10;
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
  @media (max-width: 480px) {
    background-color: rgb(33, 38, 45);
    top: 0;
    right: 0 !important;
    left: 0 !important;
    bottom: 0;
    width: 100%;
    max-width: 100%;
    height: calc(100% - 69px);
    outline: none;
    border-radius: 0;
  }
`;

export const ContainerMessages = styled.div`
  background-color: rgb(33, 38, 45);
  overflow-y: auto;
  width: auto;
  height: 95%;
`;
export const ContainerUserChat = styled.div`
  display: flex;
  position: relative;
  gap: .5rem;
  padding: 10px 8px 10px 0px;
  width: 100%;

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
  scrollbar-color: transparent transparent;

  svg {
    position: absolute;
    left: 18px;
    bottom: 20px;
    width: 20px;
    height: 20px;
    margin: 4px;
    cursor: pointer;

    @media (max-width: 370px) {
      bottom: 64px;
   }
  }
  @media (max-width: 370px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  textarea {
    ${css`${CssInput}`}
    width: 100%;
    max-height: 100px !important;
    padding: 0.6rem 10px 4px 34px;
    resize: none;
    font-size: 14px;
    ::-webkit-scrollbar {
    display: none;
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
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
    align-self: flex-end;
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
  bottom: 60px;
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

type Allowed = {
  allowed: boolean;
}

export const PositionAlert = styled.div<Allowed>`
  position: absolute;
  background-color: ${(props) => !props.allowed ? 'rgb(33, 38, 45)' : null};
  width: 100%;
  height: 70px;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // Notification
  .htDNab {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`;


