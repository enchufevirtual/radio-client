import React, { useState, useEffect, useRef, ChangeEventHandler } from 'react'
import { ChatStyle, BodyMessage, ContainerMessages, Form, ContainerUserChat, ContainerEmojis, GuestNotice, EmptyChat, SkeletonMessageBox, SkeletonLine } from './styles';
import { IconEmoji } from './IconEmoji';
import { Emojis } from './Emojis';
import randomColor from 'randomcolor';
import { LoginChat } from './LoginChat';
import { UsersOnlineIndicator } from './UsersOnlineIndicator';
import { useSocket } from '../../hooks/useSocket';
import { useGlobal } from '../../hooks/useGlobal';
import { useAuth } from '../../hooks/useAuth';
import { CLOSE_LOGIN_CHAT } from '../../context/constants';
import { resolveImageSrc } from '../../helpers/getAvatarUrl';

export const Chat = () => {

  const { closeLoginChat, menuNav, inputRef, dispatch } = useGlobal();
  const { auth } = useAuth();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const iconRef = useRef(null);
  const emojiContainerRef = useRef(null);
  const [userColors, setUserColors] = useState<Record<string, string>>({});

  const { 
    messages, 
    handleSubmit, 
    setMessage, 
    message, 
    isInputEmpty, 
    lastMessageRef, 
    containerRef, 
    allowed, 
    loadingChat, 
    setAllowed, 
    connectionStatus, 
    usersOnline,
    guestsOnline

  } = useSocket();

  const isGuest = !auth?.id;
  const isConnecting = loadingChat && messages.length === 0;

  useEffect(() => {
    if (!isGuest && !allowed) {
      setAllowed(true);
    }
  }, [isGuest, allowed, setAllowed]);
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
      {/* Skeleton Loading para el chat */}
      {showLoading && (
        <ContainerMessages style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px' }}>
          {[1, 2, 3].map((i) => (
            <SkeletonMessageBox key={`skeleton-message-${i}`}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(90deg, #e0e0e0, #f0f0f0, #e0e0e0)', backgroundSize: '200% 100%', animation: 'skeletonLoading 1.2s infinite' }} />
                <div style={{ flex: 1 }}>
                  <SkeletonLine width="60%" height="12px" style={{ marginBottom: '4px' }} />
                  <SkeletonLine width="80%" height="10px" />
                </div>
              </div>
            </SkeletonMessageBox>
          ))}
        </ContainerMessages>
      )}
      {!showLoading && (
        <>
          <ContainerMessages ref={containerRef} className="container">
        {messages.length === 0 ? (
          <EmptyChat>
            {connectionError
              ? 'No se pudo conectar al chat. Recarga la página si el problema persiste.'
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
              const imageSource = message.image ?? message.user?.image ?? null;
              const imgSrc = resolveImageSrc(imageSource);
              const keyId = message.id ?? (message.createAt ? String(new Date(message.createAt).getTime()) : index);
              return (
                <ContainerUserChat key={keyId} ref={index === sorted.length - 1 ? lastMessageRef : null}>
                  <img src={imgSrc} alt="User Image" />
                  <BodyMessage>
                    <h4 style={{ color }}>{displayName}<small>:</small></h4>{message.body}
                  </BodyMessage>
                </ContainerUserChat>
              );
            })
        )}
      </ContainerMessages>
      {isGuest && <GuestNotice>¿Team frío ❄️ o team calor ☀️?</GuestNotice>}
      <UsersOnlineIndicator count={usersOnline} guestsCount={guestsOnline} />
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <IconEmoji iconRef={iconRef} handleEmoji={handleEmoji} openEmoji={openEmoji} />
        {isGuest && !allowed && !closeLoginChat &&
          <LoginChat />
        }
        <textarea
          ref={inputRef}
          id='server'
          value={message}
          placeholder={isGuest ? '¡Conéctate con la comunidad!' : 'Mensaje'}
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
        </>
      )}
    </ChatStyle>
  )
}
