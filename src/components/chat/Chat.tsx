import React, { useState, useEffect, useRef, ChangeEventHandler } from 'react'
import { ChatStyle, BodyMessage, ContainerMessages, Form, ContainerUserChat, ContainerEmojis } from './styles';
import { IconEmoji } from './IconEmoji';
import { Emojis } from './Emojis';
import randomColor from 'randomcolor';
import { useSocket } from '../../hooks/useSocket';
import avatar from '../../public/assets/avatar.jpg';
import { LoginChat } from './LoginChat';
import { useGlobal } from '../../hooks/useGlobal';
import { useAuth } from '../..//hooks/useAuth';

export const Chat = () => {

  const { closeLoginChat, menuNav } = useGlobal();
  const { auth } = useAuth();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const emojiContainerRef = useRef(null);
  const [userColors, setUserColors] = useState<Record<string, string>>({});

  const { messages, handleSubmit, setMessage, message, isInputEmpty, lastMessageRef, containerRef, allowed } = useSocket();
  const url = process.env.BACKEND_URL;

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
    <ChatStyle style={{zIndex: menuNav ? 7 : 10}}>
      <ContainerMessages ref={containerRef} className="container">
      { messages.map((message, index) => {
        let color = userColors[message.from];
        let nameReplace = message.from.replace(/\s/g, '_');
        let imageUser = `${message.image
          ? `${url}/${message.image}`
          : `https://api.multiavatar.com/${nameReplace}.svg`}`
        if (!color) {
          color = randomColor();
          setUserColors(prevUserColors => ({
            ...prevUserColors,
            [message.from]: color
          }));
        }
        return (
          <ContainerUserChat key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <img src={imageUser} alt="User Image" />
            <BodyMessage>
              <h4 style={{ color }}>{message.from}<small>:</small></h4>{message.body}
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
