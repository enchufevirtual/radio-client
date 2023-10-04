import React, { useState, useEffect, useRef, ChangeEventHandler } from 'react'
import { ChatStyle, BodyMessage, ContainerMessages, Form, ContainerUserChat, ContainerEmojis } from './styles';
import { IconEmoji } from './IconEmoji';
import { Emojis } from './Emojis';
import randomColor from 'randomcolor';
import { LoginChat } from './LoginChat';
import { LoadingChat } from '../loadings/LoadingChat';
import { useSocket } from '../../hooks/useSocket';
import { useGlobal } from '../../hooks/useGlobal';
import { useUser } from '../../hooks/useUser';

export const Chat = () => {

  const { closeLoginChat, menuNav, inputRef } = useGlobal();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const iconRef = useRef(null);
  const emojiContainerRef = useRef(null);
  const [userColors, setUserColors] = useState<Record<string, string>>({});

  const { messages, handleSubmit, setMessage, message, isInputEmpty, lastMessageRef, containerRef, allowed, loadingChat } = useSocket();
  const url = process.env.BACKEND_URL;
  const api = process.env.API_AVATAR;
  const key = process.env.API_KEY;

  const handleEmoji = () => {
    inputRef.current.focus();
    setOpenEmoji(!openEmoji);
  }
  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
   setMessage(event.target.value)
  }

  useEffect(() => {
    const textarea = inputRef.current;
    textarea.style.height = '36px';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setOpenEmoji(false);
  }, [message]);

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition])

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (emojiContainerRef.current &&
          !emojiContainerRef.current.contains(event.target) &&
          iconRef.current &&
          !iconRef.current.contains(event.target)

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
    <ChatStyle style={{zIndex: menuNav ? 8 : 11}}>
      { loadingChat && <LoadingChat /> }
      <ContainerMessages ref={containerRef} className="container">
      { messages.map((message, index) => {
        let color = userColors[message.name];
        let imageUser = `${message.image
          ? `${url}/${message.image}`
          : `${api}/${message.name}.png?apikey=${key}`}`
        if (!color) {
          color = randomColor();
          setUserColors(prevUserColors => ({
            ...prevUserColors,
            [message.name]: color
          }));
        }
        return (
          <ContainerUserChat key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <img src={imageUser} alt="User Image" />
            <BodyMessage>
              <h4 style={{ color }}>{message.from ?? message.name}<small>:</small></h4>{message.body}
            </BodyMessage>
          </ContainerUserChat>
        );
      })}
      </ContainerMessages>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <IconEmoji iconRef={iconRef} handleEmoji={handleEmoji} openEmoji={openEmoji} />
        {!allowed && !closeLoginChat &&
          <LoginChat />
        }
        <textarea
          ref={inputRef}
          id='server'
          value={message}
          placeholder='Mensaje'
          onChange={handleInputChange}
          className={isInputEmpty ? 'highlight-input' : ''}
        />
        <button aria-label='Enviar'>Enviar</button>
      </Form>
      <ContainerEmojis ref={emojiContainerRef}>
      { openEmoji &&
        <Emojis
          setMessage={setMessage}
          message={message}
          setCursorPosition={setCursorPosition}
        />
      }
      </ContainerEmojis>
    </ChatStyle>
  )
}
