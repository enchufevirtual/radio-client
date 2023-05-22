import styled from "styled-components";

export const VolumeContainer = styled.div`
  position: fixed;
  bottom: 70px;
  right: 149px;
  background-color: rgba(33, 38, 45, 0.97);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 50px;
  height: 87px;
  z-index: 111;

  @media (max-width: 991px) {
     bottom: 50px;
     right: 130px;
  }
`;

export const VolumeRange = styled.input`
  display: none;
`;

export const Icon = styled.div`
  font-size: 2rem;
`;

export const BarHoverBox = styled.div`
  padding: 10px 15px;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export const Bar = styled.div`
  background: #999;
  height: 70px;
  width: 7px;
  border-radius: 15px;
  overflow: hidden;
  pointer-events: none;
  transform: scaleY(-1);
`;
type BarFillProps = {
  fillHeight: number;
}

export const BarFill = styled.div<BarFillProps>`
  background: #fff;
  height: ${(props) => props.fillHeight}%;
  width: 100%;
  background-clip: border-box;
  pointer-events: none;
  transform: scaleY(-1);
`;
