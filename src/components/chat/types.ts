import type {  LegacyRef, RefObject  } from 'react';

export interface IconEmojiTypes {
  handleEmoji: () => void;
  iconRef: LegacyRef<SVGSVGElement>,
  openEmoji: boolean
}

export interface EmojiPickerTypes {
  aliases: [],
  id: string,
  keywords: [],
  name: string,
  native: string,
  shortcodes: string,
  skin: number,
  unified: string
}

export interface EmojiHandleTypes {
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  message: string,
  setCursorPosition:  React.Dispatch<React.SetStateAction<number>>,
}

export interface DataServer {
  userId: string | number;
  message: string;
  createAt: string;
  image: string;
  user: {
    name: string,
    image: string
    username: string
  }
}
