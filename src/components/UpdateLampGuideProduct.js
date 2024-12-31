import React, { useState } from 'react';

const UpdateLampGuideProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file upload
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name);
      // Add logic to load the file into memory for processing
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        console.log('File content loaded into memory:', fileContent);
        // Process the file content here
      };
      reader.readAsBinaryString(selectedFile);
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleDownloadTemplate = () => {
    console.log('Downloading template...');
    const templateUrl = '/path-to-template/template.xlsx'; // Replace with actual URL
    const link = document.createElement('a');
    link.href = templateUrl;
    link.download = 'LampGuideTemplate.xlsx';
    link.click();
  };

  return (
    <div className='w-full h-full'>
      <div className='w-full bg-white shadow-md rounded-lg p-8'>
        {/* Header */}
        <h1 className='text-2xl font-bold text-[#3d3682] mb-6'>Update Lamp Guide Product</h1>

        {/* Download Section */}
        <div className='mb-8'>
          <h2 className='text-lg font-semibold text-[#3d3682] mb-2'>Lamp Guide Update Spreadsheet:</h2>
          <button onClick={handleDownloadTemplate} className='bg-[#4B449D] text-white px-6 py-2 rounded hover:bg-[#3d3682] transition-colors text-sm'>
            Download Template
          </button>
        </div>

        <hr className='border-t border-gray-300 mb-8' />

        {/* Upload Section */}
        <div>
          <h2 className='text-lg font-semibold text-[#3d3682] mb-2'>Upload Template:</h2>
          <div className='flex items-center gap-4 mb-4'>
            <input type='file' accept='.xlsx' onChange={handleFileChange} className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300' />
          </div>
          <button onClick={handleFileUpload} className='bg-[#4B449D] text-white px-6 py-2 rounded hover:bg-[#3d3682] transition-colors text-sm'>
            Upload Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLampGuideProduct;
