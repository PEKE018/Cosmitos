import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element was not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <CartProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CartProvider>
  </React.StrictMode>,
);
