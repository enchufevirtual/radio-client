import React, { useState } from 'react';
import type { MouseEventHandler, RefObject, TouchEventHandler } from 'react';
import { VolumeContainer, VolumeRange, BarHoverBox, Bar, BarFill } from './volumeStyle';
import { useGlobal } from '../../hooks/useGlobal';

interface VolumeTypes {
  containerVolumeRef: RefObject<HTMLDivElement>
}

export const Volume = ({ containerVolumeRef }: VolumeTypes) => {

  const [isDragging, setIsDragging] = useState(false);
  const { volume, volumeValue, setVolumeValue } = useGlobal();

  const calculateFillHeight = (offsetY: number, height: number) => {
    const calculatedHeight = Math.max(Math.min((height - offsetY) / height * 100, 100), 0);
    return calculatedHeight;
  };

  const updateValue = (offsetY: number, height: number) => {
    const fillHeight = calculateFillHeight(offsetY, height);
    setVolumeValue(fillHeight);
  };

  const handleBarClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget as HTMLDivElement;
    const height = target.offsetHeight - 20;
    const offsetY = (e.nativeEvent as MouseEvent).offsetY;
    if (offsetY) {
      updateValue(offsetY, height);
    }
  };
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) {
      const target = e.currentTarget as HTMLDivElement;
      const height = target.offsetHeight - 30;
      const touch = e.touches[0];
      const offsetY = touch.pageY - target.getBoundingClientRect().top;
      if (offsetY) {
        updateValue(offsetY, height);
      }
    }
  };
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) {
      handleBarClick(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <VolumeContainer ref={containerVolumeRef}>
      <VolumeRange
        type="range"
        value={volumeValue}
        onInput={volume}
      />
      <BarHoverBox
        onClick={handleBarClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <Bar>
          <BarFill fillHeight={volumeValue} />
        </Bar>
      </BarHoverBox>
    </VolumeContainer>
  );
};
