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
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0.75rem 0.75rem 0 0.75rem;
`;

export const EmptyChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  line-height: 1.5;
  width: 100%;
  min-height: 100%;
  padding: 1rem;
`;

export const GuestNotice = styled.div`
  padding: 0.55rem 0.75rem;
  margin: 0.5rem 0 0.2rem;
  border-radius: 999px;
  color: #f5f5f5;
  font-size: 12px;
  text-align: center;
  line-height: 1.4;
  width: calc(100% - 2rem);
`;
export const ContainerUserChat = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  gap: .75rem;
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
    width: 30px;
    height: 30px;
    border-radius: 50%;
    flex-shrink: 0;
  }

`;

export const BodyMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 14px;
  word-break: break-word;

  h4 {
    margin: 0;
    font-size: 14px;
    line-height: 1.2;
  }

  small {
    margin-left: 4px;
    opacity: 0.8;
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
    padding: 0.2em 10px 4px 34px;
    resize: none;
    line-height: 28px;
    font-size: 10px;
    ::-webkit-scrollbar {
    display: none;
    @media (max-width: 768px) {
      font-size: 15px;

        @media (max-width: 370px) {
          font-size: 14px;
        }

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

// ============ Skeleton Styles ============
export const SkeletonMessageBox = styled.div`
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  background-size: 200% 100%;
  animation: skeletonLoading 1.2s infinite;
  border-radius: 4px;
  padding: 8px;
  min-height: 50px;
  width: 100%;

  @keyframes skeletonLoading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const SkeletonLine = styled.div<{ width?: string; height?: string }>`
  height: ${(props) => props.height || '10px'};
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  background-size: 200% 100%;
  animation: skeletonLoading 1.2s infinite;
  border-radius: 4px;
  width: ${(props) => props.width || '100%'};

  @keyframes skeletonLoading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

