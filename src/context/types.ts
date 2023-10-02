import type {
  ReactNode,
  FormEventHandler,
  ChangeEventHandler,
  MouseEventHandler,
  RefObject,
  Dispatch,
  SetStateAction
} from "react"
import {
  CURRENT_AUDIO,
  INPUT,
  INPUT_PAYLOAD,
  INPUT_FILES,
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
  ZENO_API
} from "./constants";

interface InputTypes {
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
  image: string
}

export interface GLOBAL_ACTION {
  type:
    | typeof CURRENT_AUDIO
    | typeof INPUT
    | typeof INPUT_PAYLOAD
    | typeof INPUT_FILES
    | typeof SUCCESS
    | typeof IS_FOOTER
    | typeof VOLUME_VALUE
    | typeof OPEN_CHAT
    | typeof CLOSE_LOGIN_CHAT
    | typeof MENU_NAV
    | typeof PREVIEW_IMAGE
    | typeof PREVIEW_AUDIO
    | typeof PLAY
    | typeof ZINDEX_LOADING
    | typeof CURRENT_SONG
    | typeof IS_PLAYING
    | typeof ZENO_API;
  payload?: any; // You can specify the payload type here if needed
}

export interface GLOBAL_STATE {
  currentAudio: string,
  input: InputTypes,
  success: boolean,
  isFooter: boolean,
  volumeValue: number,
  openChat: boolean,
  closeLoginChat: boolean,
  menuNav: boolean,
  previewImage: string,
  previewAudio: {name: string, size: number},
  play: boolean,
  zIndexLoading: number,
  currentSong: string,
  isPlaying: boolean,
  zenoAPI: boolean,
}

export type GlobalProviderTypes = {
  children: ReactNode
}

type CheckType = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined,
  onChange: ChangeEventHandler<HTMLInputElement>
  handleFile: ChangeEventHandler<HTMLInputElement>
}

export type StateUpdater<T> = Dispatch<SetStateAction<T>>;

export type HandleFileCallback<T extends Auth | MyPostTypes> = (
  event: React.ChangeEvent<HTMLInputElement>,
  cb: StateUpdater<T>,
) => void;

export type ContextProps = {
  dispatch: Dispatch<GLOBAL_ACTION>
  check: CheckType,
  success: boolean,
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
  messageNotification: (fieldName: string, message: string) => void;
  toggleAudio: (src?: string) => Promise<void>,
  volume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlay: () => Promise<void>;
  onPause: () => void;
  play: boolean;
  isPlaying: boolean;
  audioRef: RefObject<HTMLAudioElement>;
  isFooter: boolean,
  volumeValue: number,
  handleChat: () => void,
  openChat: boolean,
  closeLoginChat: boolean,
  menuNav: boolean,
  inputRef: RefObject<HTMLTextAreaElement>,
  zIndexLoading: number,
  currentSong: string,
  handleFile: HandleFileCallback<Auth | MyPostTypes>
  previewImage: string,
  previewAudio: { name: string, size: number }
}

// AuthProvider

export type Auth = {
  createAt: string,
  description: string,
  email: string,
  id: number | string,
  image: string | File,
  name: string,
  username: string,
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
  profile: Auth,
  setProfile: React.Dispatch<React.SetStateAction<Auth>>,
  authUser: () => Promise<void>,
  setAuth: React.Dispatch<React.SetStateAction<Auth>>,
  logOut: () => void,
  loading: boolean,
  updateProfile: (data: Auth) => void,
  updateUserPassword: (data: UpdateUserDataTypes) => void,
  isUpdating: boolean,
  success: boolean,
  loadingPage: boolean,
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>,
  invalidToken: string
}

export interface Messages {
  from: string,
  body: string,
  image: string | Blob,
  name: string,
  user?: {
    id: number,
    image: string,
    name: string,
    username: string
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

export type MyPostTypes = {
  content: string,
  image: string,
  audio: string
}
export type NextQuery = {
  limit: number
}


export interface PostContextProps {

  handleQuery: () => void,
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  handlePost: MouseEventHandler<HTMLFormElement>
  hasMoreResults: boolean,
  handleShowForm: () => void,
  setMyPost: React.Dispatch<React.SetStateAction<MyPostTypes>>,
  setCloseImage: React.Dispatch<React.SetStateAction<boolean>>,
  closeImage: boolean,
  setCloseAudio: React.Dispatch<React.SetStateAction<boolean>>,
  closeAudio: boolean,
  dataPosts: () => Promise<void>,
  sendPost: boolean,
  myPost: {
    content: string,
    image: string,
    audio: string
  }
  nextQuery: {
    limit: number,
  },
  setNextQuery: React.Dispatch<React.SetStateAction<NextQuery>>,
  posts: {
    comments: [];
    createAt: string;
    id: number;
    content: string;
    image: string
    audio: string,
    nameAudio: string,
    user: { image: string; name: string; username: string };
    userId: number
  }[];
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  showForm: boolean,
  formRef: RefObject<HTMLFormElement>,
  textAreaRef: RefObject<HTMLTextAreaElement>,
}

export interface CardPostItemTypes {
  user: {
    image: string,
    name: string,
    username: string
  },
  content: string,
  image: string,
  id: number,
  audio: string,
  nameAudio: string,
  createAt: string
}
