import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputPage from './pages/InputPage';
import DisplayPage from './pages/DisplayPage';

const App = () => {
  const [objectId, setObjectId] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Pass the InputPage component */}
          <Route path="/" element={<InputPage setObjectId={setObjectId} />} />

          {/* Pass the DisplayPage component with a URL parameter */}
          <Route
            path="/display/:objectId"
            element={<DisplayPage objectId={objectId} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
