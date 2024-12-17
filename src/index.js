// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './routes';
import { Provider } from 'react-redux';
import { AuthProvider } from './contexts/AuthContext';
import store from './redux/store';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
<Provider store={store}>
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
</Provider>
);
