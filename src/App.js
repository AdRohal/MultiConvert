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
        <div className="gif-container border-4 border-transparent rounded-lg overflow-hidden pt-2 px-3 mx-3" style={{ width: '100%', maxWidth: '900px', height: '300px' }}>
          <img src="/multi-convert.gif" alt="sample gif" className="App-gif w-full h-full object-cover rounded-2xl" />
        </div>

        {/* Drag-and-Drop File Upload Component */}
        <div
          className="border-dashed border-2 border-orange-500 rounded-lg p-12 pl-60 pr-60 bg-orange-50 flex flex-col items-center justify-center mt-8 relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
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
                    d="M7 2a2 2 0 00-2 2v16a2 2 2 0 002 2h10a2 2 2 0 002-2V8l-6-6H7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 2v6h6"
                  />
                </svg>
              </div>
              <p className="text-gray-700 mt-2">Drag your files here, file size less than 15 MB</p>
              <label className="mt-4">
                <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-orange-600">
                  Browse File
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.pptx"
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
                  <option value="pptx">PPTX</option>
                  <option value="docx">DOCX</option>
                  <option value="jpg">JPG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="ico">ICO</option>
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
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          <div className={`bg-white shadow-lg rounded-lg p-6 text-center ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Why Choose Us?</h3>
            <p>We provide the best conversion services with high accuracy and speed. Our platform supports multiple file formats and ensures your data is secure.</p>
          </div>
          <div className={`bg-white shadow-lg rounded-lg p-6 text-center ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Supported Formats</h3>
            <p>We support a wide range of formats including PDF, DOCX, PPTX, JPG, JPEG, PNG, and ICO. Convert your files with ease and flexibility.</p>
          </div>
          <div className={`bg-white shadow-lg rounded-lg p-6 text-center ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M12 4h.01M4 12h.01M20 12h.01M4 4h.01M20 4h.01M4 20h.01M20 20h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Fast and Secure</h3>
            <p>Our conversion process is fast and secure. Your files are processed quickly and we ensure that your data is protected at all times.</p>
          </div>
          <div className={`bg-white shadow-lg rounded-lg p-6 text-center ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">User-Friendly Interface</h3>
            <p>Our platform is designed with a user-friendly interface that makes it easy for anyone to convert files without any hassle.</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          <div className={`bg-white shadow-lg rounded-lg p-6 text-center ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Customer Support</h3>
            <p>We offer 24/7 customer support to assist you with any issues or questions you may have during the conversion process.</p>
          </div>
          <div className={`bg-white shadow-lg rounded-lg p-6 text-center ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">High Quality Output</h3>
            <p>We ensure that the converted files maintain high quality and accuracy, preserving the original content and format.</p>
          </div>
          <div className={`bg-white shadow-lg rounded-lg p-6 text-center ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Multiple File Conversions</h3>
            <p>Our platform supports multiple file conversions at once, saving you time and effort.</p>
          </div>
          <div className={`bg-white shadow-lg rounded-lg p-6 text-center ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11V7a4 4 0 10-8 0v4a4 4 0 004 4h4a4 4 0 004-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure and Private</h3>
            <p>We prioritize your privacy and security, ensuring that your files are handled with the utmost care and confidentiality.</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;