import React, { useState } from 'react';
import CloudConvert from 'cloudconvert';

function ConvertDocument({ darkMode }) {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [targetType, setTargetType] = useState('');
  const [convertedFile, setConvertedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const cloudConvert = new CloudConvert('YOUR_API_KEY');

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    analyzeFileType(uploadedFile);
  };

  const analyzeFileType = (file) => {
    const fileType = file.name.split('.').pop();
    setFileType(fileType);
  };

  const handleConvert = async () => {
    if (!file || !targetType) {
      setError('Please upload a file and select a target type.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const job = await cloudConvert.jobs.create({
        tasks: {
          'import-my-file': {
            operation: 'import/upload'
          },
          'convert-my-file': {
            operation: 'convert',
            input: 'import-my-file',
            output_format: targetType
          },
          'export-my-file': {
            operation: 'export/url',
            input: 'convert-my-file'
          }
        }
      });

      const uploadTask = job.tasks.filter(
        (task) => task.name === 'import-my-file'
      )[0];

      const uploadUrl = uploadTask.result.form.url;
      const uploadForm = uploadTask.result.form.parameters;

      const formData = new FormData();
      for (const [key, value] of Object.entries(uploadForm)) {
        formData.append(key, value);
      }
      formData.append('file', file);

      await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });

      const exportTask = job.tasks.filter(
        (task) => task.name === 'export-my-file'
      )[0];

      const fileUrl = exportTask.result.files[0].url;
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      setConvertedFile(blob);
      setSuccess('File converted successfully!');
    } catch (error) {
      console.error('Error converting file:', error);
      setError(`Error converting file: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(convertedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = `converted.${targetType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`convert-document ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className="text-4xl font-bold mt-4">Convert Documents</h1>
      <p className="mt-4">Here you can convert your documents.</p>
      <input
        type="file"
        onChange={handleFileUpload}
        className="mt-4 p-2 border rounded"
      />
      {file && (
        <>
          <p className="mt-4">File type: {fileType}</p>
          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
            className="mt-4 p-2 border rounded"
          >
            <option value="">Select target type</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="doc">DOC</option>
            <option value="pptx">PPTX</option>
            {/* Add more options as needed */}
          </select>
          <button
            onClick={handleConvert}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? 'Converting...' : 'Convert File'}
          </button>
        </>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="mb-4">Converting your file, please wait...</p>
            <div className="loader"></div>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          {success}
        </div>
      )}
      {convertedFile && !loading && (
        <button
          onClick={handleDownload}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        >
          Download Converted File
        </button>
      )}
    </div>
  );
}

export default ConvertDocument;