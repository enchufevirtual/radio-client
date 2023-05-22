import styled, { css } from "styled-components";
import {
  BG_FORM,
  BORDER,
  DEFAULT_BG_COLOR,
  DEFAULT_BLUE,
  DEFAULT_BLUE_HOVER,
  DEFAULT_COLOR,
  LINK,
} from "../constants";

export const Flex = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const TitleStyle = styled.div`
  text-align: center;
`;

export const FormStyles = styled.form`
  background-color: ${BG_FORM};
  outline: 1px solid ${BORDER};
  border-radius: 6px;
  font-size: 14px;
  padding: 1rem;
`;

export const GroupInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  margin-bottom: 1rem;
  font-weight: bold;
`;

export const CssInput = css`
  background-color: ${DEFAULT_BG_COLOR};
  border-radius: 6px;
  outline: 1px solid ${BORDER};
  height: 34px;
  padding: .5rem;
  color: ${DEFAULT_COLOR};
  :focus {
    outline: 2px solid ${DEFAULT_BLUE};
  }
`;

export const CssStyleButtons = css`

  background-color: #53535f61;
  color: #ccc;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  outline: none;
  display: inline-block;
  width: fit-content;
  transition: background-color .2s ease-in-out;
  padding: 6px 10px;
  :hover {
    background-color: #53535f7a;
  }

`;

export const Input = styled.input`
  ${css`${CssInput}`}
`;

export const CssButton = css`
  display: inline-block;
  width: 100%;
  height: 34px;
  border-radius: 6px;
  padding: 6px 10px;
  font-weight: bold;
  font-size: 1rem;
  color: #111;
  background-color: ${DEFAULT_BLUE};
  transition: background .1s ease-in-out;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${DEFAULT_BLUE_HOVER};
  }
`;

export const Button = styled.button`
  ${css`${CssButton}`}
`;

export const QuestionContainer = styled.div`
  margin-top: 1rem;
  border-radius: 6px;
  outline: 1px solid ${BORDER};
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  a {
    color: ${LINK};
    cursor: pointer;
  }
`;
