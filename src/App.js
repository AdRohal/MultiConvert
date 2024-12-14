import React from 'react';
import './App.css';

function App({ darkMode, toggleDarkMode }) {
  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="gif-container border-4 border-transparent rounded-lg overflow-hidden">
          <img src="/multi-convert.gif" alt="sample gif" className="App-gif w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-bold mt-4">Welcome to Multi-Convert</h1>
        <p className="text-lg mt-2">
          Your one-stop solution for converting documents, images, music, and videos.
        </p>
      </header>
    </div>
  );
}

export default App;