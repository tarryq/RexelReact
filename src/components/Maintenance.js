import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';

const labelStyle = {
  fontSize: '16px',
  color: '#4B449D',
  textDecoration: 'underline',
  margin: '18px 0px',
  cursor: 'pointer'
};

const AccountMaintenance = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const navigateWithQuery = (path) => {
    const account = searchParams.get('account') || '';
    const store = searchParams.get('store') || '';
    navigate(`${path}?account=${account}&store=${store}`);
  };

  return (
    <div className='bg-white p-6 rounded-md mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Maintenance Dashboard</h2>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/account-maintenance')}>
        Account Maintenance <EastIcon sx={{ fontSize: '14px' }} />
      </p>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/store-maintenance')}>
        Store Maintenance <EastIcon sx={{ fontSize: '14px' }} />
      </p>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/account-communication')}>
        Account Communication <EastIcon sx={{ fontSize: '14px' }} />
      </p>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/location-maintenance')}>
        Location Maintenance <EastIcon sx={{ fontSize: '14px' }} />
      </p>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/account-custom-field-maintenance')}>
        Account Custom Field Maintenance <EastIcon sx={{ fontSize: '14px' }} />
      </p>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/custom-grid-column-definitions')}>
        Custom Grid Column Definitions <EastIcon sx={{ fontSize: '14px' }} />
      </p>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/lamp-guide-display-options')}>
        Lamp Guide Display Options <EastIcon sx={{ fontSize: '14px' }} />
      </p>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/max-order-value-maintenance')}>
        Maximum Order Value Maintenance <EastIcon sx={{ fontSize: '14px' }} />
      </p>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/image-maintenance')}>
        Image Maintenance <EastIcon sx={{ fontSize: '14px' }} />
      </p>
      <p style={labelStyle} onClick={() => navigateWithQuery('/maintenance/lamp-guide')}>
        Lamp Guide <EastIcon sx={{ fontSize: '14px' }} />
      </p>
    </div>
  );
};

export default AccountMaintenance;
