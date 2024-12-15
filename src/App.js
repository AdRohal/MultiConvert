import React from 'react';
import './App.css';

function App({ darkMode }) {
  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className={`App-header ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <h1 className="text-4xl font-bold mt-4">Welcome to <span className='text-orange-500'>Multi-Convert</span></h1>
        <div className="gif-container border-4 border-transparent rounded-lg overflow-hidden pt-8 px-12 mx-12">
          <img src="/multi-convert.gif" alt="sample gif" className="App-gif w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="mt-8 flex flex-wrap justify-center space-x-4">
          <a href="/convert-document" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">Convert Documents</a>
          <a href="/convert-images" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">Convert Images</a>
          <a href="/convert-music" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">Convert Music</a>
          <a href="/convert-videos" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">Convert Videos</a>
        </div>
      </header>
    </div>
  );
}

export default App;