// src/App.jsx
import React from 'react';
import AppRouter from './routes/AppRouter';
import AdminHomePage from './components/Admin/AdminHomePage';
import ContextProvider from './context/ContextProvider';
export default function App() {
  return (
    <>
      <ContextProvider>
        <AppRouter />
      </ContextProvider>

    </>
  );
}

