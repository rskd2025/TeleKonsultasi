import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// Web Vitals (opsional)
import reportWebVitals from './reportWebVitals';

// Render aplikasi
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log performa (opsional)
reportWebVitals();
