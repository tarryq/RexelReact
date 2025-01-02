import React, { useState } from 'react';

const UpdateLampGuideProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file upload
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
      };
      reader.readAsBinaryString(selectedFile);
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleDownloadTemplate = (templateType) => {
    const templates = {
      lampGuide: '/path-to-template/lamp-guide-template.xlsx',
      storeProduct: '/path-to-template/store-product-template.xlsx',
      accountProduct: '/path-to-template/account-product-template.xlsx',
      userTemplate: '/path-to-template/user-template.xlsx'
    };
    const templateUrl = templates[templateType];
    if (templateUrl) {
      const link = document.createElement('a');
      link.href = templateUrl;
      link.download = `${templateType}-template.xlsx`;
      link.click();
    } else {
      alert('Invalid template type.');
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='w-full bg-white shadow-md rounded-lg p-8'>
        {/* Header */}
        <h1 className='text-2xl font-bold text-[#3d3682] mb-6'>Update Lamp Guide Product</h1>

        {/* Lamp Guide Section */}
        <div className='mb-8'>
          <h2 className='text-lg font-semibold text-[#3d3682] mb-2'>Lamp Guide Update Spreadsheet:</h2>
          <button onClick={() => handleDownloadTemplate('lampGuide')} className='bg-[#4B449D] text-white px-4 py-2 rounded hover:bg-[#3d3682] transition-colors text-sm w-auto'>
            Download Lamp Guide Template
          </button>
        </div>

        <hr className='border-t border-gray-300 mb-8' />

        {/* Import Account/Store Products Section */}
        <div className='mb-8'>
          <h2 className='text-lg font-semibold text-[#3d3682] mb-2'>Import Account/Store Products:</h2>
          <div className='flex flex-wrap gap-4'>
            <button onClick={() => handleDownloadTemplate('storeProduct')} className='bg-[#4B449D] text-white px-4 py-2 rounded hover:bg-[#3d3682] transition-colors text-sm w-auto'>
              Download Store Product Template
            </button>
            <button onClick={() => handleDownloadTemplate('accountProduct')} className='bg-[#4B449D] text-white px-4 py-2 rounded hover:bg-[#3d3682] transition-colors text-sm w-auto'>
              Download Account Product Template
            </button>
          </div>
          <div className='flex items-center gap-4 mt-4'>
            <input type='file' accept='.xlsx' onChange={handleFileChange} className='block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 w-auto' />
            <button onClick={handleFileUpload} className='bg-[#4B449D] text-white px-4 py-2 rounded hover:bg-[#3d3682] transition-colors text-sm w-auto'>
              Upload Product Template
            </button>
          </div>
        </div>

        <hr className='border-t border-gray-300 mb-8' />

        {/* Import Store Users Section */}
        <div>
          <h2 className='text-lg font-semibold text-[#3d3682] mb-2'>Import Store Users:</h2>
          <button onClick={() => handleDownloadTemplate('userTemplate')} className='bg-[#4B449D] text-white px-4 py-2 rounded hover:bg-[#3d3682] transition-colors text-sm w-auto'>
            Download User Template
          </button>
          <div className='flex items-center gap-4 mt-4'>
            <input type='file' accept='.xlsx' onChange={handleFileChange} className='block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 w-auto' />
            <button onClick={handleFileUpload} className='bg-[#4B449D] text-white px-4 py-2 rounded hover:bg-[#3d3682] transition-colors text-sm w-auto'>
              Upload User Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLampGuideProduct;
