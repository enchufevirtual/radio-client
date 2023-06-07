import styled from "styled-components";

export const LoadingStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #161B22;
  z-index: 9;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

`;
export const Container = styled.div`
  position: relative;
  div {
    display: inline-block;
    position: absolute;
    left: -20px;
    width: 16px;
    background: #fff;
    animation: anima 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  div:nth-child(1) {
    left: -20px;
    animation-delay: -0.24s;
  }
  div:nth-child(2) {
    left: 4px;
    animation-delay: -0.12s;
  }
  div:nth-child(3) {
    left: 28px;
    animation-delay: 0;
  }
  @keyframes anima {
    0% {
      top: 8px;
      height: 64px;
    }
    50%, 100% {
      top: 24px;
      height: 32px;
    }
  }
`

// Loading Chat
export const LoadingChatStyles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(33, 38, 45);
  z-index: 1;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 6px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;
