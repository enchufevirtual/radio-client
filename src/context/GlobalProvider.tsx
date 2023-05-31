import React, { useState, useRef, useEffect } from "react";
import type {  FormEventHandler, ChangeEventHandler } from 'react';
import { GlobalProviderTypes, RegisterForm } from "./types";
import { GlobalContext } from "./GlobalContext";
import { ErrorResponse } from "types/types";
import { clientAxios } from "../config/axios";

const initialState = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  image: ''
}

export const GlobalProvider = ({children}: GlobalProviderTypes) => {
  const [input, setInput] = useState<RegisterForm>(initialState);
  const [success, setSuccess] = useState(false);
  const [isFooter, setIsFooter] = useState(true);
  const [volumeValue, setVolumeValue] = useState(70);
  const [openChat, setOpenChat] = useState(false);
  const [closeLoginChat, setCloseLoginChat] = useState(false);
  const [menuNav, setMenuNav] = useState(false);
  // Audio Player
  const [play, setPlay] = useState(false);

  class CheckBeforeSend {

    private name: string;
    private email: string;
    private password: string;
    private repeatPassword: string

    constructor(name: string, email: string, password: string, repeatPassword: string) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.repeatPassword = repeatPassword
    }
    protected validate() {
      const nameValue = this.name.trim();
      const emailValue = this.email.trim();
      const passwordValue = this.password.trim();
      const repeatPasswordValue = this.repeatPassword.trim();
      let result = true;

      if (!nameValue) {
        CheckBeforeSend.messageNotification('name', 'El nombre es obligatorio');
        result = false;
      } else if (!this.regexName(nameValue)) {
        CheckBeforeSend.messageNotification('name', 'El campo "Nombre" solo acepta letras y espacios.');
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
    private regexName(name: string): boolean {
      return /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(name);
    }
    private isEmail(email: string): boolean {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
    }
    public onSubmit: FormEventHandler<HTMLFormElement> | undefined = async (event) =>  {
      event.preventDefault();
      const {name, email, password, image} = input;

      if (!this.validate()) return;

      try {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        await clientAxios.post('/users', formData);
        setSuccess(true);
        CheckBeforeSend.messageNotification('send', 'Revise su correo electrónico para activar su cuenta. ¡Gracias por registrarse!');
        setInput({
          name: '',
          email: '',
          password: '',
          repeatPassword: '',
          image: ''
        })
      } catch (error) {
        console.log(error)
        const { message } = (error as ErrorResponse).response.data;
        if (message == 'Este correo ya está registrado') {
          CheckBeforeSend.messageNotification('email', message)
        }
        if (message == 'El archivo excede el límite - (MAX 2MB)') {
          CheckBeforeSend.messageNotification('image', message)
        }
        if (message == 'Debe subir una imagen válida.') {
          CheckBeforeSend.messageNotification('image', message)
        }

      }
    }
    public onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const { name, value } = event.target;

      setInput({
        ...input,
        [name]: value
      })
    }
    public handleFile: ChangeEventHandler<HTMLInputElement> = (event) => {
      const { name, files } = event.target;

      setInput({
        ...input,
        [name]: files![0]
      })
    }

  }
  const { name, email, password, repeatPassword } = input;
  let check = new CheckBeforeSend(name, email, password, repeatPassword);

  // Config Radio Ev
  let audioRef = useRef<null | HTMLMediaElement>(null);
  let isPlaying = false;

  const onPlay = (): void => {
    const audio = audioRef.current;
    audio?.play();
    setPlay(true);
    isPlaying = true;
  }
  const onPause = (): void => {
    const audio = audioRef.current;
    audio?.pause();
    setPlay(false);
    isPlaying = false;
  }
  const toggleAudio = async (): Promise<void>  => {
    const audio = audioRef.current;
    if(audio?.paused && !isPlaying) { return onPlay(); }
    else { if(!audio?.paused) { return onPause(); } }
  }
  const volume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVolumeValue(parseFloat(e.target.value))
  }
  useEffect(() => {
    const audio = audioRef.current;
    audio ? audio.volume = volumeValue / 100 : null;
  }, [volumeValue, audioRef]);

  // Chat
  const handleChat = () => {
    setOpenChat(!openChat);
    setCloseLoginChat(true);
  }

  const radio = {
    audioRef,
    volume,
    volumeValue,
    setVolumeValue,
    play,
    toggleAudio,
  }

  const register = {
    check,
    success,
    name,
    email,
    password,
    messageNotification: CheckBeforeSend.messageNotification,
    repeatPassword,
  }
  const global = {
    openChat,
    handleChat,
    setIsFooter,
    isFooter,
    setCloseLoginChat,
    closeLoginChat,
    setMenuNav,
    menuNav
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

