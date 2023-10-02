import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { PostContext } from "./PostContext";
import { GlobalProviderTypes } from "./types";
import { useAuth } from "../../src/hooks/useAuth";
import { useGlobal } from "../../src/hooks/useGlobal";
import { clientAxios } from "../config/axios";
import { ErrorResponse } from "types/types";
import { PREVIEW_AUDIO, PREVIEW_IMAGE } from "./constants";

export const PostProvider = ({children}: GlobalProviderTypes) => {

  const initialState = {
    content: "",
    image: "",
    audio: ""
  }

  const [showForm, setShowForm] = useState(false);
  const [myPost, setMyPost] = useState(initialState);
  const [posts, setPosts] = useState([]);
  const [sendPost, setSendPost] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [closeImage, setCloseImage] = useState(false);
  const [closeAudio, setCloseAudio] = useState(false);
  const [nextQuery, setNextQuery] = useState({limit: 4})
  const [ isVisible, setIsVisible ] = useState(false);
  let lastCard: Element
  const formRef = useRef(null);
  const textAreaRef = useRef(null);
  const { auth } = useAuth();
  const { messageNotification, dispatch } = useGlobal();

  const handlePost: MouseEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token_ev");
    if(!token) return;

    try {

      const formData = new FormData();
      formData.append("content", myPost.content);
      formData.append("image", myPost.image);
      formData.append("audio", myPost.audio);
      formData.append("userId", String(auth.id));

      const { data } = await clientAxios.post("/posts", formData);
      hasMoreResults && setPosts(prevPosts => [...prevPosts, data]);
      setShowForm(false);
      setSendPost(true);
      setMyPost({content: "", image: "", audio: ""});
    } catch (error) {
      const { message } = (error as ErrorResponse).response.data;
      if (message == 'El archivo excede el límite - (MAX 10MB)') {
        messageNotification("fileError", "Imagen/Audio - MAX 10MB");
      }
    }
  }

  const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

    setMyPost({
      ...myPost,
      [name]: value
    });
  }

  const dataPosts = async () => {
    try {
      const { limit } = nextQuery;
      let limitQuery = ""

      if (limit) {
        limitQuery = `?limit=${limit}`
      }
      const { data } = await clientAxios(`/posts${limitQuery}`);
      setHasMoreResults(data.hasMoreResults)
      setPosts(data.posts)
      setSendPost(false)
    } catch (error) {
      console.log(error)
    }
  }
  // Intersection Observer, Query Post
  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [ entry ] = entries
    setIsVisible(entry.isIntersecting)
  }
  const options = {
    rootMargin: "0px",
    threshold: 1.0
  }
  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    const cards = document.querySelectorAll(".ContentPost");
    lastCard = cards[cards.length - 1]

    if (lastCard) observer.observe(lastCard);

    return () => {
      if (lastCard) observer.unobserve(lastCard);
    }
  }, [lastCard, options])

  const handleQuery = () => {
    // current limit & offset
    const currentLimit = nextQuery.limit;

    setNextQuery({limit: currentLimit + 3})
  }
  // Handle Query
  useEffect(() => {
    if (isVisible) handleQuery();
  }, [isVisible])

  // show post form when called
  const handleShowForm = () => {
    setShowForm(true);

    if (!showForm) {
      dispatch({type: PREVIEW_IMAGE, payload: false});
      dispatch({type: PREVIEW_AUDIO, payload: false});
    }
  }
  useEffect(() => {
    if (showForm && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [showForm]);

  useEffect(() => {
    function formOutside(event: MouseEvent) {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Element)
      ) {
        setShowForm(false);
      }
    }
    document.addEventListener('mousedown', formOutside);

    return () => {
      document.removeEventListener('mousedown', formOutside);
    }
  }, [formRef]);

    // handle Previewa Content
    useEffect(() => {
      const handlePreviewFile = () => {
        if (closeImage) {
          dispatch({type: PREVIEW_IMAGE, payload: ""})
          setMyPost({
            ...myPost,
            image: ""
          });
          setCloseImage(false);
        } else if (closeAudio) {
          dispatch({type: PREVIEW_AUDIO, payload: { name: "", size: 0}})
          setMyPost({
            ...myPost,
            audio: ""
          })
          setCloseAudio(false);
        }
      }

     handlePreviewFile();
    }, [closeImage, closeAudio])

    // If we change the page, we will go to the edge of the page
    const navigate = useNavigate();

    useEffect(() => {
      const unlisten = () => {
        window.scrollTo({ top: 0, behavior: "instant" });
      };

      return () => {
        unlisten();
      };
    }, [navigate]);


  const value = {
    handleChange,
    handlePost,
    handleQuery,
    hasMoreResults,
    handleShowForm,
    setShowForm,
    setCloseImage,
    closeImage,
    setCloseAudio,
    closeAudio,
    setMyPost,
    showForm,
    textAreaRef,
    formRef,
    nextQuery,
    dataPosts,
    sendPost,
    setNextQuery,
    myPost,
    posts
  }

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  )
}
