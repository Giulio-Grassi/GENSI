import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PaletteStoreProvider } from './theme';
import {TimerView, PaletteView} from "./AppTEST"
import AppTEST from "./AppTEST"

// ReactDOM.render(
// <PaletteStoreProvider><App /></PaletteStoreProvider>
// , document.getElementById('root'));

// ReactDOM.render( 
// <AppTEST></AppTEST>, 
// document.getElementById('root'));



ReactDOM.render(<AppTEST />, document.body)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
