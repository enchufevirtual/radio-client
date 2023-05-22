import styled from "styled-components";
import { LINK } from "../../styles/constants";

export const ContainerLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    margin-bottom: 1rem;
    color: ${LINK};
    cursor: pointer;
  }
`;
