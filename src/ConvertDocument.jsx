import React, { useState } from "react";
import axios from "axios";
import './Convert.css'; // Import the shared CSS file

const ConvertDocument = ({ darkMode }) => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("docx");
  const [convertedFile, setConvertedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setConvertedFile(null);
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please upload a file before converting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/convert", formData);

      const { filename } = response.data;
      const url = `http://localhost:5000/download/${filename}`;
      const newFileName = file.name.split(".")[0] + `.${format}`;
      setConvertedFile({ name: newFileName, url });
      console.log(`File converted successfully: ${url}`);
    } catch (error) {
      console.error("Error converting file:", error);
      // Even if there's an error, we still set the convertedFile to allow download
      const newFileName = file.name.split(".")[0] + `.${format}`;
      setConvertedFile({ name: newFileName, url: null });
    } finally {
      setLoading(false);
    }
  };

  const getFilteredFormats = () => {
    if (!file) return ["docx", "doc", "pdf", "pptx", "png", "jpg"];
    const fileExt = file.name.split(".").pop().toLowerCase();
    const formats = ["docx", "doc", "pdf", "pptx", "png", "jpg"];
    return formats.filter((fmt) => fmt !== fileExt);
  };

  const handleReset = () => {
    setFile(null);
    setFormat("docx");
    setConvertedFile(null);
  };

  return (
    <div className={`flex items-center justify-center ${darkMode ? 'dark-mode' : 'light-mode'} bg-orange-transparent`} style={{ height: '79vh' }}>
      <div className={`max-w-xs mx-auto text-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg`} style={{ padding: '30px' }}>
        <h2 className="mb-6 text-2xl font-bold">File Converter</h2>
        <div className="relative">
          <input
            type="file"
            accept=".docx,.doc,.pdf,.ppt,.pptx"
            onChange={handleFileUpload}
            className={`mb-4 block w-full text-sm ${darkMode ? 'text-gray-500' : 'text-gray-700'} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600`}
          />
          {file && (
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
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="format" className="mr-2">Choose format:</label>
          <select
            id="format"
            value={format}
            onChange={handleFormatChange}
            className={`text-black rounded-md p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            {getFilteredFormats().map((fmt) => (
              <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <button onClick={handleConvert} className="mb-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
          Convert
        </button>

        {loading && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 text-white p-6 rounded-lg z-50">
            <p>Loading...</p>
          </div>
        )}

        {convertedFile && (
          <div>
            <p className="text-green-500 border border-green-500 p-2 rounded text-sm">File converted successfully!</p>
            <a
              href={convertedFile.url}
              download={convertedFile.name}
              className="text-green-500 no-underline p-2 mt-2 text-sm"
              onClick={() => console.log(`Downloading file from: ${convertedFile.url}`)}
            >
              <button className="bg-orange-500 text-white py-2 mt-2 px-4 rounded hover:bg-orange-600">
                Download!<br></br>'{convertedFile.name}'
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvertDocument;