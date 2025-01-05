import React from 'react';

export const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className='spinner' style={{ border: '4px solid #f3f3f3', borderRadius: '50%', borderTop: '4px solid #4B449D', width: '30px', height: '30px', animation: 'spin 1s linear infinite' }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <p style={{ marginLeft: '10px', fontSize: '16px', color: '#4B449D' }}>Loading...</p>
    </div>
  );
};

export default Spinner;
