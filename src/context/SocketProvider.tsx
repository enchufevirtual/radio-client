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
  const socketRef = useRef<any>(null);

  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const getClientId = () => {
    const key = 'radio-ev-client-id';
    let clientId = localStorage.getItem(key);
    if (!clientId) {
      clientId = typeof crypto !== 'undefined' && (crypto as any).randomUUID
        ? (crypto as any).randomUUID()
        : `client-${Math.random().toString(36).slice(2, 12)}`;
      localStorage.setItem(key, clientId);
    }
    return clientId;
  };

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

  // Socket Fetch & Initialization
  useEffect(() => {
    if (!process.env.BACKEND_URL) {
      console.error('BACKEND_URL is not configured for SocketProvider');
      setLoadingChat(false);
      return () => {};
    }

    let historyTimer: ReturnType<typeof setTimeout> | null = null;
    let pollUsersOnlineTimer: ReturnType<typeof setInterval> | null = null;

    const token = localStorage.getItem('token_ev');
    const shouldSendToken = Boolean(auth?.id && token);
    const authPayload = shouldSendToken ? { token } : undefined;
    if (!shouldSendToken) {
      console.info('[Socket] Connecting as guest; token ignored until auth is present');
    }

    const clientId = getClientId();

    // ============ Event Handlers ============

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
      console.debug('[Socket] chat:message received from userId:', message.userId);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleError = (error: { message: string }) => {
      console.error('[Socket] chat:error:', error?.message);
      if (error?.message) {
        messageNotification('server', error.message);
      }
    };

    const handleUsersOnline = (data: { count: number }) => {
      console.debug('[Socket] users-online count:', data.count);
      setUsersOnline(data.count);
    };

    const handleUserImageUpdated = (data: { userId: number; avatarUrl: string }) => {
      console.debug('[Socket] user-image-updated for userId:', data.userId);
      setMessages((prevMessages) => prevMessages.map((msg) => {
        if (String(msg.userId) !== String(data.userId)) return msg;
        return { ...msg, image: data.avatarUrl };
      }));
    };

    // ============ Cleanup Function ============
    const cleanupSocket = () => {
      if (!socketRef.current) return;
      const currentSocket = socketRef.current;
      
      // Remove all listeners
      currentSocket.off('chat:history', handleHistory);
      currentSocket.off('chat:message', handleMessage);
      currentSocket.off('chat:error', handleError);
      currentSocket.off('chat:users-online', handleUsersOnline);
      currentSocket.off('chat:user-image-updated', handleUserImageUpdated);
      currentSocket.off('connect_error');
      currentSocket.off('connect_timeout');
      currentSocket.off('connect');
      currentSocket.off('disconnect');
      
      currentSocket.disconnect();
      socketRef.current = null;
    };

    // ============ Connection Setup ============
    try {
      // Clean up previous connection if it exists
      cleanupSocket();

      const socketInstance = io(process.env.BACKEND_URL, {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 10000,
        auth: authPayload,
      });

      socketRef.current = socketInstance;
      setSocket(socketInstance);

      // ============ Connection Events ============
      socketInstance.on('connect', () => {
        console.info('[Socket] connected with id:', socketInstance.id);
        setConnectionStatus('connected');
        
        // Request initial data
        socketInstance.emit('chat:get-users-online');
      });

      socketInstance.on('connect_error', (err: any) => {
        console.error('[Socket] connect_error:', err?.message);
        setConnectionStatus('error');
        setLoadingChat(false);
      });

      socketInstance.on('connect_timeout', (err: any) => {
        console.error('[Socket] connect_timeout:', err?.message);
        setConnectionStatus('error');
        setLoadingChat(false);
      });

      socketInstance.on('disconnect', (reason: any) => {
        console.info('[Socket] disconnected, reason:', reason);
        if (reason !== 'io client disconnect') {
          setConnectionStatus('error');
        }
      });

      socketInstance.on('reconnect', () => {
        console.info('[Socket] reconnected');
        setConnectionStatus('connected');
        // Request fresh data after reconnection
        socketInstance.emit('chat:get-users-online');
      });

      socketInstance.on('reconnect_error', (err: any) => {
        console.error('[Socket] reconnect_error:', err?.message);
      });

      // ============ Attach Event Listeners (BEFORE historyTimer) ============
      socketInstance.on('chat:history', handleHistory);
      socketInstance.on('chat:message', handleMessage);
      socketInstance.on('chat:error', handleError);
      socketInstance.on('chat:users-online', handleUsersOnline);
      socketInstance.on('chat:user-image-updated', handleUserImageUpdated);

      // ============ Set History Timeout (AFTER listeners are attached) ============
      historyTimer = setTimeout(() => {
        console.warn('[Socket] chat:history not received within timeout (5s), hiding loader');
        setLoadingChat(false);
        historyTimer = null;
      }, 5000);

      // ============ Periodic Users Online Polling ============
      // Refresh users online count every 30 seconds to ensure sync
      pollUsersOnlineTimer = setInterval(() => {
        if (socketInstance?.connected) {
          console.debug('[Socket] polling users online count');
          socketInstance.emit('chat:get-users-online');
        }
      }, 30000); // 30 seconds

    } catch (error) {
      console.error('[Socket] Error initializing socket:', error);
      setLoadingChat(false);
    }

    // ============ Cleanup on Unmount or Auth Change ============
    return () => {
      console.info('[Socket] Cleaning up socket connection');
      if (historyTimer) {
        clearTimeout(historyTimer);
        historyTimer = null;
      }
      if (pollUsersOnlineTimer) {
        clearInterval(pollUsersOnlineTimer);
        pollUsersOnlineTimer = null;
      }
      cleanupSocket();
    };
  }, [auth?.id, auth]);


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
