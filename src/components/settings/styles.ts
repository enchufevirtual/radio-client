import styled, { css } from "styled-components";
import { Input, Button, CssStyleButtons } from "../../styles/Form/styles";
import { BORDER, DEFAULT_BLUE, DEFAULT_COLOR, LINK } from "../../styles/constants";

export const ContainerSettings = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 20px;
  width: 100%;
  margin-bottom: 30px;

  &::before {
    content: '';
    position: absolute;
    top: 40px;
    border-bottom: 1px solid ${BORDER};
    width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ContainerInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    .containerForm {
      order: 1;
    }
  }
`;

export const SettingsInput = styled(Input)`
  background-color: #010409;
  margin-bottom: 10px;
  width: 420px;

  @media (max-width: 450px) {
    width: 100% !important;
  }
`;

export const SettingsTextarea = styled.textarea`
  background-color: #010409;
  margin-bottom: 10px;
  border-radius: 6px;
  outline: 1px solid ${BORDER};
  max-width: 420px;
  height: 100px;
  padding: .5rem;
  color: ${DEFAULT_COLOR};
  :focus {
    outline: 2px solid ${DEFAULT_BLUE};
  }
`;

export const SettingsInputImage = styled(SettingsInput)`
  background-color: #010409;
  width: auto;
`;

export const SettingsButton = styled(Button)`
  width: fit-content;
  max-width: 100%;
  margin-bottom: 2rem;
  font-weight: bold;
`;

export const ContainerImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input[type="file"] {
    display: none;
  }
  .custom-upload-button {
    ${css`${CssStyleButtons}`}
  }

  label {
    margin-bottom: 0;
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  p {
    font-size: 14px;
    color: #dedee3;
  }
`;

export const SocialInputIcon = styled.div`
  position: relative;

  input {
    padding-left: 32px;
  }

  i {
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;

export const ContainerSocialUrl = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  width: 90%;

  span {
    color: ${DEFAULT_BLUE};
  }
`;
