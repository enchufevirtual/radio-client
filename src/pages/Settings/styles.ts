import styled from "styled-components";
import { DEFAULT_NAV_COLOR } from "../../styles/constants";

export const ContainerSettings = styled.div`
  display: grid;
  width: 100%;
  max-width: 1200px;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  margin-top: 70px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${DEFAULT_NAV_COLOR};
  outline: rgb(48, 54, 61) solid 1px;
  border-radius: 6px;
  padding: 1rem;
  width: 100%;
  height: 100px;
  gap: 10px;

  a {
    text-decoration: none;
    color: #ccc;
    i {
      padding: 0 8px;
    }
  }
`;

export const ContainerOutlet = styled.div`
  width: 100%;
`;
