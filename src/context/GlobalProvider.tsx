import React, { useState, useRef, useEffect, useReducer } from "react";
import type {  FormEventHandler, ChangeEventHandler } from 'react';
import { GlobalProviderTypes, Auth, HandleFileCallback, MyPostTypes, GLOBAL_STATE } from "./types";
import { GlobalContext } from "./GlobalContext";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { ErrorRequest } from "types/types";
import { clientAxios } from "../config/axios";
import { globalReducer } from "./globalReducer";
import {
  CURRENT_AUDIO,
  INPUT,
  SUCCESS,
  VOLUME_VALUE,
  OPEN_CHAT,
  CLOSE_LOGIN_CHAT,
  PREVIEW_IMAGE,
  PLAY,
  CURRENT_SONG,
  IS_PLAYING,
  ZENO_API,
  INPUT_PAYLOAD,
  INPUT_FILES,
  STREAM_URL,
  PLAYING_FROM,
  AUDIO_TITLE,
} from "./constants";

// Allow accessing `process.env` which is injected by the bundler at build time.
declare const process: any;

export const GlobalProvider = ({children}: GlobalProviderTypes) => {

  const initialState: GLOBAL_STATE = {
    currentAudio: null as null,
    input: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      image: ''
    },
    success: false,
    isFooter: true,
    volumeValue: 70,
    openChat: false,
    closeLoginChat: false,
    menuNav: false,
    previewImage: null as null,
    previewAudio: {name: "", size: 0},
    zIndexLoading: 11,
    currentSong: 'Tu nueva experiencia musical',
    play: false,
    isPlaying: false,
    zenoAPI: false,
    streamUrl: process.env.URL_STREAM || 'https://stream.zeno.fm/hnwgw0jr0gatv',
    playingFrom: 'radio',
    audioTitle: 'Tu nueva experiencia musical',
  }

  const [state, dispatch] = useReducer(globalReducer, initialState);

  // Textarea Ref Chat
  const inputRef = useRef(null);

  class CheckBeforeSend {

    private username: string;
    private email: string;
    private password: string;
    private repeatPassword: string

    constructor(username: string, email: string, password: string, repeatPassword: string) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.repeatPassword = repeatPassword
    }
    protected validate() {
      const usernameValue = this.username.trim();
      const emailValue = this.email.trim();
      const passwordValue = this.password.trim();
      const repeatPasswordValue = this.repeatPassword.trim();
      let result = true;

      if (!usernameValue) {
        CheckBeforeSend.messageNotification('username', 'El username es obligatorio');
        result = false;
      } else if (!this.regexUsername(usernameValue)) {
        CheckBeforeSend.messageNotification('username', 'Solo puedes agregar letras y números');
        result = false;
      }
      if (!emailValue) {
          CheckBeforeSend.messageNotification('email', 'El email es obligatorio');
          result = false;
      } else if (!this.isEmail(emailValue)) {
          CheckBeforeSend.messageNotification('email', 'El campo "Email" contiene un formato no válido.');
          result = false;
      }
      if (!passwordValue) {
        CheckBeforeSend.messageNotification('password', 'El password es obligatorio');
        result = false;
      }
      if (passwordValue.length < 6) {
        CheckBeforeSend.messageNotification('password', 'La contraseña es muy corta, agrega mínimo 6 caracteres');
        result = false
      }
      if (passwordValue !== repeatPasswordValue) {
        CheckBeforeSend.messageNotification('repeatPassword', 'Las contraseñas no son iguales');
        result = false;
      }
      return result;
    }
    static messageNotification(fieldName: string, message: string): void {
      const element = document.getElementById(`${fieldName}-alert`) as HTMLElement;
      const inputField = document.getElementById(fieldName) as HTMLInputElement;
      const icon = document.getElementById(`${fieldName}-icon`) as HTMLElement;

      // Clear previous state
      if (element) element.innerHTML = '';
      if (icon) icon.classList.remove('fas', 'fa-exclamation');

      // If no message, clear and exit
      if (!message) {
        return;
      }

      // Display error message
      if (element) element.innerHTML = message;
      if (icon) icon.classList.add('fas', 'fa-exclamation');

      // PROFESSIONAL FIX: Single listener per field (not accumulated)
      // Only add listener if input exists
      if (!inputField) return;

      // Remove any existing listener to prevent accumulation
      // Create handler with once: true to auto-remove after first trigger
      const clearOnInput = () => {
        if (element) element.innerHTML = '';
        if (icon) icon.classList.remove('fas', 'fa-exclamation');
        // Will auto-remove due to { once: true }
      };

      // Use { once: true } for automatic cleanup after first input
      // This prevents memory leaks from accumulated listeners
      inputField.addEventListener('input', clearOnInput, { once: true });
    }
    private regexUsername(username: string): boolean {
      return /^[A-Za-z0-9]+$/.test(username);
    }
    private isEmail(email: string): boolean {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
    }
    public onSubmit: FormEventHandler<HTMLFormElement> | undefined = async (event) =>  {
      event.preventDefault();
      const {username, email, password, image} = state.input;

      if (!this.validate()) return;

      try {

        const formData = new FormData();
        formData.append('username', username.trim());
        formData.append('email', email.trim());
        formData.append('password', password.trim());
        if (image && typeof image !== 'string') {
          formData.append('image', image);
        }

        await clientAxios.post('/users', formData);
        dispatch({type: SUCCESS})
        CheckBeforeSend.messageNotification('send', 'Revise su correo electrónico para activar su cuenta. ¡Gracias por registrarse!');
        dispatch({type: INPUT})
      } catch (error) {

        const message = getErrorMessage(error);
        console.error('Registration error:', message, error);

        if (message == `${this.username.toLowerCase()} ya está registrado`) {
          CheckBeforeSend.messageNotification('username', message)
          return;
        }
        if (message == 'Este correo ya está registrado') {
          CheckBeforeSend.messageNotification('email', message)
          return;
        }
        if (message == 'El archivo excede el límite - (MAX 10MB)') {
          CheckBeforeSend.messageNotification('image', message)
          return;
        }
        if (message == 'Debe subir una imagen válida.') {
          CheckBeforeSend.messageNotification('image', message)
          return;
        }

        CheckBeforeSend.messageNotification('send', message);
      }
    }
    public onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const { name, value } = event.target;

      dispatch({
        type: INPUT_PAYLOAD,
        payload: {
          ...state.input,
          [name]: value
        }
      });
    }
    public handleFile: ChangeEventHandler<HTMLInputElement> = (event) => {
      const { name, files } = event.target;

      dispatch({
        type: INPUT_FILES,
        payload: {
          ...state.input,
          [name]: files![0]
        }
      });
    }
  }
  const { username, email, password, repeatPassword } = state.input;
  let check = new CheckBeforeSend(username, email, password, repeatPassword);

  // Config Radio Ev
  let audioRef = useRef<null | HTMLMediaElement>(null);
  const lastAudioElementRef = useRef<HTMLAudioElement | null>(null);
  const shouldBePlayingRef = useRef(false);

  const setAudioRef = (node: HTMLAudioElement | null): void => {
    audioRef.current = node;
    if (node) {
      lastAudioElementRef.current = node;
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    const getCurrentSong = async () => {
      try {
        const { data } = await clientAxios('/zeno');
        dispatch({ type: CURRENT_SONG, payload: data.title });
        dispatch({ type: STREAM_URL, payload: data.streamUrl });

        const audioEl = audioRef.current;
        const isPlayingRadio = audioEl && audioEl.src === data.streamUrl;
        if (isPlayingRadio) {
          dispatch({ type: AUDIO_TITLE, payload: data.title });
        }

        dispatch({ type: ZENO_API, payload: false });
      } catch (error) {
        const errorMsg = error as ErrorRequest;
        console.error('Zeno API error:', errorMsg.message);

        if (errorMsg.message === "Network Error") {
          localStorage.removeItem("token_ev");
          dispatch({ type: ZENO_API, payload: true });
        }
      }
    };

    getCurrentSong();
    interval = setInterval(getCurrentSong, 5000);

    return () => { if (interval) clearInterval(interval); };
  }, []);

  const getAudioSource = (src: string): string => {
    if (!src) return '';
    const trimmed = src.trim();
    if (/^https?:\/\//.test(trimmed)) return trimmed;
    const backend = process.env.BACKEND_URL?.replace(/\/$/, '') || window.location.origin;
    return `${backend}/${trimmed.replace(/^\//, '')}`;
  };

  const isValidStreamUrl = (url: string): boolean => {
    if (!url || !url.trim()) return false;
    const trimmed = url.trim();
    // Check if it's a valid URL
    return /^https?:\/\//.test(trimmed) && trimmed.length > 10;
  };

  const onPlay = async (): Promise<void> => {
    const audio = audioRef.current;
    if (!audio) return;

    // Ensure audio has a valid source
    if (!audio.src || !isValidStreamUrl(audio.src)) {
      console.warn('Audio has no valid source:', audio.src);
      dispatch({type: PLAY, payload: false});
      dispatch({type: IS_PLAYING, payload: false});
      shouldBePlayingRef.current = false;
      return;
    }

    // Determine current intended source based on audio.src (avoid relying on possibly stale state)
    const localPlayingFrom: 'radio' | 'post' = audio.src && audio.src === state.streamUrl ? 'radio' : 'post';

    if (localPlayingFrom === 'post') {
      // For on-demand audio, start from the beginning
      audio.currentTime = 0;
    } else {
      // For live radio, reload the live stream so resuming joins current live position
      if (!isValidStreamUrl(state.streamUrl)) {
        console.warn('Radio stream not ready yet. StreamUrl:', state.streamUrl);
        dispatch({type: PLAY, payload: false});
        dispatch({type: IS_PLAYING, payload: false});
        shouldBePlayingRef.current = false;
        return;
      }

      if (!audio.src || audio.src !== state.streamUrl) {
        audio.src = state.streamUrl;
      }

      try {
        audio.load();
      } catch (e) {
        // ignore load errors here, we'll try to play anyway
      }
    }

    try {
      shouldBePlayingRef.current = true;
      const playPromise = audio.play();
        if (playPromise !== undefined) {
        await playPromise;
        dispatch({type: PLAY, payload: true});
        dispatch({type: IS_PLAYING, payload: true});
      }
    } catch (error) {
      console.error('Play error:', error);
      shouldBePlayingRef.current = false;
      // Try to load and play after a short delay
          setTimeout(() => {
        if (shouldBePlayingRef.current && audio.src) {
          audio.load();
          audio.play().catch(err => {
            console.error('Retry play failed:', err);
            dispatch({type: PLAY, payload: false});
            dispatch({type: IS_PLAYING, payload: false});
            shouldBePlayingRef.current = false;
          });
        }
      }, 500);
    }
  };

  const onPause = (): void => {
    const audio = audioRef.current || lastAudioElementRef.current;
    if (!audio) return;

    // Mark user intent to stop before pausing to avoid recovery logic
    shouldBePlayingRef.current = false;
    audio.pause();
    dispatch({type: PLAY, payload: false});
    dispatch({type: IS_PLAYING, payload: false});
  };

  const toggleAudio = async (src?: string, audioTitle?: string): Promise<void> => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const requestedSrc = src?.trim();
    const requestedAudioSource = requestedSrc ? getAudioSource(requestedSrc) : '';
    const isSameSource = requestedSrc && state.currentAudio === requestedAudioSource;

    // If a specific source is requested
    if (requestedSrc) {
      if (!state.currentAudio || !isSameSource) {
        const audioSource = requestedAudioSource;
        if (!audioSource) {
          console.warn('toggleAudio: missing audio source');
          return;
        }
        if (!audio.paused) {
          audio.pause();
        }
        audio.src = audioSource;
        audio.load();
        audio.currentTime = 0;
        dispatch({type: CURRENT_AUDIO, payload: audioSource});
        
        // If audioTitle is provided, it's a post audio
        if (audioTitle) {
          dispatch({type: PLAYING_FROM, payload: 'post'});
          dispatch({type: AUDIO_TITLE, payload: audioTitle});
        }
        
        await onPlay();
      }
      return;
    }

    // Toggle play/pause on current audio
    // If no src is set (first time on radio), set it from streamUrl
    if (!audio.src || !audio.src.trim()) {
      // Validate that streamUrl is ready before using it
      if (!isValidStreamUrl(state.streamUrl)) {
        console.warn('Radio stream not ready yet. StreamUrl:', state.streamUrl);
        return;
      }
      
      audio.src = state.streamUrl;
      audio.load();
      audio.currentTime = 0;
      dispatch({type: CURRENT_AUDIO, payload: state.streamUrl});
      dispatch({type: PLAYING_FROM, payload: 'radio'});
      await onPlay();
    } else if (audio.paused) {
      await onPlay();
    } else {
      onPause();
    }
    // Ensure all code paths return
    return;
  };

  const playPostAudio = async (src: string, audioTitle: string): Promise<void> => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      const audioSource = getAudioSource(src.trim());
      if (!audioSource) {
        console.warn('playPostAudio: missing audio source');
        return;
      }

      if (!audio.paused) {
        audio.pause();
      }

      audio.src = audioSource;
      audio.load();
      audio.currentTime = 0;
      dispatch({type: CURRENT_AUDIO, payload: audioSource});
      dispatch({type: PLAYING_FROM, payload: 'post'});
      dispatch({type: AUDIO_TITLE, payload: audioTitle});
      
      // Just play directly without waiting
      await onPlay();
    } catch (error) {
      console.error('Error playing post audio:', error);
    }
    return;
  };

  const switchToRadio = async (): Promise<void> => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      // Validate that streamUrl is valid before switching
      if (!isValidStreamUrl(state.streamUrl)) {
        console.warn('Radio stream not ready yet. StreamUrl:', state.streamUrl);
        return;
      }

      if (!audio.paused) {
        audio.pause();
      }

      audio.src = state.streamUrl;
      audio.load();
      audio.currentTime = 0;
      dispatch({type: CURRENT_AUDIO, payload: state.streamUrl});
      dispatch({type: PLAYING_FROM, payload: 'radio'});
      dispatch({type: AUDIO_TITLE, payload: state.currentSong});
      
      // Just play directly
      await onPlay();
    } catch (error) {
      console.error('Error switching to radio:', error);
    }
    return;
  };

  const volume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({type: VOLUME_VALUE, payload: parseFloat(e.target.value)})
  }
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    let unexpectedPauseTimeout: ReturnType<typeof setTimeout> | null = null;

    const handlePlayEvent = () => {
      dispatch({type: PLAY, payload: true});
      dispatch({type: IS_PLAYING, payload: true});
      shouldBePlayingRef.current = true;
      // Clear any pending retry
      if (unexpectedPauseTimeout) clearTimeout(unexpectedPauseTimeout);
    };

    const handlePauseEvent = () => {
      // When the audio element is paused by an external source (e.g. phone voice recording,
      // browser audio focus changes), do not force resume automatically.
      shouldBePlayingRef.current = false;
      dispatch({type: PLAY, payload: false});
      dispatch({type: IS_PLAYING, payload: false});
    };

    const handleErrorEvent = (event: Event) => {
      console.error('Audio error event:', event);
      dispatch({type: PLAY, payload: false});
      dispatch({type: IS_PLAYING, payload: false});
      shouldBePlayingRef.current = false;

      if (audio.src) {
        unexpectedPauseTimeout = setTimeout(() => {
          if (shouldBePlayingRef.current || !audio.src) return;
          audio.load();
          audio.play().catch(err => {
            console.error('Recovery after audio error failed:', err);
            dispatch({type: PLAY, payload: false});
            dispatch({type: IS_PLAYING, payload: false});
            shouldBePlayingRef.current = false;
          });
        }, 1000);
      }
    };

    const handleSuspendEvent = () => {
      console.warn('Audio suspend event - stream may have paused unexpectedly');
      shouldBePlayingRef.current = false;
      dispatch({type: PLAY, payload: false});
      dispatch({type: IS_PLAYING, payload: false});
    };

    const syncAudioState = () => {
        if (!audio) return;

        const actuallyPlaying =
          !audio.paused &&
          !audio.ended &&
          audio.readyState > 2;

        dispatch({
          type: PLAY,
          payload: actuallyPlaying
        });

        dispatch({
          type: IS_PLAYING,
          payload: actuallyPlaying
        });

        shouldBePlayingRef.current = actuallyPlaying;
      };

    audio.volume = state.volumeValue / 100;
    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);
    audio.addEventListener('ended', handlePauseEvent);
    audio.addEventListener('error', handleErrorEvent);
    audio.addEventListener('suspend', handleSuspendEvent);
    document.addEventListener('visibilitychange', syncAudioState);

    // Synchronize state when the page regains visibility or focus on mobile/desktop.
    document.addEventListener('visibilitychange', syncAudioState);
    const handleFocus = () => setTimeout(syncAudioState, 200);
    const handlePageShow = () => setTimeout(syncAudioState, 200);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      if (unexpectedPauseTimeout) clearTimeout(unexpectedPauseTimeout);
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
      audio.removeEventListener('ended', handlePauseEvent);
      audio.removeEventListener('error', handleErrorEvent);
      audio.removeEventListener('suspend', handleSuspendEvent);
      document.removeEventListener('visibilitychange', syncAudioState);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [state.volumeValue]);

  // Chat
  const handleChat = () => {
    dispatch({type: OPEN_CHAT});
    dispatch({type: CLOSE_LOGIN_CHAT, payload: false});
  }

  // Handle of all files
  const handleFile: HandleFileCallback<Auth | MyPostTypes> = (
    event,
    cb,
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, files } = target;

    if (!files || !files[0]) return;

    const file = files[0];

    // Disable audio uploads temporarily — show friendly message and do not attach the file
    if (file.type.startsWith('audio/')) {
      CheckBeforeSend.messageNotification('fileError', 'por ahora no podemos ponernos romanticos');
      // clear input value so same file can be selected later if needed
      target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (file.type.startsWith('image/')) {
        dispatch({ type: PREVIEW_IMAGE, payload: result });
      }
    };

    reader.onloadend = () => {
      target.value = '';
    };

    reader.readAsDataURL(file);

    cb((prev) => ({
      ...prev,
      [name]: file
    }));
  };

  const radio = {
    audioRef,
    setAudioRef,
    currentAudio: state.currentAudio,
    volume,
    volumeValue: state.volumeValue,
    onPlay,
    onPause,
    isPlaying: state.isPlaying,
    play: state.play,
    toggleAudio,
    playPostAudio,
    switchToRadio,
    currentSong: state.currentSong,
    audioTitle: state.audioTitle,
    playingFrom: state.playingFrom,
    streamUrl: state.streamUrl
  }

  const register = {
    check,
    success: state.success,
    username,
    email,
    password,
    messageNotification: CheckBeforeSend.messageNotification,
    repeatPassword,
  }
  const global = {
    dispatch,
    openChat: state.openChat,
    handleChat,
    isFooter: state.isFooter,
    closeLoginChat: state.closeLoginChat,
    menuNav: state.menuNav,
    inputRef,
    handleFile,
    zIndexLoading: state.zIndexLoading,
    previewImage: state.previewImage,
    previewAudio: state.previewAudio
  }

  const value = {
    ...radio,
    ...register,
    ...global
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )

}

