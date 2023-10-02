import styled from "styled-components";

export const ContainerButtonComments = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 4px;
  border-top: rgb(48, 54, 61) solid 1px;

  button {
    background-color: transparent;
    color: white;
    cursor: pointer;
    padding: .5rem 1rem;

    &:hover {
      background-color: rgb(48, 54, 61);
      border-radius: 6px;
    }
  }
`;
