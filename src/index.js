  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  import { ThemeProvider } from './ThemeContext.tsx';
  import { AuthProvider } from './AuthContext.tsx';

  const root = ReactDOM.createRoot(document.getElementById('root'));

  const originalResizeObserver = window.ResizeObserver;

  class NoOpResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  window.ResizeObserver = NoOpResizeObserver;
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );

  reportWebVitals();