import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { PickerContainerStyle } from './styles';
import { EmojiHandleTypes, EmojiPickerTypes } from './types';
import { useGlobal } from '../../hooks/useGlobal';

export const Emojis = (
  {
    setMessage,
    message,
    setCursorPosition
  }: EmojiHandleTypes

  ): JSX.Element => {

    const { inputRef } = useGlobal();

  const handleEmojiSelect = (emoji: EmojiPickerTypes) => {
    const input = inputRef.current;
    input.focus();

    const selectionStart = message.substring(0, input.selectionStart);
    const selectionEnd = message.substring(input.selectionEnd);
    const msg = selectionStart + emoji.native + selectionEnd;
    setMessage(msg);
    setCursorPosition(selectionStart.length + emoji.native.length);
  };

  return (
    <PickerContainerStyle>
      <Picker
        id='root'
        data={data}
        onEmojiSelect={handleEmojiSelect}
        style={{ backgroundColor: 'lightblue' }}
        perLine={6}
        dynamicPerLine={true}
        emojiSize={24}
        theme='dark'
        navPosition='bottom'
        previewPosition='none'
        locale='es'
        searchPosition='none'
        maxFrequentRows='0'
      />
    </PickerContainerStyle>
  )
}
