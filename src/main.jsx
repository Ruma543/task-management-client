import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import Router from './Route/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

  <QueryClientProvider client={queryClient}>
    <Toaster />
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
