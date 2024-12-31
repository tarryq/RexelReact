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
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'Communication')}>Account Communication <EastIcon sx={{fontSize: '14px'}} /></p>
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'Location')}>Location Maintenance <EastIcon sx={{fontSize: '14px'}} /></p>
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'AccountCustomField')}>Account Custom Field Maintenance<EastIcon sx={{fontSize: '14px'}} /></p>
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'CustomGridColumnDefinitions')}>Custom Grid Column Definition<EastIcon sx={{fontSize: '14px'}} /></p>
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'LampGuideDisplayOptions')}>Lamp Guide Display Definition<EastIcon sx={{fontSize: '14px'}} /></p>
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'MaxOrderValueMaintenance')}>Maximum Order Value Maintenance<EastIcon sx={{fontSize: '14px'}} /></p>
      <p style={labelStyle} onClick={setMaintenanceCapture.bind(this, 'ImageMaintenance')}>Image Maintenance<EastIcon sx={{fontSize: '14px'}} /></p>
    </div>
  );
};

export default AccountMaintenance;
