import { createGlobalStyle } from 'styled-components';
import {
  DEFAULT_BG_COLOR,
  DEFAULT_COLOR,
  SELECT_DEFAULT_COLOR,
  SCROLL_BG
} from './constants';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    border: 0;
    box-sizing: border-box;
    font-variant-numeric: tabular-nums;
    margin: 0;
    outline: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    -webkit-touch-callout: none;
  }
  ::selection {
      background: ${SELECT_DEFAULT_COLOR};
      color: #fff;
  }
  ::-moz-selection {
      background: ${SELECT_DEFAULT_COLOR};
      color: #fff;
  }
  :host {
    height: 200px !important;
  }
  /*------bar scroll-------*/
* { scrollbar-width: thin;}

  :root {
    scrollbar-color: #000 ${SCROLL_BG} !important;
  }
  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    position: relative;
    z-index: 10;
    background-color: transparent;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: ${SCROLL_BG};
    border-radius: 4px;
  }
  @media (max-width: 768px) {
    ::-webkit-scrollbar {display: none;}
  }
  /*-----------------------------*/
  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    background-size: cover;
    height: 100%;
    overflow-x: hidden;
  }
  body {
    background-color: ${DEFAULT_BG_COLOR};
    color: ${DEFAULT_COLOR};
    overscroll-behavior: none;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    height: 100%;
  }

  #root {
    height: 350px !important;
  }

`
