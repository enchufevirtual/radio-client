import styled, { keyframes } from "styled-components";

export const Radio = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(33, 38, 45, .97);
  padding: 1rem;
  border-radius: 6px;
  width: 450px;
  height: 70px;
  z-index: 11;
  overflow: hidden;
  user-select: none;

  .box {
    display: flex;
    place-content: center;
    @media (max-width: 300px) {
      justify-content: flex-start;
    }
  }

  @media (max-width: 991px) {
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid rgb(48, 54, 61);
    border-radius: 0;
  }
  @media (max-width: 300px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const scroll = keyframes`
  from {
    transform: translateX(50%);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const MarqueeContainer = styled.div`
  width: 100px;
  position: absolute;
  top: 30px;
  overflow: hidden;

  @media (max-width: 400px) {
    width: 70px !important;
  }
  @media (max-width: 353px) {
    display: none;
  }
`;

export const MarqueeText = styled.span`
  display: inline-block;
  white-space: nowrap;
  animation: ${scroll} 10s linear infinite;
  animation-play-state: paused;
`;


export const DjRadioDetails = styled.div`

  display: flex;
  align-items: flex-start;
  gap: 1rem;

  svg {
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
  @media (max-width: 300px) {
    display: none;
  }
`;

export const AdminDetails = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 12px;
  }

  span {
    font-size: 14px;
  }

`;

export const ChatRadioEv = styled.div`
  display: flex;
  justify-content: flex-end;
  img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
`;

export const PlayPause = styled.button`
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  border: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .2s ease-in-out;

  :hover {
    opacity: .6;
  }

  .play {
    width: 18px;
    height: 18px;
    margin-left: 6px;
    background: #000;
    z-index: 9;
    clip-path: polygon(0 0, 80% 48%, 0 100%, 0% 100%);
    transition: clip-path 0.5s ease;
    transition-delay: 0.4s;

  }
  .play.active {
    transition: clip-path 0.1s;
    clip-path: polygon(0 0, 27% 0, 27% 100%, 0% 100%);
  }
  .pause {
    width: 5px;
    height: 18px;
    background: #000;
    position: absolute;
    top: 11px;
    bottom: 0;
    z-index: 100;
    opacity: 0;

    @media (max-width: 480px) {
      height: 17.8px;
    }
  }
  .pause.active {
    opacity: 1;
    transition: opacity 1s;
    animation: move 0.8s cubic-bezier(0.52, 1.64, 0.37, 0.66) forwards;
    animation-delay: 0.2s;
  }
  .pause.pauseToPlay {
    animation: pauseToPlay 0.4s ease alternate-reverse;
  }
  @keyframes pauseToPlay {
    10% {
      transform: rotate(90deg);
      left: 73px;
    }
    20%,
    40% {
      transform: rotate(180deg);
      left: 92px;
    }
    50% {
      left: 92px;
      top: 10px;
      bottom: 10px;
      transform: rotate(180deg);
    }
    100% {
      left: 92px;
      bottom: 0;
      transform: rotate(180deg);
    }
  }
  @keyframes move {
    10% {
      transform: rotate(90deg);
      left: 15px;
    }
    20%,
    40% {
      transform: rotate(180deg);
      left: 16px;
    }
    50% {
      left: 19px;
      bottom: 0;
      transform: rotate(180deg);
    }
    100% {
      left: 21px;
      bottom: 0;
      transform: rotate(180deg);
    }
  }
`;

export const SvgStyle = styled.svg`
  width: 50px;
  height: 50px;
`;

export const ChatLogoStyle = styled.div`
  position: relative;
  bottom: 2px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  svg {
    width: 80px;
    height: 100%;
    cursor: pointer;
    z-index: 7;
  }
  span {
    position: absolute;
    width: 32px;
    height: 10px;
    right: 4px;
    top: 10px;
    background: #70ff8b;
    opacity: .8;
  }
`;

export const ContainerPlayVolume = styled.div`

  svg {
    position: absolute;
    top: 20px;
    right: 134px;
    width: 40px;
    height: 34px;
    cursor: pointer;
    z-index: 113;
    border-left: 1px solid rgb(48, 54, 61);
    padding: 0 10px;
    border-right: 1px solid rgb(48, 54, 61);
  }
`;
