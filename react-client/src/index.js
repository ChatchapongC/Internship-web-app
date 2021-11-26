import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'react-app-polyfill/stable'
import App from './app/App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render( 
    <BrowserRouter >
        <App />
    </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();                                                                                                                                                                      