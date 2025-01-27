import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InputPage from './InputPage';
import DisplayPage from './DisplayPage';
import StartPage from './StartPage';

const ProtectedApp = () => {
  return (
      <Routes>
        <Route
          path="/"
          element={<StartPage />}
        />
        <Route
          path="/input"
          element={<InputPage />}
        />
        <Route
          path="/display/:objectId"
          element={<DisplayPage />}
        />
      </Routes>
  );
};

export default ProtectedApp;
