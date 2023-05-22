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
  inputRef: RefObject<HTMLInputElement>,
  message: string,
  setCursorPosition:  React.Dispatch<React.SetStateAction<number>>,
}

export interface DataServer {
  message: string;
  createAt: string
  image: string
  user: {
    name: string,
  }
}
