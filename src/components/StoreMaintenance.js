import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoreMaintenanceConfig } from '../form-configs/storeConfig';
import { fetchStoreMaintenance } from '../store/features/accounts/accountActions';
import { Alert, Snackbar } from '@mui/material';

const StoreMaintenance = ({ selectedStore, stores, onSave }) => {

  const dispatch = useDispatch();
  const { storeMaintenance, storeLoading, storeError } = useSelector((state) => state.accounts);

  const [storeDetails, setStoreDetails] = useState({});
  const [originalDetails, setOriginalDetails] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const sections = [
    {
      name: 'Store Information',
      fields: ['storeName', 'storeNumber', 'shipToEclipseID', 'isStoreActive']
    },
    {
      name: 'Address',
      fields: ['address1', 'address2', 'city', 'region', 'zipCode', 'country']
    },
    {
      name: 'Contact Details',
      fields: ['storeContactName', 'telephone', 'fax', 'eMail']
    },
    {
      name: 'Additional Information',
      fields: ['dateStoreBuilt', 'originalBuildoutTicket', 'associatedProfileDisplay', 'serviceProviderStoreId', 'eclipseStoreReleaseId']
    },
    {
      name: 'Settings',
      fields: ['hideStoreFromAllButSuperUsers', 'onlyBidOrdersCanBePlaced', 'shipToAddressRequired']
    },
    {
      name: 'FMS Information',
      fields: ['fmsBillTo', 'fmsShipTo', 'fmsType']
    }
  ];

  const storeMaintainanceOptions = [
    'Add A New Store',
    'Load/Update Store Information From Eclipse',
    'Save Store Information',
    'Cancel Changes',
    'Add Another Store User'
  ];

  useEffect(() => {
    if (selectedStore?.accountID) {
      dispatch(fetchStoreMaintenance(selectedStore.accountID));
    }
  }, [dispatch, selectedStore]);

  useEffect(() => {
    if (storeMaintenance) {
      setStoreDetails(storeMaintenance);
      setOriginalDetails(storeMaintenance);
      setHasChanges(false);
      setCurrentSection(0);
    }
  }, [storeMaintenance]);

  const handleSave = () => {
    onSave(storeDetails);
    setHasChanges(false);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    setStoreDetails(originalDetails);
    setHasChanges(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStoreDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setHasChanges(true);
  };

  const renderField = (fieldName) => {
    const config = getStoreMaintenanceConfig(fieldName);
    const value = storeDetails[fieldName] || '';
    const isReadOnly = config.readOnly || false;

    switch (config.type) {
      case 'select':
        return (
          <div className="form-control w-full mb-4" key={fieldName}>
            <label className="label">
              <span className="label-text font-semibold">{config.label}</span>
            </label>
            <select
              name={fieldName}
              value={value}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className="select select-bordered w-full disabled:opacity-50"
            >
              {config.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );

      case 'checkbox':
        return (
          <div className="form-control flex flex-row items-center space-x-2 mb-4" key={fieldName}>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                name={fieldName}
                checked={value}
                onChange={handleInputChange}
                disabled={isReadOnly}
                className="checkbox"
                style={{
                  '--chkbg': value ? '#4B449D' : 'white',
                  '--chkfg': 'white'
                }}
              />
              <span className="label-text font-semibold ml-2">{config.label}</span>
            </label>
          </div>
        );

      case 'text':
      default:
        return (
          <div className="form-control w-full mb-4" key={fieldName}>
            <label className="label">
              <span className="label-text font-semibold">{config.label}</span>
            </label>
            <input
              type="text"
              name={fieldName}
              value={value}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className="input input-bordered w-full disabled:opacity-50"
            />
          </div>
        );
    }
  };

  if (storeLoading) {
    return (
      <div className='flex justify-center items-center min-h-[70vh]'>
        <p className='text-lg text-gray-500'>Loading store details...</p>
      </div>
    );
  }

  if (storeError) {
    return (
      <div className='flex justify-center items-center min-h-[70vh]'>
        <p className='text-lg text-red-500'>Failed to load store details. Please try again later.</p>
      </div>
    );
  }

  // No store selected state
  if (!storeMaintenance) {
    return (
      <div className='flex justify-center items-center min-h-[70vh]'>
        <p className='text-lg text-gray-500'>No store selected. Please select a store to view details.</p>
      </div>
    );
  }


  return (
    <div className='mt-8 p-6'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#4B449D' }}>
          Store Maintenance:
        </h2>
        <div className="flex space-x-2">
          {storeMaintainanceOptions.map((option, index) => (
            <button
              key={index}
              className='btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none h-[40px]'
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex bg-gray-100 bg-white shadow-md p-6 rounded-lg">
        <ul className="w-1/5 mr-10">
          {sections.map((section, index) => (
            <li
              key={section.name}
              className={`cursor-pointer rounded-md p-2 mb-2 ${index === currentSection ? 'bg-[#4B449D] text-white' : 'hover:bg-gray-200'}`}
              onClick={() => setCurrentSection(index)}
            >
              {section.name}
            </li>
          ))}
        </ul>

        <div className="w-4/5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sections[currentSection].fields.map(fieldName =>
              storeDetails.hasOwnProperty(fieldName) ? renderField(fieldName) : null
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              className='btn btn-sm hover:bg-[#4B449D] hover:border-[#4B449D] hover:outline-none hover:text-white text-[#4B449D] h-[40px] w-[100px]'
              onClick={handleCancel}
              disabled={!hasChanges}
            >
              Cancel
            </button>
            <button
              className='btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none h-[40px] w-[100px]'
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save
            </button>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity="success">
                Saved successfully!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreMaintenance;