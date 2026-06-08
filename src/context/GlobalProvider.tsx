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
  SUBMIT_START,
  SUBMIT_END
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
    isSubmitting: false,
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

      dispatch({ type: SUBMIT_START });

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
        CheckBeforeSend.messageNotification('send', 'Cuenta creada correctamente. Revisa tu correo para activarla. ¡Gracias por registrarse!');
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
      } finally {
          // Ensure we always end the submitting state to re-enable the form
          dispatch({ type: SUBMIT_END });
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

    // =========================
    // AUDIO REFS
    // =========================
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lastAudioElementRef = useRef<HTMLAudioElement | null>(null);
    // tracks whether the user explicitly requested play (true) or pause (false)
    // null means no explicit user action yet
    const userRequestedPlayRef = useRef<boolean | null>(null);
    // tracks if user clicked play while stream URL wasn't ready yet
    const pendingPlayRequestRef = useRef<boolean>(false);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

    const setAudioRef = (node: HTMLAudioElement | null): void => {
      audioRef.current = node;
      setAudioElement(node);
      if (node) lastAudioElementRef.current = node;
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

        // AUTO-PLAY if user requested play while URL wasn't ready
        if (pendingPlayRequestRef.current && audioEl && !audioEl.src) {
          audioEl.src = data.streamUrl;
          audioEl.load();
          audioEl.currentTime = 0;
          dispatch({ type: CURRENT_AUDIO, payload: data.streamUrl });
          dispatch({ type: PLAYING_FROM, payload: 'radio' });
          dispatch({ type: AUDIO_TITLE, payload: data.title });
          
          try {
            await audioEl.play();
            dispatch({ type: PLAY, payload: true });
            dispatch({ type: IS_PLAYING, payload: true });
            userRequestedPlayRef.current = true;
          } catch (playError) {
            console.error("Auto-play error after URL loaded:", playError);
            dispatch({ type: PLAY, payload: false });
            dispatch({ type: IS_PLAYING, payload: false });
          }
          
          pendingPlayRequestRef.current = false;
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

  const resetAudioSource = (): void => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.removeAttribute('src');
    audio.load();
  };

  const isValidStreamUrl = (url: string): boolean => {
    if (!url || !url.trim()) return false;
    const trimmed = url.trim();
    // Check if it's a valid URL
    return /^https?:\/\//.test(trimmed) && trimmed.length > 10;
  };

    // =========================
    // PLAY
    // =========================
    const onPlay = async (): Promise<void> => {
      const audio = audioRef.current;
      if (!audio) return;

      const audioSrcAttribute = audio.getAttribute('src');
      if (!audioSrcAttribute) {
        dispatch({ type: PLAY, payload: false });
        dispatch({ type: IS_PLAYING, payload: false });
        return;
      }

      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }

        dispatch({ type: PLAY, payload: true });
        dispatch({ type: IS_PLAYING, payload: true });
      } catch (error) {
        console.error("Play error:", error);

        dispatch({ type: PLAY, payload: false });
        dispatch({ type: IS_PLAYING, payload: false });
      }
    };


      // =========================
      // PAUSE
      // =========================
      const onPause = (): void => {
        const audio = audioRef.current || lastAudioElementRef.current;
        if (!audio) return;

        userRequestedPlayRef.current = false;
        audio.pause();
        resetAudioSource();
        dispatch({ type: PLAY, payload: false });
        dispatch({ type: IS_PLAYING, payload: false });
      };


    // =========================
    // TOGGLE
    // =========================
    const toggleAudio = async (src?: string, audioTitle?: string): Promise<void> => {
      const audio = audioRef.current;
      if (!audio) return;

      const requestedSrc = src?.trim();

      if (requestedSrc) {
        const audioSource = getAudioSource(requestedSrc);

        if (!audioSource) return;

        audio.pause();
        audio.src = audioSource;
        audio.load();
        audio.currentTime = 0;

        dispatch({ type: CURRENT_AUDIO, payload: audioSource });

        if (audioTitle) {
          dispatch({ type: PLAYING_FROM, payload: 'post' });
          dispatch({ type: AUDIO_TITLE, payload: audioTitle });
        }

        userRequestedPlayRef.current = true;
        pendingPlayRequestRef.current = false;
        await onPlay();
        return;
      }

      const audioSrcAttribute = audio.getAttribute('src');

      if (!audioSrcAttribute) {
        const audioSource = state.currentAudio || state.streamUrl;
        const playingFromSource = state.currentAudio ? state.playingFrom : 'radio';
        const audioTitleSource = state.currentAudio ? state.audioTitle : state.currentSong;

        if (!audioSource) {
          // URL NOT READY YET - Mark as pending play request to auto-play when URL loads
          pendingPlayRequestRef.current = true;
          return;
        }

        audio.src = audioSource;
        audio.load();
        audio.currentTime = 0;

        dispatch({ type: CURRENT_AUDIO, payload: audioSource });
        dispatch({ type: PLAYING_FROM, payload: playingFromSource });
        dispatch({ type: AUDIO_TITLE, payload: audioTitleSource });

        userRequestedPlayRef.current = true;
        pendingPlayRequestRef.current = false;
        await onPlay();
        return;
      }

      const actualPaused = audio.paused || audio.ended;

      if (actualPaused) {
        userRequestedPlayRef.current = true;
        pendingPlayRequestRef.current = false;
        await onPlay();
      } else {
        userRequestedPlayRef.current = false;
        pendingPlayRequestRef.current = false;
        onPause();
      }
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

      userRequestedPlayRef.current = true;
      audio.src = audioSource;
      audio.load();
      audio.currentTime = 0;
      dispatch({ type: CURRENT_AUDIO, payload: audioSource });
      dispatch({ type: PLAYING_FROM, payload: 'post' });
      dispatch({ type: AUDIO_TITLE, payload: audioTitle });
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

      userRequestedPlayRef.current = true;
      audio.src = state.streamUrl;
      audio.load();
      audio.currentTime = 0;
      dispatch({ type: CURRENT_AUDIO, payload: state.streamUrl });
      dispatch({ type: PLAYING_FROM, payload: 'radio' });
      dispatch({ type: AUDIO_TITLE, payload: state.currentSong });
      await onPlay();
    } catch (error) {
      console.error('Error switching to radio:', error);
    }
    return;
  };

  const volume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({type: VOLUME_VALUE, payload: parseFloat(e.target.value)})
  }
  
     // =========================
      // AUDIO EVENTS (CLEAN)
      // =========================
      useEffect(() => {
        const audio = audioElement;
        if (!audio) {
          return undefined;
        }

        const handlePlayEvent = () => {
          dispatch({ type: PLAY, payload: true });
          dispatch({ type: IS_PLAYING, payload: true });
        };

        const handlePauseEvent = () => {
          userRequestedPlayRef.current = false;
          resetAudioSource();
          dispatch({ type: PLAY, payload: false });
          dispatch({ type: IS_PLAYING, payload: false });
        };

        const handleErrorEvent = (event: Event) => {
          console.error("Audio error:", event);
          dispatch({ type: PLAY, payload: false });
          dispatch({ type: IS_PLAYING, payload: false });
        };

        audio.addEventListener("play", handlePlayEvent);
        audio.addEventListener("pause", handlePauseEvent);
        audio.addEventListener("ended", handlePauseEvent);
        audio.addEventListener("error", handleErrorEvent);

        audio.volume = state.volumeValue / 100;

        return () => {
          audio.removeEventListener("play", handlePlayEvent);
          audio.removeEventListener("pause", handlePauseEvent);
          audio.removeEventListener("ended", handlePauseEvent);
          audio.removeEventListener("error", handleErrorEvent);
        };
    }, [audioElement, state.volumeValue]);

    useEffect(() => {
      const audio = audioElement;
      if (!audio || !('mediaSession' in navigator)) return undefined;

      navigator.mediaSession.metadata = new MediaMetadata({
        title: state.audioTitle || state.currentSong || 'Radio Ev',
        artist: 'Radio Ev',
        album: state.playingFrom === 'radio' ? 'Radio en Vivo' : 'Audio Post'
      });

      navigator.mediaSession.setActionHandler('play', async () => {
        const audioSrcAttribute = audio.getAttribute('src');
        if (!audioSrcAttribute) {
          audio.src = state.currentAudio || state.streamUrl;
          audio.load();
        }
        userRequestedPlayRef.current = true;
        try {
          await audio.play();
        } catch (error) {
          console.warn('Media session play blocked:', error);
        }
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        audio.pause();
      });

      navigator.mediaSession.setActionHandler('stop', () => {
        audio.pause();
      });

      return () => {
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('stop', null);
      };
    }, [audioElement, state.audioTitle, state.currentSong, state.currentAudio, state.streamUrl]);

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
    previewAudio: state.previewAudio,
    isSubmitting: state.isSubmitting
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

