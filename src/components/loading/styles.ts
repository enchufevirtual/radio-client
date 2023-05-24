import styled from "styled-components";

export const LoadingStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #161B22;
  z-index: 1000;
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
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
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
  @keyframes lds-facebook {
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
