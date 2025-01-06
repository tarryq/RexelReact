import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { getLocationConfig } from '../form-configs/accountLocationConfig';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountLocations, fetchAccountLocationProducts } from '../store/features/accounts/accountActions';

const LocationMaintenance = ({ selectedAccount, selectedStore, onSave }) => {
  const [user, setUser] = useState(null);
  const [locationDetails, setLocationDetails] = useState({});
  const [originalDetails, setOriginalDetails] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations?.locations || []);
  const locationProducts = useSelector((state) => state.locations?.locationProducts || []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  }, []);

  const userid = user?.userId;
  const accountid = selectedAccount?.id;
  const storeid = selectedStore?.id;

  const sections = [
    {
      name: 'Location Mnemonic',
      fields: ['locationName', 'locationIsActive', 'locationHeaderBackgroundColor', 'locationDescription', 'displayActiveLocationOnly']
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

  // Fetch locations on account or store change
  useEffect(() => {
    if (!selectedAccount?.id || !selectedStore?.id) return;

    dispatch(fetchAccountLocations({ accountid, storeid, userid }));
  }, [selectedAccount, selectedStore]);

  // Fetch location details and products on location change
  useEffect(() => {
    if (!selectedLocationId) return;

    const selectedLocation = locations.find((loc) => loc.id === selectedLocationId);
    setLocationDetails(selectedLocation || {});
    setOriginalDetails(selectedLocation || {});

    dispatch(fetchAccountLocationProducts({ accountid, storeid, userid, locationId: selectedLocationId }));
  }, [selectedLocationId, locations]);

  const handleLocationClick = (locationId) => {
    setSelectedLocationId(locationId);
    setHasChanges(false);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderLocations = () => (
    <div className='form-control w-full mb-4'>
      <label className='label'>
        <span className='label-text font-semibold'>Current Defined Locations for Account with Description and Display Order in Parentheses</span>
      </label>
      <ul className='p-2 rounded-lg border-[1px] border-[#dbdbdb] max-h-[400px] min-h-[100px] overflow-auto'>
        {locations && locations.length > 0 ? (
          locations.map((location) => (
            <li key={location.id} className={`mb-1 list-style-none cursor-pointer p-2 rounded ${selectedLocationId === location.id ? 'bg-[#4B449D] text-white' : 'hover:bg-gray-200'}`} onClick={() => handleLocationClick(location.id)}>
              {location.displaytext || `Location ${location.id}`}
            </li>
          ))
        ) : (
          <li className='text-gray-500'>No locations available</li>
        )}
      </ul>
    </div>
  );

  const renderLocationProducts = () => (
    <div className='form-control w-full mb-4'>
      <label className='label'>
        <span className='label-text font-semibold'>Products Located at Selected Location</span>
      </label>
      <ul className='p-2 rounded-lg border-[1px] border-[#dbdbdb] max-h-[400px] min-h-[100px] overflow-auto'>
        {locationProducts && locationProducts.length > 0 ? (
          locationProducts.map((product, index) => (
            <li key={index} className='mb-1 list-style-none'>
              {product.name || `Product ${index + 1}`}
            </li>
          ))
        ) : (
          <li className='text-gray-500'>No products available</li>
        )}
      </ul>
    </div>
  );

  const renderField = (fieldName) => {
    const config = getLocationConfig(fieldName);
    const value = locationDetails[fieldName] || '';
    const isReadOnly = config.readOnly || false;

    return (
      <div className='form-control w-full mb-4' key={fieldName}>
        <label className='label'>
          <span className='label-text font-semibold'>{config.label}</span>
        </label>
        {config.type === 'textarea' ? <textarea name={fieldName} value={value} onChange={(e) => setLocationDetails({ ...locationDetails, [fieldName]: e.target.value })} disabled={isReadOnly} className='min-h-[100px] textarea textarea-bordered disabled:opacity-50' /> : <input type='text' name={fieldName} value={value} onChange={(e) => setLocationDetails({ ...locationDetails, [fieldName]: e.target.value })} disabled={isReadOnly} className='input input-bordered w-full disabled:opacity-50' />}
      </div>
    );
  };

  return (
    <div className='mt-8'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold' style={{ color: '#4B449D' }}>
          Location Maintenance: {selectedAccount?.name}
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
          {sections[currentSection]?.name === 'Location Mnemonic' ? (
            <>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>{sections[currentSection].fields.map((fieldName) => renderField(fieldName))}</div>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                {renderLocations()}
                {renderLocationProducts()}
              </div>
            </>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>{sections[currentSection].fields.map((fieldName) => renderField(fieldName))}</div>
          )}
        </div>
      </div>

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
  );
};

export default LocationMaintenance;
