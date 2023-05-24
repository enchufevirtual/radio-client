import React, { useState, useEffect, useRef, ChangeEventHandler } from 'react'
import { ChatStyle, BodyMessage, PositionAlert, ContainerMessages, Form, ContainerUserChat, ContainerEmojis } from './styles';
import { formatDateTime } from '../../helpers/formatDateTime';
import { IconEmoji } from './IconEmoji';
import { Emojis } from './Emojis';
import { AlertMessage } from '../alert';
import randomColor from 'randomcolor';
import { useSocket } from '../../hooks/useSocket';
import avatar from '../../public/assets/avatar.jpg';

export const Chat = () => {

  const [openEmoji, setOpenEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const emojiContainerRef = useRef(null);
  const [userColors, setUserColors] = useState<Record<string, string>>({});

  const { messages, handleSubmit, setMessage, message, isInputEmpty, lastMessageRef, containerRef } = useSocket();
  const url = process.env.BACKEND_URL;

  const handleEmoji = () => {
    inputRef.current.focus();
    setOpenEmoji(!openEmoji);
  }
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
   setMessage(event.target.value)
  }
  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition])
  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (emojiContainerRef.current &&
          !emojiContainerRef.current.contains(event.target) &&
          iconRef.current &&
          !iconRef.current.contains(event.target) &&
          inputRef.current &&
          !inputRef.current.contains(event.target)

        ) {
        setOpenEmoji(false);
      }
    };

    if (openEmoji) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openEmoji]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    if (lastMessageRef.current) lastMessageRef.current.scrollIntoView();
  };


  return (
    <ChatStyle>
      <ContainerMessages ref={containerRef} className="container">
      { messages.map((message, index) => {
        let color = userColors[message.from];
        if (!color) {
          color = randomColor();
          setUserColors(prevUserColors => ({
            ...prevUserColors,
            [message.from]: color
          }));
        }
        return (
          <ContainerUserChat key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
            {message.from && (
              <span>{formatDateTime(message.createAt)}</span>
            )}
            <img src={`${message.image ? `${url}/${message.image}` : `${avatar}` } `} alt="User Image" />
            <BodyMessage>
              <h4 style={{ color }}>{message.from}<small>:</small></h4>{message.body}
            </BodyMessage>
          </ContainerUserChat>
        );
      })}
      </ContainerMessages>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <IconEmoji iconRef={iconRef} handleEmoji={handleEmoji} openEmoji={openEmoji} />
        <PositionAlert>
          <AlertMessage data={{id: 'server'}} />
        </PositionAlert>
        <input
          ref={inputRef}
          type="text"
          id='server'
          value={message}
          placeholder='Mensaje'
          onChange={handleInputChange}
          className={isInputEmpty ? 'highlight-input' : ''}
        />
        <button>Enviar</button>
      </Form>
      <ContainerEmojis ref={emojiContainerRef}>
      { openEmoji &&
        <Emojis
          setMessage={setMessage}
          message={message}
          inputRef={inputRef}
          setCursorPosition={setCursorPosition}
        />
      }
      </ContainerEmojis>
    </ChatStyle>
  )
}
