import React, { useState } from 'react';
import axios from 'axios';

const UploadPdfForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded:', response.data);
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="pdf" onChange={handleFileChange} />
      <button type="submit">Upload PDF</button>
    </form>
  );
};

export default UploadPdfForm;