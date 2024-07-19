import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  const WebSocketClient = require('./WebSocketClient');
  WebSocketClient.initSocket();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
