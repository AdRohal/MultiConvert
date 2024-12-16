import React, { useState } from "react";
import axios from "axios";

const ConvertDocument = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("docx");
  const [convertedFile, setConvertedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setConvertedFile(null); // Reset converted file when a new file is uploaded
    setError(null); // Reset error when a new file is uploaded
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

    try {
      const response = await axios.post("http://localhost:5000/convert", formData, {
        responseType: "blob",
      });

      if (response.headers["content-type"] === "application/json") {
        const reader = new FileReader();
        reader.onload = () => {
          const errorResponse = JSON.parse(reader.result);
          setError(errorResponse.error);
        };
        reader.readAsText(response.data);
      } else {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const newFileName = file.name.split(".")[0] + `.${format}`;
        setConvertedFile({ name: newFileName, url });
      }
    } catch (error) {
      console.error("Error converting file:", error);
      setError("An error occurred while converting the file.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>File Converter</h2>
      <input
        type="file"
        accept=".docx,.doc,.txt,.pdf,.ppt,.pptx"
        onChange={handleFileUpload}
        style={{ marginBottom: "10px" }}
      />

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="format">Choose format:</label>
        <select
          id="format"
          value={format}
          onChange={handleFormatChange}
          style={{ color: "black" }} // Ensure text color is black
        >
          <option value="docx">DOCX</option>
          <option value="doc">DOC</option>
          <option value="txt">Text</option>
          <option value="pdf">PDF</option>
          <option value="ppt">PowerPoint</option>
        </select>
      </div>

      <button onClick={handleConvert} style={{ marginBottom: "10px" }}>
        Convert
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {convertedFile && (
        <div>
          <p>File converted successfully!</p>
          <a
            href={convertedFile.url}
            download={convertedFile.name}
            style={{ textDecoration: "none", color: "white" }}
          >
            <button>Download {convertedFile.name}</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default ConvertDocument;