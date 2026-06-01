import React, { useState, useEffect, useRef } from "react";
import type { FormEventHandler } from 'react';
import io from 'socket.io-client';
import { SocketContext } from "./SocketContext";
import { GlobalProviderTypes, Messages } from "./types";
import { useAuth } from "../hooks/useAuth";
import { useGlobal } from "../hooks/useGlobal";
import { CLOSE_LOGIN_CHAT } from "./constants";

export const SocketProvider = ({children}: GlobalProviderTypes) => {

  const { auth, invalidToken } = useAuth();
  const { messageNotification, dispatch, inputRef } = useGlobal();
  const [socket, setSocket] = useState(null);

  const [isInputEmpty, setIsInputEmpty] = useState(false);

  // Loading Chat
  const [loadingChat, setLoadingChat] = useState(true);

  const [allowed, setAllowed] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [usersOnline, setUsersOnline] = useState(0);

  // Chat Messages
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Messages[]>([]);
  // Audio Player
  const lastMessageRef = useRef(null);
  const containerRef = useRef(null);

  // Socket Fetch

  useEffect(() => {
    if (!process.env.BACKEND_URL) {
      console.error('BACKEND_URL is not configured for SocketProvider');
      setLoadingChat(false);
      return () => {};
    }

    let socketInstance: any = null;
    try {
      socketInstance = io(process.env.BACKEND_URL, {
        transports: ["polling", "websocket"],
        withCredentials: true,
        reconnectionAttempts: 5,
        timeout: 10000,
      });
      // debug logs to help trace connection issues across tabs
      socketInstance.on('connect', () => {
        console.info('[Socket] connected', socketInstance.id);
        setConnectionStatus('connected');
      });
      socketInstance.on('connect_error', (err: any) => {
        console.error('[Socket] connect_error', err);
        setConnectionStatus('error');
        setLoadingChat(false);
      });
      socketInstance.on('connect_timeout', (err: any) => {
        console.error('[Socket] connect_timeout', err);
        setConnectionStatus('error');
        setLoadingChat(false);
      });
      socketInstance.on('disconnect', (reason: any) => {
        console.info('[Socket] disconnected', reason);
        if (reason !== 'io client disconnect') {
          setConnectionStatus('error');
        }
      });
      setSocket(socketInstance);
    } catch (error) {
      console.error("Error al conectarse al socket:", error);
      setLoadingChat(false);
    }

    return () => {
      if (socketInstance) {
        socketInstance.off();
        socketInstance.disconnect();
      }
    };
  }, []);


  // Socket Chat
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token_ev');
    if (!token) {
      setAllowed(false);
      dispatch({type: CLOSE_LOGIN_CHAT, payload: false})
      return;
    };
    if (invalidToken === 'Invalid Token') {
      localStorage.removeItem("token_ev");
      setAllowed(false);
      return;
    }

    if ( message.trim() === '' ) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
      if (!socket) {
        messageNotification('server', 'Chat no disponible. Recarga la página.');
        return;
      }

      const newMessage = {
        from: auth.username,
        name: auth.name,
        body: message,
        image: auth.image,
        userId: auth.id,
        createAt: new Date()
      }
      socket.emit('chat:send', newMessage);
      setMessage('');
      inputRef.current.focus();
    }
  }

  useEffect(() => {
    if (!socket) return () => {};

    let historyTimer: ReturnType<typeof setTimeout> | null = null;

    const handleHistory = (history: Messages[]) => {
      console.info('[Socket] chat:history received, count=', history?.length);
      if (historyTimer) {
        clearTimeout(historyTimer);
        historyTimer = null;
      }
      setMessages(history);
      setLoadingChat(false);
      setConnectionStatus('connected');
    };

    const handleMessage = (message: Messages) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleError = (error: { message: string }) => {
      if (error?.message) {
        messageNotification('server', error.message);
      }
    };

    const handleUsersOnline = (data: { count: number }) => {
      setUsersOnline(data.count);
    };

    // if history doesn't arrive in 5s, stop loading to avoid permanent spinner
    historyTimer = setTimeout(() => {
      console.warn('[Socket] chat:history not received within timeout, hiding loader');
      setLoadingChat(false);
      historyTimer = null;
    }, 5000);

    socket.on('chat:history', handleHistory);
    socket.on('chat:message', handleMessage);
    socket.on('chat:error', handleError);
    socket.on('chat:users-online', handleUsersOnline);
    socket.on('connect_error', (_err: any) => {
      setConnectionStatus('error');
      setLoadingChat(false);
    });
    socket.on('connect_timeout', (_err: any) => {
      setConnectionStatus('error');
      setLoadingChat(false);
    });

    return () => {
      if (historyTimer) clearTimeout(historyTimer);
      socket.off('chat:history', handleHistory);
      socket.off('chat:message', handleMessage);
      socket.off('chat:error', handleError);
      socket.off('chat:users-online', handleUsersOnline);
    };
  }, [socket]);

  useEffect(() => {
    setLoadingChat(true);
  }, []);

  useEffect(() => {
    if (!auth?.id) return;

    setMessages((prevMessages) => prevMessages.map((messageItem) => {
      if (String(messageItem.userId) !== String(auth.id)) return messageItem;

      return {
        ...messageItem,
        username: auth.username,
        from: auth.username,
        name: auth.username || auth.name,
        image: auth.image,
      };
    }));
  }, [auth?.id, auth?.username, auth?.name, auth?.image]);

  const value = {
    messages,
    handleSubmit,
    isInputEmpty,
    setMessage,
    message,
    lastMessageRef,
    containerRef,
    allowed,
    setAllowed,
    loadingChat,
    connectionStatus,
    usersOnline,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}
