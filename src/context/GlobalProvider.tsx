import React, { useState, useRef, useEffect, useReducer } from "react";
import type {  FormEventHandler, ChangeEventHandler } from 'react';
import { GlobalProviderTypes, Auth, HandleFileCallback, MyPostTypes, GLOBAL_STATE } from "./types";
import { GlobalContext } from "./GlobalContext";
import { ErrorResponse, ErrorRequest } from "types/types";
import { clientAxios } from "../config/axios";
import { globalReducer } from "./globalReducer";
import {
  CURRENT_AUDIO,
  INPUT,
  SUCCESS,
  IS_FOOTER,
  VOLUME_VALUE,
  OPEN_CHAT,
  CLOSE_LOGIN_CHAT,
  MENU_NAV,
  PREVIEW_IMAGE,
  PREVIEW_AUDIO,
  PLAY,
  ZINDEX_LOADING,
  CURRENT_SONG,
  IS_PLAYING,
  ZENO_API,
  INPUT_PAYLOAD,
  INPUT_FILES
} from "./constants";

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
      if (element) element.innerHTML = message;
      const inputField = document.getElementById(fieldName) as HTMLInputElement;

      const icon = document.getElementById(`${fieldName}-icon`) as HTMLElement;
      if (icon) icon.classList.add('fas', 'fa-exclamation');

      inputField?.addEventListener('input', () => {
        if (element) element.innerHTML = ''
        if (icon) icon.classList.remove('fas', 'fa-exclamation')
      });
      if (!message) {
        icon.classList.remove('fas', 'fa-exclamation')
      }
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
        formData.append('image', image);

        await clientAxios.post('/users', formData);
        dispatch({type: SUCCESS})
        CheckBeforeSend.messageNotification('send', 'Revise su correo electrónico para activar su cuenta. ¡Gracias por registrarse!');
        dispatch({type: INPUT})
      } catch (error) {

        const { message } = (error as ErrorResponse).response.data;
        if (message == `${this.username.toLowerCase()} ya está registrado`) {
          CheckBeforeSend.messageNotification('username', message)
        }
        if (message == 'Este correo ya está registrado') {
          CheckBeforeSend.messageNotification('email', message)
        }
        if (message == 'El archivo excede el límite - (MAX 10MB)') {
          CheckBeforeSend.messageNotification('image', message)
        }
        if (message == 'Debe subir una imagen válida.') {
          CheckBeforeSend.messageNotification('image', message)
        }

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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const getCurrentSong = async () => {
      try {
        const { data } = await clientAxios('/zeno');
        dispatch({ type: CURRENT_SONG, payload: data.title })
        dispatch({type: ZENO_API, payload: false});
      } catch (error) {
        const errorMsg = error as ErrorRequest;

        if (errorMsg.message === "Network Error") {
          localStorage.removeItem("token_ev");
          dispatch({type: ZENO_API, payload: true});
        }
      }
    };

    if (!state.zenoAPI) {
      interval = setInterval(getCurrentSong, 5000);
    }

    return () => clearInterval(interval);
  }, [state.zenoAPI]);

  const onPlay = async () => {
    const audio = audioRef.current;
    audio?.load();
    audio?.play();
    dispatch({type: PLAY, payload: true});
    dispatch({type: IS_PLAYING, payload: true});
  }
  const onPause = (): void => {
    const audio = audioRef.current;
    audio?.pause();
    dispatch({type: PLAY, payload: false});
    dispatch({type: IS_PLAYING, payload: false});
  }
  const toggleAudio = async (src: string): Promise<void> => {
    const audio = audioRef.current;

    if (!src) {
      if (audio.paused) {
        onPlay();
      } else {
        onPause()
      }
      return;
    }
    if (!state.currentAudio || state.currentAudio !== src) {
      audio.src = `${process.env.BACKEND_URL}/${src}`;
      dispatch({type: CURRENT_AUDIO, payload: src});
      onPlay();
    } else {
      if (audio.paused) {
        onPlay();
      } else {
        onPause();
      }
    }
  };

  const volume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({type: VOLUME_VALUE, payload: parseFloat(e.target.value)})
  }
  useEffect(() => {
    const audio = audioRef.current;
    audio ? audio.volume = state.volumeValue / 100 : null;
  }, [state.volumeValue, audioRef]);

  // Chat
  const handleChat = () => {
    dispatch({type: OPEN_CHAT});
    dispatch({type: CLOSE_LOGIN_CHAT});
  }

  // Handle of all files
  const handleFile: HandleFileCallback<Auth | MyPostTypes> = (
    event,
    cb,
  ) => {
    const { name, files } = event.target;
    // Reset the value of the file input element

    if (files && files[0]) {
      const reader = new FileReader();
      // Read audio and image files
      reader.onload = ( { target } ) => {
        if (files[0].type.startsWith('image/')) {
          dispatch({type: PREVIEW_IMAGE, payload: target.result});
        } else if (files[0].type.startsWith('audio/')) {
          dispatch({
            type: PREVIEW_AUDIO,
            payload: {
              name: files[0].name,
              size: files[0].size
            }
          });
        }
      };
      // We reset the value of the event when it finishes reading and the data is sent
      reader.onloadend = () => event.target.value = '';
      // Read the contents of the specified Blob or File
      reader.readAsDataURL(files[0]);

      cb((prev) => ({
        ...prev,
        [name]: files![0]
      }));
    }
  };

  const radio = {
    audioRef,
    volume,
    volumeValue: state.volumeValue,
    onPlay,
    onPause,
    isPlaying: state.isPlaying,
    play: state.play,
    toggleAudio,
    currentSong: state.currentSong
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

