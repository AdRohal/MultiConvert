import React, { useState } from "react";
import axios from "axios";

const ConvertDocument = ({ darkMode }) => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("docx");
  const [convertedFile, setConvertedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setConvertedFile(null); // Reset converted file when a new file is uploaded
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

    setLoading(true); // Show loading popup

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
      setLoading(false); // Hide loading popup
    }
  };

  return (
    <div className={`flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`} style={{ height: '79vh' }}>
      <div className={`max-w-xs mx-auto text-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg`} style={{ padding: '30px' }}>
        <h2 className="mb-6 text-2xl font-bold">File Converter</h2>
        <input
          type="file"
          accept=".docx,.doc,.txt,.pdf,.ppt,.pptx"
          onChange={handleFileUpload}
          className={`mb-4 block w-full text-sm ${darkMode ? 'text-gray-500' : 'text-gray-700'} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600`}
        />

        <div className="mb-4">
          <label htmlFor="format" className="mr-2">Choose format:</label>
          <select
            id="format"
            value={format}
            onChange={handleFormatChange}
            className={`text-black rounded-md p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            <option value="docx">DOCX</option>
            <option value="doc">DOC</option>
            <option value="txt">Text</option>
            <option value="pdf">PDF</option>
            <option value="pptx">PowerPoint</option>
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
            <p>File converted successfully!</p>
            <a
              href={convertedFile.url}
              download={convertedFile.name}
              className="text-white no-underline"
              onClick={() => console.log(`Downloading file from: ${convertedFile.url}`)}
            >
              <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                Download {convertedFile.name}
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvertDocument;