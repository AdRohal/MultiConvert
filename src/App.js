import React, { useState } from 'react';
import './App.css';

function App({ darkMode }) {
  const [file, setFile] = useState(null);
  const [convertTo, setConvertTo] = useState('');

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleConvert = () => {
    if (file && convertTo) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', convertTo);

      fetch('http://localhost:5000/convert', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.filename) {
            window.location.href = `http://localhost:5000/download/${data.filename}`;
          } else {
            console.error('Conversion failed:', data.error);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleReset = () => {
    setFile(null);
    setConvertTo('');
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className={`App-header ${darkMode ? 'dark-mode' : 'light-mode'}`} style={{ paddingBottom: '16px' }}>
        <h1 className="text-4xl font-bold mt-4">Welcome to <span className='text-orange-500'>Multi-Convert</span></h1>
        <div className="gif-container border-4 border-transparent rounded-lg overflow-hidden pt-2 px-3 mx-3" style={{ width: '900px', height: '300px' }}>
          <img src="/multi-convert.gif" alt="sample gif" className="App-gif w-full h-full object-cover rounded-2xl" />
        </div>
        
        {/* Drag-and-Drop File Upload Component */}
        <div
          className="border-dashed border-2 border-orange-500 rounded-lg p-6 bg-orange-50 flex flex-col items-center justify-center mt-8 relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ width: '600px', height: '200px' }}
        >
          <button
            className="absolute top-2 right-2 bg-transparent text-red-500 px-2 py-1 rounded hover:bg-red-100 flex items-center"
            onClick={handleReset}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {!file && (
            <>
              <div className="text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8l-6-6H7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 2v6h6"
                  />
                </svg>
              </div>
              <p className="text-gray-700 mt-2">Drag your files here, file size less than 15 MB or</p>
              <label className="mt-4">
                <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-orange-600">
                  Browse File
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav"
                  onChange={handleFileUpload}
                />
              </label>
            </>
          )}
          {file && (
            <div className="mt-4 text-sm text-gray-700">
              <p>Selected File: {file.name}</p>
              <label className="block mt-2">
                Convert to:
                <select
                  className="ml-2 p-1 border rounded"
                  value={convertTo}
                  onChange={(e) => setConvertTo(e.target.value)}
                >
                  <option value="">Select format</option>
                  <option value="pdf">PDF</option>
                  <option value="docx">DOCX</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="mp3">MP3</option>
                  <option value="wav">WAV</option>
                </select>
              </label>
              <button
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                onClick={handleConvert}
              >
                Convert
              </button>
            </div>
          )}
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