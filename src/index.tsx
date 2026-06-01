/*-----------------------------------------------------------------------------------

    Name: Radio Ev
    Description: Radio Enchufe Virtual
    Author: @soychendo - chendo | developer && web designer
    Author URI: https://facebook.com/soychendo
    Github: https://github.com/soychendo
    Youtube: https://youtube.com/@soychendoo

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
