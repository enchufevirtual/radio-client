import styled from "styled-components";

export const ContainerHome = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    width: 100%;
    height: 100vh;
    line-height: 90px;
    text-shadow: 7px 7px 7px #000;
    font-weight: 900;
    font-size: 100px;
    user-select: none;
    z-index: 7;
  }
  .full-width {
    z-index: 7;
    justify-content: flex-end;
  }

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: flex-start;

    h1 {
      font-size: 70px;
      line-height: 70px;
    }
  }
  @media (max-width: 280px) {

    h1 {
      font-size: 50px;
      line-height: 50px;
    }
  }
`;
