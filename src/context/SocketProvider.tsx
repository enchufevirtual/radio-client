import React, { useState, useEffect, useRef } from "react";
import type { FormEventHandler } from 'react';
import io from 'socket.io-client';
import { SocketContext } from "./SocketContext";
import { clientAxios } from "../config/axios";
import { GlobalProviderTypes, Messages } from "./types";
import { useAuth } from "../hooks/useAuth";
import { useGlobal } from "../hooks/useGlobal";
import { DataServer } from "../components/chat/types";

export const SocketProvider = ({children}: GlobalProviderTypes) => {

  const { auth } = useAuth();
  const { messageNotification } = useGlobal();
  const [socket, setSocket] = useState(null);

  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Chat Messages
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Messages[]>([]);
  // Audio Player
  const lastMessageRef = useRef(null);
  const containerRef = useRef(null);

  // Socket Fetch
  useEffect(() => {
    const fetchBackendURL = async () => {
      try {
        const socketInstance = io(process.env.BACKEND_URL, {transports: ["websocket"]});
        setSocket(socketInstance);
      } catch (error) {
        console.log(error)
      }
    };

    fetchBackendURL();
  }, []);

  // Socket Chat
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      return messageNotification('server', 'Registrate para usar el chat');
    };

    if ( message.trim() === '' ) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);

      const newMessage = {
        from: auth.name,
        body: message,
        image: auth.image,
        userId: auth.id,
        createAt: new Date()
      }
      socket.emit('client:message', newMessage);
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  }

  useEffect(() => {
    if (socket) {
      const receiveMessage = (message: Messages) => {
        setMessages([...messages, message]);
      };

      socket.on('server:message', receiveMessage);

      return () => {
        socket.off('server:message', receiveMessage);
      };
    }
    return () => {};
  }, [socket, messages]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return
    }
    const getMessages = async () => {

      try {
        const { data } = await clientAxios('/chat');
        console.log(data)
        const newMessages = data.map((
          chat: DataServer
          ) => ({
          from: chat.user?.name,
          body: chat.message,
          image: chat.image,
          createAt: chat.createAt
        }));
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      } catch (error) {
        messageNotification('server', 'Hubo un error, recarga la página')
      }
    }
    getMessages();
  }, [mounted])

  const value = {
    messages,
    handleSubmit,
    isInputEmpty,
    setMessage,
    message,
    lastMessageRef,
    containerRef,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}
