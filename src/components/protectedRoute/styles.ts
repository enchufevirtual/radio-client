import styled from 'styled-components';

export const SkeletonPageLoader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(33, 38, 45, 0.5), rgba(48, 54, 61, 0.5));
  min-height: 100vh;
  width: 100%;

  @keyframes skeletonLoading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Header Skeleton */
  &::before {
    content: '';
    height: 60px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    background-size: 200% 100%;
    animation: skeletonLoading 1.2s infinite;
    border-radius: 8px;
  }

  /* Content Skeleton Lines */
  &::after {
    content: '';
    flex: 1;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    background-size: 200% 100%;
    animation: skeletonLoading 1.2s infinite;
    border-radius: 8px;
  }
`;
