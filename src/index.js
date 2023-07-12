import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerLicense } from '@syncfusion/ej2-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './contexts/ContextProvider';

registerLicense('ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkFjX39dcXNRT2ZcUEE=');

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <App />
        <Analytics />
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
