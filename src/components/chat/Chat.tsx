import React, { useState, useEffect, useRef, ChangeEventHandler } from 'react'
import { ChatStyle, BodyMessage, ContainerMessages, Form, ContainerUserChat, ContainerEmojis, GuestNotice, EmptyChat } from './styles';
import { IconEmoji } from './IconEmoji';
import { Emojis } from './Emojis';
import randomColor from 'randomcolor';
import { LoginChat } from './LoginChat';
import { LoadingChat } from '../loadings/LoadingChat';
import { UsersOnlineIndicator } from './UsersOnlineIndicator';
import { useSocket } from '../../hooks/useSocket';
import { useGlobal } from '../../hooks/useGlobal';
import { useAuth } from '../../hooks/useAuth';
import { CLOSE_LOGIN_CHAT } from '../../context/constants';
import { getAvatarUrl } from '../../helpers/getAvatarUrl';

export const Chat = () => {

  const { closeLoginChat, menuNav, inputRef, dispatch } = useGlobal();
  const { auth } = useAuth();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const iconRef = useRef(null);
  const emojiContainerRef = useRef(null);
  const [userColors, setUserColors] = useState<Record<string, string>>({});

  const { messages, handleSubmit, setMessage, message, isInputEmpty, lastMessageRef, containerRef, allowed, loadingChat, setAllowed, connectionStatus, usersOnline } = useSocket();
  const isGuest = !auth?.id;
  const isConnecting = loadingChat && messages.length === 0;
  const showLoading = loadingChat && !isGuest;
  const connectionError = connectionStatus === 'error';

  const handleEmoji = () => {
    inputRef.current.focus();
    setOpenEmoji(!openEmoji);
  }
  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
   if (isGuest) return;
   setMessage(event.target.value)
  }

  const openLoginPrompt = () => {
    if (!isGuest) return;
    setAllowed(false);
    dispatch({ type: CLOSE_LOGIN_CHAT, payload: false });
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
    setUserColors((prevUserColors) => {
      const next = { ...prevUserColors };
      let shouldUpdate = false;

      messages.forEach((message) => {
        const name = message.username || message.name || message.from || 'Usuario';
        if (!next[name]) {
          next[name] = randomColor();
          shouldUpdate = true;
        }
      });

      return shouldUpdate ? next : prevUserColors;
    });
  }, [messages]);

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
      { showLoading && <LoadingChat /> }
      <ContainerMessages ref={containerRef} className="container">
        {messages.length === 0 ? (
          <EmptyChat>
            {connectionError
              ? 'No se pudo conectar al chat. Revisa que el backend esté activo.'
              : isConnecting
                ? 'Conectando al chat...'
                : 'Aún no hay mensajes. Disfruta el chat en vivo.'
            }
          </EmptyChat>
        ) : (
          [...messages]
            .sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime())
            .map((message, index, sorted) => {
              const isMine = auth?.id && String(auth.id) === String(message.userId);
              const displayName = isMine
                ? auth.username || auth.name || 'Usuario'
                : message.username || message.from || message.name || 'Usuario';
              const color = userColors[displayName] || '#000';
              const imageUser = isMine
                ? getAvatarUrl(auth.image, displayName)
                : getAvatarUrl(message.image, displayName);
              const keyId = message.id ?? (message.createAt ? String(new Date(message.createAt).getTime()) : index);
              return (
                <ContainerUserChat key={keyId} ref={index === sorted.length - 1 ? lastMessageRef : null}>
                  <img src={imageUser} alt="User Image" />
                  <BodyMessage>
                    <h4 style={{ color }}>{displayName}<small>:</small></h4>{message.body}
                  </BodyMessage>
                </ContainerUserChat>
              );
            })
        )}
      </ContainerMessages>
      {isGuest && <GuestNotice>Inicia sesión para escribir mensajes.</GuestNotice>}
      <UsersOnlineIndicator count={usersOnline} />
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <IconEmoji iconRef={iconRef} handleEmoji={handleEmoji} openEmoji={openEmoji} />
        {!allowed && !closeLoginChat &&
          <LoginChat />
        }
        <textarea
          ref={inputRef}
          id='server'
          value={message}
          placeholder={isGuest ? 'Inicia sesión para escribir...' : 'Mensaje'}
          onChange={handleInputChange}
          onClick={isGuest ? openLoginPrompt : undefined}
          onFocus={isGuest ? openLoginPrompt : undefined}
          className={isInputEmpty ? 'highlight-input' : ''}
          readOnly={isGuest}
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
