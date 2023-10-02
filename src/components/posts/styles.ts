import {
  DEFAULT_NAV_COLOR,
  OPACITY,
  DEFAULT_BG_COLOR,
  DEFAULT_COLOR,
  COLOR_CONTAINER,
  DEFAULT_BG_AUDIO
} from "../../../src/styles/constants";
import { CssButton } from "../../../src/styles/Form/styles";
import styled, { css } from "styled-components";

export const PostAccessStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR_CONTAINER};
  padding: .8rem 1rem;
  border-radius: 6px;
  width: 100%;

  .img {
    width: 50px;
  }
`;
export const PostHistory = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    outline: rgb(48, 54, 61) solid 2px
  }
  p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: ${DEFAULT_BG_COLOR};
    outline: rgb(48, 54, 61) solid 1px;
    border-radius: 7px !important;
    padding-left: 1rem;
    margin-left: .7rem;
    user-select: none;
    width: 100%;
    color: #ccc;
    cursor: pointer;
  }
`;

export const BackFormOpacity = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: ${OPACITY};
  width: 100%;
  height: 100%;
`;

export const ContainerForm = styled.div`

  width: 100%;
  height: 100%;
  max-height: 100%;

  @media (min-width: 767px) {
    width: 500px !important;
    height: 500px !important;
    max-height: 500px !important;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    z-index: 19;
  }
`;

export const ContainerSvgForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid rgb(48, 54, 61);
  padding: 1rem 0;
  margin-top: 1rem;
  width: 100%;
  svg {
    width: 28px;
    height: 28px;
  }
`;

const CssImageClose = css`
  background-color: rgb(40, 54, 61);
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px;
  width: 28px !important;
  height: 28px !important;
  border-radius: 50%;
  align-self: flex-end;
  cursor: pointer;

  &:hover {
    background-color: rgb(48, 54, 61);;
  }

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_CONTAINER};
  outline: rgb(48, 54, 61) solid 1px;
  padding: 1rem;
  height: 100%;
  gap: .5rem;

  @media (min-width: 767px) {
    border-radius: 6px;
  }

  .CloseForm {
    ${css`${CssImageClose}`}
    background-color: rgb(48, 54, 61);

    &:hover {
      background-color: rgba(48, 54, 61, 0.8);
    }
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .ContainerInputTextarea {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: auto;
    padding: 0 1rem;
    overflow-y: auto;

    textarea {
      background-color: transparent;
      margin-bottom: 10px;
      width: 100% !important;
      font-size: 18px;
      max-width: 100%;
      height: auto;
      min-height: 100px;
      ::-webkit-scrollbar { display: none; }
      padding: .5rem;
      resize: vertical;
      color: ${DEFAULT_COLOR};
    }

  }
  button {
      ${css`${CssButton}`}
      align-self: flex-end;
    }

  button {
    padding: 0.2rem 0.5rem;
  }
`;

export const PostUser = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    margin-right: .5rem;
    font-weight: bold;
  }
`;

export const ContainerScroll = styled.div`
  height: 100%;
  overflow: auto;
`;

export const PreviousImage = styled.div`

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;

  img:first-child {
    ${css`${CssImageClose}`}
  }

  img {
    width: 100% !important;
    height: auto;
    border-radius: 6px;
  }

`;

export const ContainerPreviewAudio = styled.div`
  background: ${COLOR_CONTAINER};
  position: relative;
  outline: rgb(48, 54, 61) solid 1px;
  width: 99%;
  height: auto;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 1rem;
  padding: 1rem;

  img {
    ${css`${CssImageClose}`}
  }

  p {
    margin-right: 2rem;
  }

  small {
    align-self: flex-end;
  }
`;


export const CardPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR_CONTAINER};
  border-radius: 6px;
  gap: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  h2, p {
    align-self: flex-start;
  }
  p {
    text-align-last: left;
  }
  img:nth-child(3) {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0 !important;
  }
`;

export const PostAuthor = styled.div`
  display: flex;
  align-self: flex-start;
  padding: 1rem;

  img {
    margin-right: 1rem !important;
  }
  a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    display: block;
  }
  p {
    font-size: 12px;
  }
`;

export const PostContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  p {
    margin-left: 1rem;
  }
`;

export const ContainerSvg = styled.div`
  margin-top: .4rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;

  svg {
    width: 30px;
    height: 30px;
    margin-right: .5rem;
  }
  div:first-child::before {
    position: absolute;
    content: "";
    height: 40px;
    width: 1px;
    right: -17px;
    background-color: rgb(48, 54, 61);
  }
`;

export const DisplaySvg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: 2rem;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: .5rem;

  &:hover {
    background-color: rgba(83, 83, 95, 0.38);
    border-radius: 6px;
  }
`;
export const LabelForm = styled(Label)`

  background-color: rgba(83, 83, 95, 0.38);
  border-radius: 50%;
  padding: .7rem;
  margin-right: .4rem;

  &:hover {
    background-color: rgba(83, 83, 95, 0.78);
    border-radius: 50%;
  }
`;

export const AudioControl = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${DEFAULT_BG_AUDIO};
  border-radius: 6px;
  outline: rgb(48, 54, 61) solid 1px;
  width: 90%;
  padding: 1rem;
  margin-bottom: 1rem;

  p {
    word-wrap: break-word;
  }

  button {
    margin-left: 1rem;
    background: white;
    padding: 1rem;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
