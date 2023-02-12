import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/typography';
import './styles/global.css';
import Index from './pages/index';
import { ComponentEventsProvider } from '@/hooks/events/providers/component-events';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ComponentEventsProvider>
      <Index />
    </ComponentEventsProvider>
  </React.StrictMode>
);
