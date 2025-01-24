import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './Header';
import Footer from './Footer';
import ConvertDocument from './ConvertDocument';
import ConvertImage from './ConvertImage';
import reportWebVitals from './reportWebVitals';

const Root = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  

  return (
    <Router>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<App darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/convert-document" element={<ConvertDocument darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
        <Route path="/convert-images" element={<ConvertImage darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
      </Routes>
      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();