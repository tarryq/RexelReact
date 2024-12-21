import React, { useState } from 'react';

const CustomGridColumns = () => {
  const [columns, setColumns] = useState([]);
  const [currentColumn, setCurrentColumn] = useState({
    name: '',
    separator: '',
    active: true,
    fields: []
  });
  const [selectedField, setSelectedField] = useState(null);
  const [selectedColor, setSelectedColor] = useState('-Unspecified-');

  const availableFields = [
    'Ballast Text',
    'Blank Column',
    'Case Price',
    'Case Quantity',
    'Short Description',
    'Fixture Description'
  ];

  const colorOptions = [
    '-Unspecified-',
    'Red',
    'Green',
    'Black',
    'Blue'
  ];

  const handleAddField = () => {
    if (selectedField) {
      setCurrentColumn(prev => ({
        ...prev,
        fields: [...prev.fields, { name: selectedField, color: selectedColor }]
      }));
    }
  };

  const handleRemoveField = (index) => {
    setCurrentColumn(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  const handleMoveField = (index, direction) => {
    const newFields = [...currentColumn.fields];
    const temp = newFields[index];
    newFields[index] = newFields[index + direction];
    newFields[index + direction] = temp;
    setCurrentColumn(prev => ({ ...prev, fields: newFields }));
  };

  const handleSaveColumn = () => {
    if (currentColumn.name) {
      setColumns(prev => [...prev, currentColumn]);
      setCurrentColumn({
        name: '',
        separator: '',
        active: true,
        fields: []
      });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#4B449D] mb-8">
        Custom Grid Column Definitions
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Existing Custom Column Definitions
            </h2>
            <div className="bg-gray-50 rounded-lg min-h-[300px] max-h-[400px] overflow-y-auto">
              {columns.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p>No columns defined yet</p>
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  {columns.map((col, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">{col.name}</span>
                        <span className="text-sm text-gray-500">{col.fields.length} fields</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <button
            className="w-full bg-[#4B449D] hover:bg-[#6055b5] text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm"
            onClick={() => setCurrentColumn({
              name: '',
              separator: '',
              active: true,
              fields: []
            })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add New Column</span>
          </button>
        </div>

        {/* Right Column */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Column Configuration
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Column Name</label>
              <input
                type="text"
                value={currentColumn.name}
                onChange={e => setCurrentColumn(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent transition-colors"
                placeholder="Enter name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Field Separator</label>
              <input
                type="text"
                value={currentColumn.separator}
                onChange={e => setCurrentColumn(prev => ({ ...prev, separator: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent transition-colors"
                placeholder="E.g. -, /"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className='label cursor-pointer'>
            <input
              type="checkbox"
              checked={currentColumn.active}
              onChange={e => setCurrentColumn(prev => ({ ...prev, active: e.target.checked }))}
              className='checkbox'
              style={{
                '--chkbg': currentColumn.active ? '#4B449D' : 'white',
                '--chkfg': 'white'
              }}

            />
              <span className="text-sm label-text ml-2">Active</span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Available Fields</label>
            <select
              value={selectedField || ''}
              onChange={e => setSelectedField(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent transition-colors"
            >
              <option value="">Select a field</option>
              {availableFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>

          <button
            className="w-full bg-[#4B449D] hover:bg-[#6055b5] text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            onClick={handleAddField}
          >
            Add Selected Field to Current Composite Definition
          </button>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Current Composite Field Definition</label>
            <div className="bg-gray-50 p-4 rounded-lg min-h-[100px] space-y-2">
              {currentColumn.fields.map((field, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <span style={{ color: field.color !== '-Unspecified-' ? field.color.toLowerCase() : 'inherit' }}>
                    {field.name}
                  </span>
                  <div className="flex space-x-2">
                    {index > 0 && (
                      <button
                        className="p-1.5 text-[#4B449D] hover:bg-[#4B449D] hover:text-white rounded-md transition-colors"
                        onClick={() => handleMoveField(index, -1)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    {index < currentColumn.fields.length - 1 && (
                      <button
                        className="p-1.5 text-[#4B449D] hover:bg-[#4B449D] hover:text-white rounded-md transition-colors"
                        onClick={() => handleMoveField(index, 1)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    <button
                      className="p-1.5 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors"
                      onClick={() => handleRemoveField(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end space-x-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">Selected Field Color</label>
              <select
                value={selectedColor}
                onChange={e => setSelectedColor(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent transition-colors"
              >
                {colorOptions.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <button
              className="px-4 py-2.5 border border-[#4B449D] text-[#4B449D] hover:bg-[#4B449D] hover:text-white rounded-lg transition-colors"
              onClick={() => setSelectedColor('-Unspecified-')}
            >
              Update Field Color
            </button>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Composite Field Preview</h3>
            <div className="flex flex-wrap gap-2">
              {currentColumn.fields.map((field, index) => (
                <span
                  key={index}
                  style={{ color: field.color !== '-Unspecified-' ? field.color.toLowerCase() : 'inherit' }}
                  className="font-medium"
                >
                  {field.name}
                  {index < currentColumn.fields.length - 1 && currentColumn.separator}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              className="px-6 py-2.5 border border-[#4B449D] text-[#4B449D] hover:bg-[#4B449D] hover:text-white rounded-lg transition-colors"
              onClick={() => setCurrentColumn({
                name: '',
                separator: '',
                active: true,
                fields: []
              })}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2.5 bg-[#4B449D] hover:bg-[#6055b5] text-white rounded-lg transition-colors"
              onClick={handleSaveColumn}
            >
              Save Column
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomGridColumns;