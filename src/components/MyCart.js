// MyCart.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MyCart = () => {
 // const cartItems = useSelector((state) => state?.cart?.cartItems ?? []);
 // console.log('cartItems', cartItems);

 // const calculateLineValue = (item) => {
 //  return (item.quantitytoorder * (item.price || 0)).toFixed(2);
 // };

 return (
  <Box sx={{ padding: '20px 30px' }}>
   <Typography
    variant="h5"
    sx={{
     color: '#4B449D',
     fontWeight: 600,
     marginBottom: 3
    }}
   >
    My Cart
   </Typography>

   {/* {cartItems.length > 0 ? (
    <TableContainer component={Paper}>
     <Table sx={{ minWidth: 650 }}>
      <TableHead>
       <TableRow sx={{ backgroundColor: '#4B449D' }}>
        <TableCell sx={{ color: 'white' }}>Vendor Part Number</TableCell>
        <TableCell sx={{ color: 'white' }}>Lamp Description</TableCell>
        <TableCell sx={{ color: 'white' }} align="center">Number of Cases Needed</TableCell>
        <TableCell sx={{ color: 'white' }} align="center">Case Size</TableCell>
        <TableCell sx={{ color: 'white' }} align="center">UOM</TableCell>
        <TableCell sx={{ color: 'white' }} align="center">Quantity Shipping To you</TableCell>
        <TableCell sx={{ color: 'white' }} align="right">Line Value</TableCell>
       </TableRow>
      </TableHead>
      <TableBody>
       {cartItems.map((item) => (
        <TableRow key={item.eclipseID}>
         <TableCell>{item.vendorpartnumber}</TableCell>
         <TableCell>{item.description}</TableCell>
         <TableCell align="center">
          {Math.ceil(item.quantitytoorder / item.quantityincase)}
         </TableCell>
         <TableCell align="center">{item.quantityincase}</TableCell>
         <TableCell align="center">CS</TableCell>
         <TableCell align="center">{item.quantitytoorder}</TableCell>
         <TableCell align="right">${calculateLineValue(item)}</TableCell>
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </TableContainer>
   ) : (
    <Box
     sx={{
      textAlign: 'center',
      py: 4,
      color: '#666'
     }}
    >
     <Typography>Your cart is empty</Typography>
    </Box>
   )} */}
  </Box>
 );
};

export default MyCart;