import type { ReactNode, FormEventHandler, ChangeEventHandler, RefObject } from "react"
import React from "react"

export type RegisterForm = {
  name: string,
  email: string,
  password: string,
  repeatPassword: string,
  image: string | Blob
}

export type GlobalProviderTypes = {
  children: ReactNode
}

type CheckType = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined,
  onChange: ChangeEventHandler<HTMLInputElement>
  handleFile: ChangeEventHandler<HTMLInputElement>
}

export type ContextProps = {
  check: CheckType,
  success: boolean,
  name: string,
  email: string,
  password: string,
  repeatPassword: string,
  messageNotification: (fieldName: string, message: string) => void;
  toggleAudio: () => Promise<void>,
  volume: (e: React.ChangeEvent<HTMLInputElement>) => void,
  play: boolean,
  audioRef: RefObject<HTMLAudioElement>,
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
  isFooter: boolean,
  setVolumeValue: React.Dispatch<React.SetStateAction<number>>;
  volumeValue: number,
  handleChat: () => void,
  openChat: boolean,
  setCloseLoginChat: React.Dispatch<React.SetStateAction<boolean>>;
  closeLoginChat: boolean,
  setMenuNav: React.Dispatch<React.SetStateAction<boolean>>;
  menuNav: boolean,
  inputRef: RefObject<HTMLTextAreaElement>
}

// AuthProvider

export type Auth = {
  createAt: string,
  description: string,
  email: string,
  id: number | string,
  image: string | Blob,
  name: string,
  role: string,
  social?: {
    facebook: string,
    instagram: string,
    github: string,
    twitter: string
  }
}

interface UpdateUserDataTypes {
  password: string,
  new_password: string,
}

export interface AuthContextProps {
  auth: Auth,
  authUser: () => Promise<void>,
  setAuth: React.Dispatch<React.SetStateAction<Auth>>,
  logOut: () => void,
  loading: boolean,
  updateProfile: (data: Auth) => void,
  updateUserPassword: (data: UpdateUserDataTypes) => void,
  isUpdating: boolean,
  success: boolean,
  loadingPage: boolean,
  invalidToken: string
}

export interface Messages {
  from: string,
  body: string,
  image: string | Blob,
  user?: {
    id: number,
    image: string,
    name: string
  },
  userId?: string | number,
  createAt: Date,
}

export interface SocketContextProps {
  messages: Messages[],
  handleSubmit: React.FormEventHandler<HTMLFormElement>,
  isInputEmpty: boolean
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  message: string,
  lastMessageRef: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLDivElement>,
  allowed: boolean,
  setAllowed: React.Dispatch<React.SetStateAction<boolean>>,
  loadingChat: boolean
}
