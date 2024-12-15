import React, { useState, useEffect } from 'react';
import { getAccountCommunication, EDITABLE_FIELDS_LOCATIONS } from '../form-configs/accountCommunicationConfig';
import { Snackbar, Alert } from '@mui/material';

const AccountCommunication = ({ selectedAccount, locations, onSave }) => {
  const [locationDetails, setLocationDetails] = useState({});
  const [originalDetails, setOriginalDetails] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const sections = [
    {
      name: 'Account Communication',
      fields: ['blankRowsToAdd', 'accountSpecificMessage', 'accountSpecificHeaderText', 'accountSpecificFooterText', 'accountSpecificNoteBottom', 'accountMessageForShoppingCart', 'accountMessageForReportPage', 'accountMessageForHelpPage', 'accountMessageForHistoryPage', 'accountMessageForMaintenancePage', 'accountMessageForProductsPage', 'accountMessageMaxQuantity', 'messageIfProductCannotBeOrdered']
    },
    {
      name: 'Store Messaging',
      fields: ['storeSpecificMessage', 'storeSpecificHeaderText', 'storeSpecificFooterText', 'storeSpecificNoteBottom', 'storeMessageForShoppingCart', 'storeMessageForReportPage', 'storeMessageForHelpPage', 'storeMessageForHistoryPage', 'storeMessageForMaintenancePage', 'storeMessageForProductsPage']
    },
    { name: 'Change Log', fields: ['fieldToSelect'] }
  ];

  useEffect(() => {
    const location = locations.find((loc) => loc.account === selectedAccount);
    if (location) {
      const editableDetails = EDITABLE_FIELDS_LOCATIONS.reduce((acc, field) => {
        acc[field] = location[field] || '';
        acc[`${field}Color`] = location[`${field}Color`] || 'Unspecified';
        return acc;
      }, {});
      setLocationDetails(editableDetails);
      setOriginalDetails(editableDetails);
      setHasChanges(false);
      setCurrentSection(0);
    }
  }, [selectedAccount, locations]);

  const checkForChanges = (newDetails) => JSON.stringify(newDetails) !== JSON.stringify(originalDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newDetails = { ...locationDetails, [name]: value };
    setLocationDetails(newDetails);
    setHasChanges(checkForChanges(newDetails));
  };

  const handleSave = () => {
    onSave(locationDetails);
    setHasChanges(false);
    setSnackbarOpen(true);
  };

  const handleCancel = () => {
    setLocationDetails(originalDetails);
    setHasChanges(false);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const renderFieldWithColor = (fieldName) => {
    const config = getAccountCommunication(fieldName);
    const value = locationDetails[fieldName] || '';
    const colorValue = locationDetails[`${fieldName}Color`] || 'Unspecified';

    return (
      <div key={fieldName} className='grid grid-cols-2 gap-4 items-start mb-4'>
        {/* Text Area or Input Field */}
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text font-semibold'>{config.label}</span>
          </label>
          {config.type === 'textarea' ? (
            <textarea name={fieldName} value={value} onChange={handleInputChange} className='textarea textarea-bordered w-full' />
          ) : config.type === 'select' ? (
            <div className='form-control w-full mb-4' key={fieldName}>
              <select name={fieldName} value={value} onChange={handleInputChange} className='select select-bordered w-full disabled:opacity-50'>
                {config.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <input type='text' name={fieldName} value={value} onChange={handleInputChange} className='input input-bordered w-full' />
          )}
        </div>

        {/* Color Dropdown */}
        {config.color && (
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-semibold'>{`${config.label} Color`}</span>
            </label>
            <select name={`${fieldName}Color`} value={colorValue} onChange={handleInputChange} className='select select-bordered w-full'>
              {config.color.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='mt-8'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold' style={{ color: '#4B449D' }}>
          Account Communication: {selectedAccount}
        </h2>
        <div className='flex space-x-2'>
          <button className='btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none' onClick={handleSave} disabled={!hasChanges}>
            Save Changes
          </button>
          <button className='btn btn-sm text-[#4B449D] hover:bg-[#4B449D] hover:text-white' onClick={handleCancel} disabled={!hasChanges}>
            Cancel Changes
          </button>
        </div>
      </div>

      <div className='flex bg-white shadow-md p-6 rounded-lg'>
        <ul className='w-1/5 mr-10'>
          {sections.map((section, index) => (
            <li key={section.name} className={`cursor-pointer rounded-md p-2 mb-2 ${index === currentSection ? 'bg-[#4B449D] text-white' : 'hover:bg-gray-200'}`} onClick={() => setCurrentSection(index)}>
              {section.name}
            </li>
          ))}
        </ul>

        <div className='w-4/5'>{sections[currentSection].fields.map((fieldName) => (locationDetails.hasOwnProperty(fieldName) ? renderFieldWithColor(fieldName) : null))}</div>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='success'>
          Changes saved successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AccountCommunication;
