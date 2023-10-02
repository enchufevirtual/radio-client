import React, { useState, useEffect, useRef } from "react";
import type { FormEventHandler } from 'react';
import io from 'socket.io-client';
import { SocketContext } from "./SocketContext";
import { ErrorRequest } from "types/types";
import { clientAxios } from "../config/axios";
import { GlobalProviderTypes, Messages } from "./types";
import { useAuth } from "../hooks/useAuth";
import { useGlobal } from "../hooks/useGlobal";
import { DataServer } from "../components/chat/types";
import { CLOSE_LOGIN_CHAT } from "./constants";

export const SocketProvider = ({children}: GlobalProviderTypes) => {

  const { auth, invalidToken } = useAuth();
  const { messageNotification, dispatch, inputRef } = useGlobal();
  const [socket, setSocket] = useState(null);

  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Loading Chat
  const [loadingChat, setLoadingChat] = useState(true);

  const [allowed, setAllowed] = useState(true);

  // Chat Messages
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Messages[]>([]);
  // Audio Player
  const lastMessageRef = useRef(null);
  const containerRef = useRef(null);

  // Socket Fetch

  const testBackendURL = async (url: string) => {
    try {
      await fetch(url); // We try to make a request to the backend url
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const fetchBackendURL = async () => {
      const isValidURL = await testBackendURL(process.env.BACKEND_URL);
      if (!isValidURL) return; // We exit the function if the URL is invalid

      try {
        const socketInstance = io(process.env.BACKEND_URL, { transports: ["websocket"] });
        setSocket(socketInstance);
      } catch (error) {
        console.error("Error al conectarse:", error);
      }
    };

    fetchBackendURL();
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

      const newMessage = {
        from: auth.username,
        name: auth.name,
        body: message,
        image: auth.image,
        userId: auth.id,
        createAt: new Date()
      }
      socket.emit('client:message', newMessage);
      setMessages([...messages, newMessage]);
      setMessage('');
      inputRef.current.focus();
    }
  }

  useEffect(() => {
    if (socket) {
      const receiveMessage = (message: Messages) => {
        setMessages((prevMessages) => [...prevMessages, message]);
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
        setLoadingChat(true);
        const { data } = await clientAxios('/chat');
        const newMessages = data.map((
          chat: DataServer
          ) => ({
          userId: chat.userId,
          from: chat.user?.username,
          name: chat.user?.name,
          body: chat.message,
          image: chat.user?.image,
          createAt: chat.createAt
        }));
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      } catch (error) {
        const errorMsg = (error as ErrorRequest)
        if (errorMsg.message === "Network Error") {
          localStorage.removeItem("token_ev");
          return;
        }
        messageNotification('server', 'Hubo un error, recarga la página')
      } finally {
        setLoadingChat(false);
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
    allowed,
    setAllowed,
    loadingChat,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}
