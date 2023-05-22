import React from 'react';
import { IconEmojiTypes } from './types';

export const IconEmoji = ({ handleEmoji, iconRef, openEmoji }: IconEmojiTypes): JSX.Element => {
  return (
    <svg ref={iconRef} onClick={handleEmoji} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.14 43.14">
      <path
        d="M-72.36 1a21.57 21.57 0 0 0-21.57 21.57 21.57 21.57 0 0 0 21.57 21.57 21.57 21.57 0 0 0 21.57-21.57A21.57 21.57 0 0 0-72.36 1Zm7.22 13.73A3.17 3.17 0 0 1-62 17.89a3.16 3.16 0 0 1-3.16 3.16 3.15 3.15 0 0 1-3.16-3.16 3.16 3.16 0 0 1 3.18-3.16Zm-15.11 0a3.16 3.16 0 0 1 3.16 3.16 3.15 3.15 0 0 1-3.16 3.16 3.15 3.15 0 0 1-3.16-3.16 3.16 3.16 0 0 1 3.16-3.16Zm20.09 14.4c-4.55 4.46-10.57 6.38-16.77 4.55a21.86 21.86 0 0 1-8.3-4.55c-1.2-1.07.57-2.84 1.77-1.76a12.81 12.81 0 0 0 1.79 1.33 20.18 20.18 0 0 0 4.91 2.41c5.49 1.79 10.74.26 14.83-3.74 1.15-1.13 2.93.63 1.77 1.76Z"
        style={{
          fill: openEmoji ? "rgb(0, 255, 255)" : "#727375",
        }}
        transform="translate(93.93 -1)"
      />
    </svg>
  )
}
