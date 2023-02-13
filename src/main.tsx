import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/typography';
import './styles/global.css';
import Index from './pages/index';
import { AppEventsProvider } from '@/hooks/events/providers/app-events';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppEventsProvider>
      <Index />
    </AppEventsProvider>
  </React.StrictMode>
);
