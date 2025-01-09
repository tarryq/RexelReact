import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const MaxOrderValueMaintenance = () => {
  const { accounts, stores, selectedAccount, selectedStore } = useSelector((state) => state.accounts);
  console.log('Selected Account:', selectedAccount);

  const [storeOverrides, setStoreOverrides] = useState([]);
  console.log('Store Overrides:', storeOverrides);
  const [selectedStoreOverride, setSelectedStoreOverride] = useState('');
  const [maxOrderValue, setMaxOrderValue] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddStore = () => {
    if (selectedStoreOverride && !storeOverrides.includes(selectedStoreOverride)) {
      setStoreOverrides([selectedStoreOverride]);
    }
  };

  const handleRemoveStore = (store) => {
    setStoreOverrides(storeOverrides.filter((s) => s !== store));
  };

  const handleUpdateMaxOrderValue = async () => {
    try {
      const storeId = storeOverrides.length > 0 ? storeOverrides[0] : 0;
      const url = `https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api/account/UpdateMaxOrder?accountId=${selectedAccount.id}&storeId=${storeId}&amount=${maxOrderValue}`;
      await axios.post(url);

      setSnackbar({
        open: true,
        message: 'Max order value updated successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update max order value',
        severity: 'error'
      });
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
          <h1 className='text-2xl font-semibold text-[#4B449D] mb-8'>Maximum Order Value Maintenance</h1>

          {/* Account Level Default Section */}
          <div className='mb-8'>
            <div className='flex flex-col md:flex-row md:items-end gap-4'>
              <div className='flex-grow md:max-w-xs'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Account level default maximum order value</label>
                <input type='number' className='w-full px-4 py-2 border border-gray-300 rounded-md' placeholder='Enter value' value={maxOrderValue} onChange={(e) => setMaxOrderValue(e.target.value)} />
              </div>
              <div className='flex gap-2'>
                <button className='btn px-4 py-2 bg-[#4B449D] text-white rounded-md hover:bg-[#38327D] transition-colors' onClick={handleUpdateMaxOrderValue}>
                  Update
                </button>
                <button className='btn px-4 py-2 border border-purple-200 text-[#4B449D] rounded-md hover:bg-purple-50 transition-colors'>Remove</button>
              </div>
            </div>
          </div>

          {/* Store Override Section */}
          <div className='border-t pt-6'>
            <div className='grid md:grid-cols-2 gap-6 mb-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Store</label>
                <select value={selectedStoreOverride} onChange={(e) => setSelectedStoreOverride(e.target.value)} className='w-full px-4 py-2 border-gray-300 select select-bordered select-md'>
                  <option value=''>{selectedAccount?.name || '- Select Account -'}</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.storeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mt-6'>
                <button onClick={handleAddStore} className='btn w-full px-4 py-2 bg-[#4B449D] text-white rounded-md hover:bg-[#38327D] transition-colors flex items-center justify-center gap-2'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                  </svg>
                  Add to Store Override List
                </button>
              </div>
            </div>

            {/* Override List */}
            {storeOverrides.length > 0 && (
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Store Override List</label>
                {storeOverrides.map((store, index) => (
                  <div key={index} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 group'>
                    <span className='text-gray-700'>{stores.find((s) => s.id == store)?.storeName || store}</span>
                    <button onClick={() => handleRemoveStore(store)} className='text-gray-400 hover:text-red-600 transition-colors p-1'>
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MaxOrderValueMaintenance;