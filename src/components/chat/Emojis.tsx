import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { PickerContainerStyle } from './styles';
import { EmojiHandleTypes, EmojiPickerTypes } from './types';

export const Emojis = (
  {
    setMessage,
    inputRef,
    message,
    setCursorPosition
  }: EmojiHandleTypes

  ): JSX.Element => {

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
        perLine={7}
        dynamicPerLine={true}
        emojiSize={24}
        theme='dark'
        previewPosition='none'
        locale='es'
        searchPosition='none'
        maxFrequentRows='4'
      />
    </PickerContainerStyle>
  )
}
