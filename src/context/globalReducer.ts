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
import { GLOBAL_STATE, GLOBAL_ACTION } from "./types";

export function globalReducer (state: GLOBAL_STATE, action: GLOBAL_ACTION) {

  const { type, payload } = action;

  const { input, openChat } = state;

  switch (type) {
    case SUCCESS:
      return {
        ...state,
        success: true
      };
    case INPUT:
      return {
        ...state,
        input: {
          username: '',
          email: '',
          password: '',
          repeatPassword: '',
          image: ''
        }
      };
    case INPUT_PAYLOAD:
      return {
        ...state,
        input: {
          ...input,
          ...payload
        }
      };
    case INPUT_FILES:
      return {
        ...state,
        input: {
          ...input,
          ...payload
        }
      };
    case CURRENT_SONG:
      return {
        ...state,
        currentSong: payload
      };
    case ZENO_API:
      return {
        ...state,
        zenoAPI: payload
      };
    case PLAY:
      return {
        ...state,
        play: payload
      };
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: payload
      };
    case CURRENT_AUDIO:
      return {
        ...state,
        currentAudio: payload
      };
    case VOLUME_VALUE:
      return {
        ...state,
        volumeValue: payload
      };
    case OPEN_CHAT:
      return {
        ...state,
        openChat: !openChat
      };
    case ZINDEX_LOADING:
      return {
        ...state,
        zIndexLoading: payload
      };
    case CLOSE_LOGIN_CHAT:
      return {
        ...state,
        closeLoginChat: payload
      };
    case MENU_NAV:
      return {
        ...state,
        menuNav: payload
      };
    case IS_FOOTER:
      return {
        ...state,
        isFooter: payload
      };
    case PREVIEW_IMAGE:
      return {
        ...state,
        previewImage: payload
      };
    case PREVIEW_AUDIO:
      return {
        ...state,
        previewAudio: {
          name: action.payload.name,
          size: action.payload.size,
        }
      };

    default:
      return state;
  }

}
