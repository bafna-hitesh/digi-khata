'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      // alert('Please select a file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('orders', selectedFile);

      const response = await axios.post('http://localhost:8080/orders/orders/upload', formData);

      console.info(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='file' name='orders' onChange={handleFileChange} />
          <button type='submit'>Upload</button>
        </form>
      </div>
    </div>
  );
}
