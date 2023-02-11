import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/typography';
import './styles/global.css';
import Index from './pages/index';
import { WindowEventProvider } from './contexts/window-events';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WindowEventProvider events={['keydown', 'keyup', 'resize']}>
      <Index />
    </WindowEventProvider>
  </React.StrictMode>
);
