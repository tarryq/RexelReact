import React from 'react';
import EastIcon from '@mui/icons-material/East';
const labelStyle = {
  fontSize: '16px',
  color: '#4B449D',
  textDecoration: 'underline',
  margin :'18px 0px',
  cursor: 'pointer'
}
const AccountMaintenance = (props) => {
  const setMaintenanceCapture = (menu) => {
    props.setActiveTab(menu);
  };
  return (
    <div className='bg-white p-6 rounded-md mt-8'>
      <h2 className='text-2xl font-bold mb-4' >Maintenance Dashboard</h2>
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'Accounts')}>Account Maintenance <EastIcon sx={{fontSize: '14px'}} /></p>
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'Store')}>Store Maintenance <EastIcon sx={{fontSize: '14px'}} /></p>
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'Location')}>Location Maintenance <EastIcon sx={{fontSize: '14px'}} /></p>
    </div>
  );
};

export default AccountMaintenance;
