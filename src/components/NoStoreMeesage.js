import React from 'react';
import { Box, Typography } from '@mui/material';

const NoStoreMessage = ({ accountName }) => (
 <Box
  sx={{
   padding: '20px 30px',
   backgroundColor: '#FFFFFF',
   margin: '10px 0px',
   borderRadius: '12px',
   boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
   minHeight: '200px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   gap: 2
  }}
 >
  <Typography
   variant="h6"
   sx={{
    color: '#4B449D',
    fontWeight: 600,
    textAlign: 'center'
   }}
  >
   No Stores Available
  </Typography>
  <Typography
   variant="body1"
   sx={{
    color: '#666',
    textAlign: 'center',
    maxWidth: '500px'
   }}
  >
   {accountName
    ? `No stores are available for the selected account: ${accountName}`
    : 'Please select an account to view available stores'}
  </Typography>
 </Box>
);

export default NoStoreMessage;