import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { getAccountConfig, EDITABLE_FIELDS } from '../form-configs/accountConfig';
import { Box, Grid } from '@mui/material';


const AccountMaintenance = ({ selectedAccount, accounts, onSave }) => {
 const [accountDetails, setAccountDetails] = useState({});
 const [originalDetails, setOriginalDetails] = useState({});

 useEffect(() => {
  const account = accounts.find(acc => acc.account === selectedAccount);
  if (account) {
   const editableDetails = EDITABLE_FIELDS.reduce((acc, field) => {
    if (field in account) {
     acc[field] = account[field];
    }
    return acc;
   }, {});
   setAccountDetails(editableDetails);
   setOriginalDetails(editableDetails);
  }
 }, [selectedAccount, accounts]);

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setAccountDetails(prev => ({ ...prev, [name]: value }));
 };

 const handleSave = () => {
  const updatedDetails = Object.keys(accountDetails).reduce((acc, key) => {
   const config = getAccountConfig(key);
   if (!config.readOnly) {
    acc[key] = accountDetails[key];
   }
   return acc;
  }, {});
  onSave(updatedDetails);
 };

 const handleCancel = () => {
  setAccountDetails(originalDetails);
 };

 const renderField = (fieldName) => {
  const config = getAccountConfig(fieldName);
  const value = accountDetails[fieldName] || '';
  const isReadOnly = config.readOnly || false;

  const commonProps = {
   key: fieldName,
   label: config.label,
   name: fieldName,
   value: value,
   onChange: handleInputChange,
   fullWidth: true,
   disabled: isReadOnly,
   InputProps: {
    readOnly: isReadOnly,
   },
  };

  switch (config.type) {
   case 'select':
    return (
     <FormControl fullWidth key={fieldName} disabled={isReadOnly}>
      <InputLabel>{config.label}</InputLabel>
      <Select
       {...commonProps}
      >
       {config.options.map(option => (
        <MenuItem key={option} value={option}>{option}</MenuItem>
       ))}
      </Select>
     </FormControl>
    );
   case 'password':
    return (
     <TextField
      {...commonProps}
      type="password"
     />
    );
   default:
    return (
     <TextField
      {...commonProps}
      type={config.type}
     />
    );
  }
 };

 return (
  <Box sx={{ p: 4, backgroundColor: 'white', boxShadow: 3, borderRadius: 2 }}>
   <h2 className='text-2xl font-bold mb-6' style={{ color: '#4B449D' }}>Account Maintenance: {selectedAccount}</h2>
   <Grid container spacing={2}>
    {EDITABLE_FIELDS.map(fieldName =>
     accountDetails.hasOwnProperty(fieldName) ? (
      <Grid item xs={6} sm={4} md={3} key={fieldName}>
       {renderField(fieldName)}
      </Grid>
     ) : null
    )}
   </Grid>
   <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
    <button className='btn btn-sm btn-outline hover:bg-[#4B449D] hover:border-[#4B449D] hover:outline-none text-[#4B449D] h-[40px]' onClick={handleCancel}>Cancel Changes</button>
    <button className='btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none h-[40px]' onClick={handleSave}>Save Changes</button>

   </Box>
  </Box>
 );

 
};

export default AccountMaintenance;

//daisyUI inputfeilds:

// import React, { useState, useEffect } from 'react';
// import { getAccountConfig, EDITABLE_FIELDS } from '../form-configs/accountConfig';


// const AccountMaintenance = ({ selectedAccount, accounts, onSave }) => {
//  const [accountDetails, setAccountDetails] = useState({});
//  const [originalDetails, setOriginalDetails] = useState({});

//  useEffect(() => {
//   const account = accounts.find(acc => acc.account === selectedAccount);
//   if (account) {
//    const editableDetails = EDITABLE_FIELDS.reduce((acc, field) => {
//     if (field in account) {
//      acc[field] = account[field];
//     }
//     return acc;
//    }, {});
//    setAccountDetails(editableDetails);
//    setOriginalDetails(editableDetails);
//   }
//  }, [selectedAccount, accounts]);

//  const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setAccountDetails(prev => ({ ...prev, [name]: value }));
//  };

//  const handleSave = () => {
//   const updatedDetails = Object.keys(accountDetails).reduce((acc, key) => {
//    const config = getAccountConfig(key);
//    if (!config.readOnly) {
//     acc[key] = accountDetails[key];
//    }
//    return acc;
//   }, {});
//   onSave(updatedDetails);
//  };

//  const handleCancel = () => {
//   setAccountDetails(originalDetails);
//  };

//  const renderField = (fieldName) => {
//   const config = getAccountConfig(fieldName);
//   const value = accountDetails[fieldName] || '';
//   const isReadOnly = config.readOnly || false;

//   if (config.type === 'select') {
//    return (
//     <div className="form-control w-full" key={fieldName}>
//      <label className="label">
//       <span className="label-text">{config.label}</span>
//      </label>
//      <select
//       name={fieldName}
//       value={value}
//       onChange={handleInputChange}
//       disabled={isReadOnly}
//       className="select select-bordered w-full disabled:opacity-50"
//      >
//       {config.options.map(option => (
//        <option key={option} value={option}>{option}</option>
//       ))}
//      </select>
//     </div>
//    );
//   }

//   return (
//    <div className="form-control w-full" key={fieldName}>
//     <label className="label">
//      <span className="label-text">{config.label}</span>
//     </label>
//     <input
//      name={fieldName}
//      type={config.type === 'password' ? 'password' : 'text'}
//      value={value}
//      onChange={handleInputChange}
//      disabled={isReadOnly}
//      className="input input-bordered w-full disabled:opacity-50"
//     />
//    </div>
//   );
//  };

//  return (
//   <div className="p-6 bg-white shadow-md rounded-lg">
//    <h2 className="text-2xl font-bold mb-4">Account Maintenance: {selectedAccount}</h2>
//    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//     {EDITABLE_FIELDS.map(fieldName =>
//      accountDetails.hasOwnProperty(fieldName) ? renderField(fieldName) : null
//     )}
//    </div>
//    <div className="mt-6 flex justify-end space-x-4">
//     <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
//     <button className="btn btn-outline" onClick={handleCancel}>Cancel Changes</button>
//    </div>
//   </div>
//  );
// };

// export default AccountMaintenance;
