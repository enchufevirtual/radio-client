import React from 'react';
import styled from 'styled-components';

interface UsersOnlineIndicatorProps {
  count: number;
  guestsCount: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  padding: 4px 0;
  margin-bottom: 8px;
  font-size: 13px;
  color: rgb(150, 200, 150);
`;

const Count = styled.span`
  font-weight: 600;
  color: rgb(150, 200, 150);
`;
const GuestsCount = styled.div`
  font-weight: 600;
  color: rgb(150, 200, 150);
`;


const Label = styled.span`
  font-size: 13px;
  color: rgb(150, 200, 150);
  opacity: 0.85;
`;
const Span = styled.span`
  font-size: 15px;
  color: rgb(123, 123, 123);
  opacity: 0.85;
`;

export const UsersOnlineIndicator: React.FC<UsersOnlineIndicatorProps> = ({ count, guestsCount }) => {
  return (
    <Container>
      <Count>🟢 {count}</Count>
      <Label>En el Chat</Label>
      <Span> | </Span>
      <GuestsCount>🎧 {count + guestsCount} </GuestsCount>
      <Label>{count + guestsCount === 1 ? "Oyente" : "Oyentes"}</Label>
    </Container>
  );
};
