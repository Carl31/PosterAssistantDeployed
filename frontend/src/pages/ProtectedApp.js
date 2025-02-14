import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InputPage from './InputPage';
import DisplayPage from './DisplayPage';
import StartPage from './StartPage';
import LoadingPage from './LoadingPage';
import OutputPage from './OutputPage'

const ProtectedApp = () => {

  const handleSubmit = (userImageLink, templateName, additionalPngs) => {
    const jsonContent = {
      vehicle: {
        make: "",
        model: "",
        year: "",
        description: "",
      },
      template: {
        path: "D:/Documents/GithubRepos/PosterAssistant/templates/",
        name: templateName, // Set template name
      },
      photo: {
        path: "D:/Documents/GithubRepos/PosterAssistant/photos/",
        name: "user_photo.jpg",
      },
      added: {
        path: "D:/Documents/PosterAssistantLocal/PNGS/",
        makePng: "",
        modelPng: "",
        add1: additionalPngs[0] || "", // Use first element of additionalPngs, or empty if undefined
        add2: additionalPngs[1] || "", // Use second element of additionalPngs, or empty if undefined
      },
      userImageUrl: userImageLink, // Set user image link
    };
  
    console.log("Generated JSON:", jsonContent);
    return jsonContent;
  };


  return (
      <Routes>
        <Route
          path="/"
          element={<StartPage />}
        />
        <Route
          path="/input"
          element={<InputPage onSubmit={handleSubmit} />}
        />
        <Route
          path="/display"
          element={<DisplayPage />}
        />
        <Route
          path="/loading"
          element={<LoadingPage />}
        />
        <Route
          path="/output"
          element={<OutputPage />}
        />
      </Routes>
  );
};

export default ProtectedApp;
