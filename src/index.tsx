/*-----------------------------------------------------------------------------------

    Name: Radio Ev
    Description: Radio Enchufe Virtual
    Author: @chendodev - chendo | developer && web designer
    Author URI: https://facebook.com/chendodev
    Github: https://github.com/chendodev
    Youtube: https://youtube.com/@chendodev

-----------------------------------------------------------------------------------*/
import React from 'react'
import ReactDom from 'react-dom/client'
import { App } from './app';

const container = document.getElementById('app')
const root = ReactDom.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
