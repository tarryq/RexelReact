// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './routes';
import { AuthProvider } from './contexts/AuthContext';
import './styles/global.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
