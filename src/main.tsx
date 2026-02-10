import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import App, not router
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App /> {/* ✅ CORRECT: Renders the App which contains the Provider */}
  </React.StrictMode>,
);
