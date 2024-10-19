import React, { useState, useEffect } from 'react';
import { getLocationConfig, EDITABLE_FIELDS_LOCATIONS } from '../form-configs/accountLocationConfig';
import { Snackbar, Alert } from '@mui/material';

const LocationMaintenance = ({ selectedAccount, locations, onSave }) => {
  const [locationDetails, setLocationDetails] = useState({});
  const [originalDetails, setOriginalDetails] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const sections = [
    {
      name: 'Location Mnemonic',
      fields: ['locationName', 'locationIsActive', 'locationHeaderBackgroundColor', 'locationDescription',  'displayActiveLocationOnly']
    },
    {
      name: 'Move All Products From One Location To Another',
      fields: ['deactivateFromLocationToLocation']
    },
    {
      name: 'Change Log',
      fields: ['fieldToSelect']
    }
  ];

  const locationMaintenanceOptions = ['Start A New Location', 'Save Changes', 'Cancel Changes'];

  // Updated useEffect to fetch the location details from the locations array
  useEffect(() => {
    const location = locations.find((loc) => loc.account === selectedAccount);
    if (location) {
      const editableDetails = EDITABLE_FIELDS_LOCATIONS.reduce((acc, field) => {
        if (field in location) {
          acc[field] = location[field];
        }
        return acc;
      }, {});
      setLocationDetails(editableDetails);
      setOriginalDetails(editableDetails);
      setHasChanges(false);
      setCurrentSection(0);
    }
  }, [selectedAccount, locations]);

  const checkForChanges = (newDetails) => {
    return JSON.stringify(newDetails) !== JSON.stringify(originalDetails);
  };

  const handleSave = () => {
    const updatedDetails = Object.keys(locationDetails).reduce((acc, key) => {
      const config = getLocationConfig(key);
      if (!config.readOnly) {
        acc[key] = locationDetails[key];
      }
      return acc;
    }, {});
    onSave(updatedDetails);
    setHasChanges(false);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    setLocationDetails(originalDetails);
    setHasChanges(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newDetails = {
      ...locationDetails,
      [name]: type === 'checkbox' ? checked : value
    };
    setLocationDetails(newDetails);
    setHasChanges(checkForChanges(newDetails));
  };

  const renderField = (fieldName) => {
    const config = getLocationConfig(fieldName);
    const value = locationDetails[fieldName] || '';
    const isReadOnly = config.readOnly || false;

    switch (config.type) {
      case 'select':
        return (
          <div className='form-control w-full mb-4' key={fieldName}>
            <label className='label'>
              <span className='label-text font-semibold'>{config.label}</span>
            </label>
            <select name={fieldName} value={value} onChange={handleInputChange} disabled={isReadOnly} className='select select-bordered w-full disabled:opacity-50'>
              {config.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'checkbox':
        return (
          <div className='form-control flex flex-row items-center space-x-2 mb-4' key={fieldName}>
            <label className='label cursor-pointer'>
              <input
                type='checkbox'
                name={fieldName}
                checked={value}
                onChange={handleInputChange}
                disabled={isReadOnly}
                className='checkbox'
                style={{
                  '--chkbg': value ? '#4B449D' : 'white',
                  '--chkfg': 'white'
                }}
              />
              <span className='label-text font-semibold ml-2'>{config.label}</span>
            </label>
          </div>
        );

      case 'textarea':
        return (
          <div className='form-control w-full mb-4' key={fieldName}>
            <label className='label'>
              <span className='label-text font-semibold'>{config.label}</span>
            </label>
            <textarea name={fieldName} value={value} onChange={handleInputChange} disabled={isReadOnly} className='min-h-[100px] textarea textarea-bordered disabled:opacity-50' />
          </div>
        );
      case 'list':
        return (
          <div className='form-control w-full mb-4' key={fieldName}>
            <label className='label'>
              <span className='label-text font-semibold'>{config.label}</span>
            </label>
            <ul className="p-2 rounded-lg border-[1px] border-[#dbdbdb] max-h-[400px] min-h-[100px] overflow-auto">
              {value.length > 0 ? (
                value.map((item, index) => (
                  <li key={index} className="mb-1 list-style-none">
                    {item}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No items available</li>
              )}
            </ul>
          </div>
        );
      case 'number':
      case 'text':
      default:
        return (
          <div className='form-control w-full mb-4' key={fieldName}>
            <label className='label'>
              <span className='label-text font-semibold'>{config.label}</span>
            </label>
            <input type='text' name={fieldName} value={value} onChange={handleInputChange} disabled={isReadOnly} className='input input-bordered w-full disabled:opacity-50' />
          </div>
        );
    }
  };

  return (
    <div className='mt-8'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold' style={{ color: '#4B449D' }}>
          Location Maintenance:
        </h2>
        <div className='flex space-x-2'>
          {locationMaintenanceOptions.map((option, index) => (
            <button key={index} className='btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none h-[40px]'>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className='flex bg-gray-100 bg-white shadow-md p-6 rounded-lg'>
        <ul className='w-1/5 mr-10'>
          {sections.map((section, index) => (
            <li key={section.name} className={`cursor-pointer rounded-md p-2 mb-2 ${index === currentSection ? 'bg-[#4B449D] text-white' : 'hover:bg-gray-200'}`} onClick={() => setCurrentSection(index)}>
              {section.name}
            </li>
          ))}
        </ul>

        <div className='w-4/5'>
          {sections[currentSection]?.name === 'Location Mnemonic' ?
            <>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                {sections[currentSection].fields.map((fieldName) => (locationDetails.hasOwnProperty(fieldName) ? renderField(fieldName) : null))}
              </div>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                {renderField('accountLocations')}
                {renderField('productsLocatedAtSelectedLocation')}
              </div>
            </>
            :
            sections[currentSection]?.name === 'Move All Products From One Location To Another' ?
              <>
                <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                  {renderField('accountLocations')}
                  {renderField('moveProductsToLocation')}
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                  {sections[currentSection].fields.map((fieldName) => (locationDetails.hasOwnProperty(fieldName) ? renderField(fieldName) : null))}
                </div>
              </>
              : <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {sections[currentSection].fields.map((fieldName) => (locationDetails.hasOwnProperty(fieldName) ? renderField(fieldName) : null))}
              </div>
          }

          <div className='mt-6 flex justify-end space-x-4'>
            <button className='btn btn-sm hover:bg-[#4B449D] hover:border-[#4B449D] hover:outline-none hover:text-white text-[#4B449D] h-[40px] w-[100px]' onClick={handleCancel} disabled={!hasChanges}>
              Cancel
            </button>
            <button className='btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none h-[40px] w-[100px]' onClick={handleSave} disabled={!hasChanges}>
              Save
            </button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity='success'>
                Saved successfully!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMaintenance;
