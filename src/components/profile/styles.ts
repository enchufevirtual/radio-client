import styled from "styled-components";
import { DEFAULT_BLUE } from "../../styles/constants";

export const Anchors = styled.div`
  display: flex;
  a {
    color: #fff;
    transition: color .1s ease-in-out;
    i {
      font-size: 20px;
      margin: 0 .5rem;
    }
    &:hover {
      color: ${DEFAULT_BLUE};
    }
  }
`;
