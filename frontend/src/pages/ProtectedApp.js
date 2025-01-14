import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InputPage from './InputPage';
import DisplayPage from './DisplayPage';

const ProtectedApp = () => {
  return (
    <div className="ProtectedApp App">
      <Routes>
        <Route
          path="/"
          element={<InputPage />}
        />
        <Route
          path="/display/:objectId"
          element={<DisplayPage />}
        />
      </Routes>
    </div>
  );
};

export default ProtectedApp;
