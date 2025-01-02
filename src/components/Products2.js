// import React, { useState, useEffect } from 'react';
// import { Box, TextField, Button, Typography, Modal, Grid, Paper, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { DataGrid } from '@mui/x-data-grid';
// import { highlightText } from '../util';

// const returnAccountGridCloumns = [
//   {
//     "id": 3606,
//     "accountID": 2,
//     "columnID": 5,
//     "columnName": "ThumbnailImageIDURL",
//     "orderID": 1,
//     "accountColumnName": "Image",
//     "accountColumnWidth": 20,
//     "colorID": 22,
//     "colorHexCode": "#000000",
//     "accountCompositeColumnID": 0,
//     "cellAlignment": "C",
//     "cellAlignmentHTMLStyleValueToUse": "text-align: center; ",
//     "cellAlignmentiTextSharpImageValueToUse": 1,
//     "cellAlignmentiTextSharpValueToUse": 1,
//     "cellAlignmentCSSValueToUse": "DisplayGridDetailCenter",
//     "maintenanceDisplayLabel": "Image (ThumbnailImageIDURL)",
//     "gridDisplayLabel": "Image",
//     "doNotDisplayDataOnPDF": false,
//     "errorMessage": "",
//     "configurationService": {}
//   },
//   {
//     "id": 2864,
//     "accountID": 2,
//     "columnID": 21,
//     "columnName": "VendorPartNumber",
//     "orderID": 2,
//     "accountColumnName": "Vendor Part Number",
//     "accountColumnWidth": 10,
//     "colorID": 22,
//     "colorHexCode": "#000000",
//     "accountCompositeColumnID": 0,
//     "cellAlignment": "C",
//     "cellAlignmentHTMLStyleValueToUse": "text-align: center; ",
//     "cellAlignmentiTextSharpImageValueToUse": 1,
//     "cellAlignmentiTextSharpValueToUse": 1,
//     "cellAlignmentCSSValueToUse": "DisplayGridDetailCenter",
//     "maintenanceDisplayLabel": "Vendor Part Number (VendorPartNumber)",
//     "gridDisplayLabel": "Vendor Part Number",
//     "doNotDisplayDataOnPDF": false,
//     "errorMessage": "",
//     "configurationService": {}
//   },
//   {
//     "id": 4459,
//     "accountID": 2,
//     "columnID": 26,
//     "columnName": "N/A",
//     "orderID": 3,
//     "accountColumnName": "",
//     "accountColumnWidth": 30,
//     "colorID": 22,
//     "colorHexCode": "#000000",
//     "accountCompositeColumnID": 4,
//     "cellAlignment": "L",
//     "cellAlignmentHTMLStyleValueToUse": "text-align: left; ",
//     "cellAlignmentiTextSharpImageValueToUse": 0,
//     "cellAlignmentiTextSharpValueToUse": 0,
//     "cellAlignmentCSSValueToUse": "DisplayGridDetailLeft",
//     "maintenanceDisplayLabel": " (N/A)",
//     "gridDisplayLabel": "N/A",
//     "doNotDisplayDataOnPDF": false,
//     "errorMessage": "Could not find stored procedure 'woeLoadAccountGridColumnOption'.",
//     "configurationService": {}
//   },
//   {
//     "id": 2862,
//     "accountID": 2,
//     "columnID": 9,
//     "columnName": "LocationInStoreText",
//     "orderID": 4,
//     "accountColumnName": "Location In Store",
//     "accountColumnWidth": 20,
//     "colorID": 22,
//     "colorHexCode": "#000000",
//     "accountCompositeColumnID": 0,
//     "cellAlignment": "L",
//     "cellAlignmentHTMLStyleValueToUse": "text-align: left; ",
//     "cellAlignmentiTextSharpImageValueToUse": 0,
//     "cellAlignmentiTextSharpValueToUse": 0,
//     "cellAlignmentCSSValueToUse": "DisplayGridDetailLeft",
//     "maintenanceDisplayLabel": "Location In Store (LocationInStoreText)",
//     "gridDisplayLabel": "Location In Store",
//     "doNotDisplayDataOnPDF": false,
//     "errorMessage": "",
//     "configurationService": {}
//   },
//   {
//     "id": 2866,
//     "accountID": 2,
//     "columnID": 3,
//     "columnName": "QuantityInCase",
//     "orderID": 5,
//     "accountColumnName": "Case Quantity",
//     "accountColumnWidth": 10,
//     "colorID": 22,
//     "colorHexCode": "#000000",
//     "accountCompositeColumnID": 0,
//     "cellAlignment": "C",
//     "cellAlignmentHTMLStyleValueToUse": "text-align: center; ",
//     "cellAlignmentiTextSharpImageValueToUse": 1,
//     "cellAlignmentiTextSharpValueToUse": 1,
//     "cellAlignmentCSSValueToUse": "DisplayGridDetailCenter",
//     "maintenanceDisplayLabel": "Case Quantity (QuantityInCase)",
//     "gridDisplayLabel": "Case Quantity",
//     "doNotDisplayDataOnPDF": false,
//     "errorMessage": "",
//     "configurationService": {}
//   },
//   {
//     "id": 3945,
//     "accountID": 2,
//     "columnID": 10,
//     "columnName": "QuantityToOrder",
//     "orderID": 6,
//     "accountColumnName": "Quantity to Order",
//     "accountColumnWidth": 10,
//     "colorID": 22,
//     "colorHexCode": "#000000",
//     "accountCompositeColumnID": 0,
//     "cellAlignment": "C",
//     "cellAlignmentHTMLStyleValueToUse": "text-align: center; ",
//     "cellAlignmentiTextSharpImageValueToUse": 1,
//     "cellAlignmentiTextSharpValueToUse": 1,
//     "cellAlignmentCSSValueToUse": "DisplayGridDetailCenter",
//     "maintenanceDisplayLabel": "Quantity to Order (QuantityToOrder)",
//     "gridDisplayLabel": "Quantity to Order",
//     "doNotDisplayDataOnPDF": false,
//     "errorMessage": "",
//     "configurationService": {}
//   }
// ]

// const returnAccountStoreProducts = [
//   {
//     "accountID": 2,
//     "productAccountStoreMasterID": 227200,
//     "pasMasControlID": "ID227200",
//     "descriptionFull": "F21T5/830/ALTO - 21W 120V, T5 Linear Fluorescent, Miniature Bi-Pin Base, 34\" Length, 0.625\" Dia, 3000K",
//     "descriptionShort": "F21T5/830/ALTO   34\" LONG",
//     "imageID": 3000,
//     "customerPartNumber": "",
//     "locationInStore": 32357,
//     "locationInStoreText": "",
//     "locationInStoreDescriptionText": "",
//     "quantityInCase": 6,
//     "eclipseID": "240503",
//     "ballastText": "",
//     "serviceProviderPartNumber": "",
//     "thumbnailImageID": 3000,
//     "fixtureImageID": 621,
//     "fixtureImageIDURL": "",
//     "fixtureDescription": "",
//     "lifeExpectancy": 49,
//     "quantityToOrder": 0,
//     "priceOfOneUnit": 6.42000,
//     "priceOfOneUnitDisplay": "$6.42",
//     "replacementProductNotes": "",
//     "locationColor": 0,
//     "vendorPartNumber": "23081",
//     "unitOfMeasure": "CS",
//     "maxOrderQuantity": 0,
//     "casePrice": 38.52000,
//     "casePriceDisplay": "$38.52",
//     "productDelisted": false,
//     "activeAtProductAccountLevel": true,
//     "productIsDisplayOnlyACCOUNT": false,
//     "productIsDisplayOnlySTORE": false,
//     "currentLanguage": 1,
//     "recyclable": true,
//     "recyclableLabel": "Yes",
//     "warrantyInformation": "",
//     "productCategory": "Fluorescent ",
//     "productSubcategory": "T5",
//     "minOrderQuantity": 0,
//     "inventoryOnHand": 0,
//     "inventoryQuantityLastUpdatedDisplay": "",
//     "quantityInLocation": 0,
//     "extendedPriceDisplay": "$0.00",
//     "quantityShippingToYou": 0,
//     "sequenceID": 0,
//     "itemNotes": "",
//     "configurationService": {}
//   }
// ]

// const ProductTable = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantities, setQuantities] = useState({});
//   console.log('searchTerm', searchTerm)
//   console.log('quantities', quantities)

//   useEffect(() => {
//     const requiredColumns = [
//       { field: 'vendorPartNumber',
//         headerName: 'Part Number',
//         width: 170,
//         renderCell: (params) => <Box>{highlightText(params.value.toString(), searchTerm)}</Box>
//        },
//       { field: 'descriptionShort',
//         headerName: 'Description',
//         width: 200,
//         renderCell: (params) => <Box>{highlightText(params.value, searchTerm)}</Box>
//       },
//       {
//         field: 'thumbnailImageID',
//         headerName: 'Lamp Image',
//         width: 180,
//         renderCell: (params) =>
//           params.value ? (
//             <Box
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               sx={{ width: '100%', height: '100%' }}
//             >
//               <img
//                 src={params.value}
//                 alt={params.row.descriptionShort || 'Lamp Image'}
//                 style={{
//                   width: 50,
//                   height: 50,
//                   borderRadius: '4px',
//                   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//                 }}
//               />
//             </Box>
//           ) : (
//             'N/A'
//           ),
//       },
//       { field: 'locationInStoreText',
//         headerName: 'Location',
//          width: 200,
//         renderCell: (params) => <Box>{highlightText(params.value, searchTerm)}</Box>
//          },
//       { field: 'quantityInCase',
//         headerName: 'Case Quantity',
//         width: 180,
//         renderCell: (params) => <Box>{highlightText(params.value.toString(), searchTerm)}</Box>
//        },
//       {
//         field: 'quantityToOrder',
//         headerName: 'No. of Cases Needed',
//         width: 220,
//         flex: 1,
//         sortable: false,
//         align: 'right',
//         headerAlign: 'right',
//         renderCell: (params) => (
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="end"
//             gap={1}
//             sx={{ width: '100%', height: '100%' }}
//           >
//             {console.log('params', params)}
//             {console.log('quantities inside>>>', quantities)}
//             <Button
//               variant="outlined"
//               sx={{
//                 backgroundColor: 'transparent',
//                 color: '#4B449D',
//                 fontSize: '24px',
//                 padding: 0,
//                 height: '40px',
//                 width: '40px',
//                 minWidth: '40px',
//                 borderRadius: '50%',
//                 border: '0px',
//                 '&:hover': { backgroundColor: '#FF292920' },
//               }}
//               onClick={(event) => handleDecrement(params.row.vendorPartNumber, event)}
//             >
//               -
//             </Button>

//             <TextField
//               size="small"
//               variant="outlined"
//               value={quantities[params.row.vendorPartNumber] || 0}
//               onClick={(e) => e.stopPropagation()}
//               onChange={(e) =>
//                 handleInputChange(params.row.vendorPartNumber, e.target.value, e)
//               }
//               inputProps={{
//                 style: {
//                   textAlign: 'center',
//                   fontSize: '16px',
//                 },
//               }}
//               sx={{
//                 width: '60px',
//                 '& .MuiOutlinedInput-root': {
//                   height: '40px',
//                   borderRadius: '8px',
//                   '& fieldset': { borderColor: '#4B449D' },
//                   '&:hover fieldset': { borderColor: '#4B449D' },
//                   '&.Mui-focused fieldset': { borderWidth: '2px', borderColor: '#4B449D' },
//                 },
//               }}
//             />

//             <Button
//               variant="outlined"
//               sx={{
//                 backgroundColor: 'transparent',
//                 color: '#4B449D',
//                 fontSize: '24px',
//                 padding: 0,
//                 height: '40px',
//                 width: '40px',
//                 minWidth: '40px',
//                 borderRadius: '50%',
//                 border: '0px',
//                 '&:hover': { backgroundColor: '#54C39220' },
//               }}
//               onClick={(event) => handleIncrement(params.row.vendorPartNumber, event)}
//             >
//               +
//             </Button>
//           </Box>
//         ),
//       },

//       {
//         field: 'addToCart',
//         headerName: '',
//         width: 150,
//         sortable: false,
//         disableColumnMenu: true,
//         renderCell: (params) => (
//           <Button
//             variant='contained'
//             size='small'
//             sx={{
//               backgroundColor: '#4B449D',
//               color: 'white',
//               fontWeight: 'bold',
//               textTransform: 'none',
//               '&:hover': {
//                 backgroundColor: '#4B449D'
//               }
//             }}
//             onClick={() => handleAddToCart(params.row)}
//           >
//             Add to Cart
//           </Button>
//         )
//       }
//     ];

//     setColumns(requiredColumns);

//     // Map products to rows with required fields only
//     const dynamicRows = returnAccountStoreProducts.map((product, index) => ({
//       id: index, // Ensure unique ID
//       vendorPartNumber: product.vendorPartNumber || 'N/A',
//       descriptionShort: product.descriptionShort || 'N/A',
//       thumbnailImageID: product.thumbnailImageID || 'https://m.media-amazon.com/images/I/51Dm-gL1zeL._AC_UL480_FMwebp_QL65_.jpg',
//       locationInStoreText: product.locationInStoreText || 'N/A',
//       quantityInCase: product.quantityInCase || 0,
//       quantityToOrder: product.quantityToOrder || 0,
//     }));

//     setRows(dynamicRows);
//     setFilteredRows(dynamicRows); // Initialize filtered rows
//   }, [returnAccountGridCloumns, returnAccountStoreProducts]);

//   useEffect(() => {
//     setQuantities(
//       rows.reduce((acc, row) => {
//         acc[row.vendorPartNumber] = 0;
//         return acc;
//       }, {})
//     );
//   }, [rows]);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     const lowerCaseValue = value.toLowerCase();
//     setFilteredRows(
//       rows.filter((row) =>
//         ['vendorPartNumber', 'descriptionShort', 'locationInStoreText'].some((key) =>
//           row[key]?.toString().toLowerCase().includes(lowerCaseValue)
//         )
//       )
//     );
//   };

// const handleIncrement = (vendorPartNumber, event) => {
//   event.stopPropagation();
//   setQuantities((prev) => ({
//     ...prev,
//     [vendorPartNumber]: (prev[vendorPartNumber] || 0) + 1,
//   }));
// };

// const handleDecrement = (vendorPartNumber, event) => {
//   event.stopPropagation();
//   setQuantities((prev) => ({
//     ...prev,
//     [vendorPartNumber]: Math.max((prev[vendorPartNumber] || 0) - 1, 0),
//   }));
// };

// const handleInputChange = (vendorPartNumber, value, event) => {
//   event.stopPropagation();
//   const numberValue = value === '' ? 0 : parseInt(value, 10);
//   if (!isNaN(numberValue) && numberValue >= 0) {
//     setQuantities((prev) => ({
//       ...prev,
//       [vendorPartNumber]: numberValue,
//     }));
//   }
// };


//   const handleAddToCart = (product) => {
//     // console.log('Added to cart:', product, 'Quantity:', quantities[product.partNumber]);
//   };

//   const handleRowClick = (params) => {
//     setSelectedProduct(params.row);
//   };

//   const handleCloseModal = () => {
//     setSelectedProduct(null);
//   };

//   console.log('selectedProduct', selectedProduct)

//   return (

//     <>
//     <Box sx={{ padding: '20px 30px', backgroundColor: '#FFFFFF', margin: '10px 0px', borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
//       <Typography variant='body1' sx={{ display: 'flex', alignItems: 'start', color: '#4B449D', fontWeight: 600, fontSize: '24px' }}>
//         Products
//       </Typography>
//       <TextField
//         label='Search by Part Number, Description, or Location'
//         variant='outlined'
//         size='small'
//         value={searchTerm}
//         onChange={handleSearchChange}
//         sx={{
//           width: '100%',
//           maxWidth: '40%',
//           margin: '16px 0px',
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: '#4B449D'
//             },
//             '&:hover fieldset': {
//               borderColor: '#4B449D'
//             },
//             '&.Mui-focused fieldset': {
//               borderWidth: '2px',
//               borderColor: '#4B449D'
//             }
//           },
//           '& .MuiInputLabel-root': {
//             color: '#4B449D'
//           },
//           '& .MuiInputLabel-root.Mui-focused': {
//             color: '#4B449D'
//           }
//         }}
//       />
//       <DataGrid
//         rows={filteredRows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 20
//             }
//           }
//         }}
//         pageSizeOptions={[10, 20, 50, 100]}
//           onRowClick={handleRowClick}
//         disableSelectionOnClick
//         rowHeight={60}
//         columnHeaderHeight={60}
//         disableColumnSelector
//         disableRowSelectionOnClick
//         sx={{
//           overflow: 'hidden',
//           maxHeight: '500px',
//           border: '0px',
//           '& .MuiDataGrid-columnHeader': {
//             backgroundColor: '#4B449D', // Primary color
//             color: 'white',
//             fontWeight: 600,
//             textTransform: 'uppercase',
//             fontSize: '0.85rem',
//             letterSpacing: '0.5px'
//           },
//           '& .MuiDataGrid-columnHeader:focus': {
//             outline: 'none !important',
//             border: 'none !important'
//           },
//           '& .MuiDataGrid-columnHeader.Mui-selected': {
//             outline: 'none !important',
//             border: 'none !important'
//           },
//           '& .MuiDataGrid-columnHeader:hover': {
//             backgroundColor: '#3D3689', // Slightly darker shade for hover
//             outline: 'none !important',
//             border: 'none !important'
//           },
//           '& .MuiDataGrid-columnHeaderTitle': {
//             fontWeight: 600,
//             whiteSpace: 'normal',
//             textAlign: 'left'
//           },
//           '& .MuiDataGrid-columnSeparator': {
//             color: 'rgba(255,255,255,0.2)'
//           },
//           '& .MuiDataGrid-row.selected': {
//             backgroundColor: 'transparent !important'
//           },
//           '& .MuiDataGrid-cell:focus': {
//             outline: 'none'
//           },
//           '& .MuiDataGrid-menuIcon': {
//             visibility: 'visible !important',
//             width: 'auto',
//             marginLeft: 'auto',
//             color: 'white !important',
//             '& svg': {
//               color: 'white !important'
//             }
//           },
//           '& .MuiDataGrid-cell': {
//             textAlign: 'left',
//             borderRight: '1px solid #CCCCCC70',
//             outline: 'none !important'
//           },
//           '& .MuiDataGrid-row:hover': {
//             backgroundColor: '#4B449D12',
//             color: '#4B449D !important',
//             fontWeight: '500 !important'
//           },
//           '& .MuiDataGrid-iconButtonContainer': {
//             visibility: 'visible',
//             opacity: 1,
//             '& .MuiDataGrid-sortIcon': {
//               color: 'white !important'
//             }
//           }
//         }}
//       />
//     </Box>
//       <Modal
//         open={!!selectedProduct}
//         onClose={handleCloseModal}
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//       >
//         <Paper
//           sx={{
//             width: '80%',
//             maxWidth: '800px',
//             maxHeight: '90%',
//             overflow: 'auto',
//             borderRadius: '16px',
//             boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//             position: 'relative'
//           }}
//         >
//           {
//           selectedProduct &&
//            (
//             <Box>
//               {/* Close Button */}
//               <IconButton
//                 onClick={handleCloseModal}
//                 sx={{
//                   position: 'absolute',
//                   top: 16,
//                   right: 16,
//                   color: '#4B449D',
//                   zIndex: 10
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>

//               {/* Product Details */}
//               <Grid container spacing={3} sx={{ p: 4 }}>
//                 {/* Image Section */}
//                 <Grid item xs={12} md={5}>
//                   <Box
//                     sx={{
//                       width: '100%',
//                       height: '400px',
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       backgroundColor: '#F5F5F5',
//                       borderRadius: '12px',
//                       overflow: 'hidden'
//                     }}
//                   >
//                     <img
//                         src={selectedProduct?.lampImage || 'https://m.media-amazon.com/images/I/51Dm-gL1zeL._AC_UL480_FMwebp_QL65_.jpg' }
//                         alt={selectedProduct?.descriptionShort}
//                       style={{
//                         maxWidth: '100%',
//                         maxHeight: '100%',
//                         objectFit: 'contain'
//                       }}
//                     />
//                   </Box>
//                 </Grid>

//                 {/* Details Section */}
//                 <Grid item xs={12} md={7}>
//                   <Typography variant='h5' sx={{ color: '#4B449D', fontWeight: 'bold', mb: 2 }}>
//                     {selectedProduct.descriptionShort}
//                   </Typography>
//                   <Box
//                     sx={{
//                       backgroundColor: '#F9F9FF',
//                       borderRadius: '12px',
//                       p: 3,
//                       border: '1px solid #4B449D20'
//                     }}
//                   >

//                     <Grid container spacing={2}>
//                       <Grid item xs={6}>

//                         <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#4B449D' }}>
//                           Part Number
//                         </Typography>
//                           <Typography variant='body1'>{selectedProduct?.vendorPartNumber}</Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#4B449D' }}>
//                           Location
//                         </Typography>
//                           <Typography variant='body1'>{selectedProduct?.locationInStoreText}</Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#4B449D' }}>
//                           Case Quantity
//                         </Typography>
//                           <Typography variant='body1'>{selectedProduct?.quantityInCase}</Typography>
//                       </Grid>
//                     </Grid>
//                   </Box>

//                   {/* Quantity Controls */}
//                   <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Button
//                       variant='outlined'
//                       sx={{
//                         backgroundColor: 'transparent',
//                         color: '#4B449D',
//                         fontSize: '24px',
//                         padding: 0,
//                         height: '40px',
//                         width: '40px',
//                         minWidth: '40px',
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         border: '0px',
//                         '&:hover': {
//                           backgroundColor: '#FF292920'
//                         }
//                       }}
//                         onClick={(event) => handleDecrement(selectedProduct.quantityToOrder, event)}
//                     >
//                       -
//                     </Button>

//                     <TextField
//                       size='small'
//                       variant='outlined'
//                       value={quantities[selectedProduct.vendorPartNumber] || 0}
//                       onChange={(e) => handleInputChange(selectedProduct.vendorPartNumber, e.target.value, e)}
//                       inputProps={{
//                         style: {
//                           textAlign: 'center',
//                           fontSize: '16px'
//                         }
//                       }}
//                       sx={{
//                         width: '60px',
//                         '& .MuiOutlinedInput-root': {
//                           height: '40px',
//                           borderRadius: '8px'
//                         }
//                       }}
//                     />

//                     <Button
//                       variant='outlined'
//                       sx={{
//                         backgroundColor: 'transparent',
//                         color: '#4B449D',
//                         fontSize: '24px',
//                         padding: 0,
//                         height: '40px',
//                         width: '40px',
//                         minWidth: '40px',
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         border: '0px',
//                         '&:hover': {
//                           backgroundColor: '#54C39220'
//                         }
//                       }}
//                         onClick={(event) => handleIncrement(selectedProduct.vendorPartNumber, event)}
//                     >
//                       +
//                     </Button>

//                     <Button
//                       variant='contained'
//                       sx={{
//                         backgroundColor: '#4B449D',
//                         color: 'white',
//                         fontWeight: 'bold',
//                         textTransform: 'none',
//                         ml: 2,
//                         '&:hover': {
//                           backgroundColor: '#4B449D'
//                         }
//                       }}
//                       onClick={() => handleAddToCart(selectedProduct)}
//                     >
//                       Add to Cart
//                     </Button>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}
//         </Paper>
//       </Modal>
//     </>
//   );
// };

// export default ProductTable;



import React, { useState,useEffect, useMemo } from 'react';
import { Box, TextField, Button, Typography, Modal, Grid, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { debounce, highlightText } from '../util';
import { ProductTableSkeleton } from '../skeletons/skeleton';

const ProductTable = (props) => {
  const { user, selectedStore, selectedAccount } = props;
  const userid = user?.userId;
  const accountid = selectedAccount?.id;
  const storeid = selectedStore?.id


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [returnAccountGridCloumns, setReturnAccountGridCloumns] = useState([]);
  const [returnAccountStoreProducts, setReturnAccountStoreProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch columns
        const columnsResponse = await fetch(`https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api/account/ReturnAccountGridColumns?accountid=${accountid}&userid=${userid}`);
        const columnsData = await columnsResponse.json();
        setReturnAccountGridCloumns(columnsData);

        // Fetch products
        const productsResponse = await fetch(`https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api/account/ReturnAccountStoreProducts?accountid=${accountid}&storeid=${storeid}&userid=${userid}`);
        const productsData = await productsResponse.json();
        console.log('Products Data:', productsData); // Log to check the structure
        setReturnAccountStoreProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately, maybe show an error message to the user
      }
    };

    fetchData();
  }, [userid, storeid, accountid]);


  function keysToLowerCase(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key.toLowerCase()] = obj[key];
      return acc;
    }, {});
  }

  const initialProducts = useMemo(() => {
    if (Array.isArray(returnAccountStoreProducts)) {
      return returnAccountStoreProducts.map((product, index) => {
        const dynamicProduct = {
          id: index,
          originalProduct: product
        };
        const productWithLowerKeys = keysToLowerCase(product);
        returnAccountGridCloumns.forEach(column => {
          if (column.columnName !== 'N/A' && column.accountColumnName !== '') {
            const lowerCaseFieldName = column.columnName.toLowerCase();

            dynamicProduct[lowerCaseFieldName] = productWithLowerKeys[lowerCaseFieldName] || 'N/A';
            if (lowerCaseFieldName === 'quantitytoorder') {
              dynamicProduct[lowerCaseFieldName] = productWithLowerKeys[lowerCaseFieldName] || 0;
            } else if (lowerCaseFieldName === 'thumbnailimageidurl') {
              dynamicProduct[lowerCaseFieldName] = productWithLowerKeys[lowerCaseFieldName] || product['fixtureImageIDURL'] || '';
            }
          }
        });
        return dynamicProduct;
      });
    } else {
      return [];
    }
  }, [returnAccountStoreProducts, returnAccountGridCloumns]);

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [quantities, setQuantities] = useState(
    initialProducts.reduce((acc, product) => {
      acc[product.partnumber] = product.quantitytoorder || 0;
      return acc;
    }, {})
  );

  useEffect(() => {
    if (initialProducts.length > 0) {
      setFilteredProducts(initialProducts);
      setQuantities(initialProducts.reduce((acc, product) => {
        // We're setting the part number as the key, with the initial quantity to order as the value
        acc[product.partnumber] = product.quantitytoorder || 0; // Default to 0 if quantitytoorder is undefined
        return acc;
      }, {}));
    }
  }, [initialProducts]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        const filtered = initialProducts.filter((product) =>
          returnAccountGridCloumns.some(column => {
            const fieldName = column.columnName.toLowerCase();
            if (fieldName !== 'n/a' && column.accountColumnName !== '') {
              const productField = product[fieldName];
              if (typeof productField === 'string') {
                return productField.toLowerCase().includes(value.toLowerCase());
              } else if (typeof productField === 'number') {
                return productField.toString().includes(value);
              }
            }
            return false;
          })
        );
        setFilteredProducts(filtered);
      }, 300),
    [initialProducts]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleIncrement = (partNumber, event) => {
    event.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [partNumber]: prev[partNumber] + 1
    }));
  };

  const handleDecrement = (partNumber, event) => {
    event.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [partNumber]: Math.max(prev[partNumber] - 1, 0)
    }));
  };

  const handleInputChange = (partNumber, value, event) => {
    event.stopPropagation();
    const numberValue = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(numberValue) && numberValue >= 0) {
      setQuantities((prev) => ({
        ...prev,
        [partNumber]: numberValue
      }));
    }
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product, 'Quantity:', quantities[product.partnumber]);
  };

  const handleRowClick = (params) => {
    setSelectedProduct(params.row);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const columns = returnAccountGridCloumns
    .filter(column => column.columnName !== 'N/A' && column.accountColumnName !== '')
    .map(column => ({
      field: column.columnName.toLowerCase(),
      headerName: column.gridDisplayLabel || column.accountColumnName,
      width: column.accountColumnWidth * 20, // Assuming width is in percentage, converting to px might need adjustment
      sortable: true,
      renderCell: (params) => {
        const fieldName = column.columnName.toLowerCase();
        if (fieldName === 'thumbnailimageidurl') {
          return (
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              sx={{
                width: '100%',
                height: '100%'
              }}
            >
              <img
                src={params.value}
                alt={params.row.description || 'Product Image'}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '4px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Box>
          );
        }
        if (fieldName === 'quantitytoorder') {
          return (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='end'
              sx={{
                width: '100%',
                height: '100%'
              }}
              gap={1}
            >
              <Button
                variant='outlined'
                sx={{
                  backgroundColor: 'transparent',
                  color: '#4B449D',
                  fontSize: '24px',
                  padding: 0,
                  height: '40px',
                  width: '40px',
                  minWidth: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '0px',
                  '&:hover': {
                    backgroundColor: '#FF292920'
                  }
                }}
                onClick={(event) => handleDecrement(params.row.partnumber, event)}
              >
                -
              </Button>
              <TextField
                size='small'
                variant='outlined'
                value={quantities[params.row.partnumber] || 0}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleInputChange(params.row.partnumber, e.target.value, e)}
                inputProps={{
                  style: {
                    textAlign: 'center',
                    fontSize: '16px'
                  }
                }}
                sx={{
                  width: '60px',
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#4B449D'
                    },
                    '&:hover fieldset': {
                      borderColor: '#4B449D'
                    },
                    '&.Mui-focused fieldset': {
                      borderWidth: '2px',
                      borderColor: '#4B449D'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: '#4B449D'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#4B449D'
                  }
                }}
              />
              <Button
                variant='outlined'
                sx={{
                  backgroundColor: 'transparent',
                  color: '#4B449D',
                  fontSize: '24px',
                  padding: 0,
                  height: '40px',
                  width: '40px',
                  minWidth: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '0px',
                  '&:hover': {
                    backgroundColor: '#54C39220'
                  }
                }}
                onClick={(event) => handleIncrement(params.row.partnumber, event)}
              >
                +
              </Button>
            </Box>
          );
        }
        return <Box textAlign={column.cellAlignment.toLowerCase()}>{highlightText(params.value.toString(), searchTerm)}</Box>;
      }
    }));


  return (
    <>
      {returnAccountStoreProducts.length === 0 ? (
        <ProductTableSkeleton />
      ) : (
        <>
          <Box sx={{ padding: '20px 30px', backgroundColor: '#FFFFFF', margin: '10px 0px', borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
            <Typography variant='body1' sx={{ display: 'flex', alignItems: 'start', color: '#4B449D', fontWeight: 600, fontSize: '24px' }}>
              Products
            </Typography>
            <TextField
              label='Search by Part Number, Description, or Location'
              variant='outlined'
              size='small'
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                width: '100%',
                maxWidth: '40%',
                margin: '16px 0px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#4B449D'
                  },
                  '&:hover fieldset': {
                    borderColor: '#4B449D'
                  },
                  '&.Mui-focused fieldset': {
                    borderWidth: '2px',
                    borderColor: '#4B449D'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: '#4B449D'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#4B449D'
                }
              }}
            />

            <DataGrid
              rows={filteredProducts}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 20
                  }
                }
              }}
              onRowClick={handleRowClick}
              pageSizeOptions={[10, 20, 30, 40, 50, 75, 100]}
              disableSelectionOnClick
              rowHeight={60}
              columnHeaderHeight={60}
              disableColumnSelector
              disableRowSelectionOnClick
              sx={{
                overflow: 'hidden',
                maxHeight: '500px',
                border: '0px',
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#4B449D',
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  letterSpacing: '0.5px'
                },
              }}
            />
          </Box>

          {/* Product Detail Modal */}
          <Modal
            open={!!selectedProduct}
            onClose={handleCloseModal}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Paper
              sx={{
                width: '80%',
                maxWidth: '800px',
                maxHeight: '90%',
                overflow: 'auto',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                position: 'relative'
              }}
            >
              {selectedProduct && (
                <Box>
                  <IconButton
                    onClick={handleCloseModal}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      color: '#4B449D',
                      zIndex: 10
                    }}
                  >
                    <CloseIcon />
                  </IconButton>

                  {/* Product Details */}
                  <Grid container spacing={3} sx={{ p: 4 }}>
                    {/* Image Section */}
                    <Grid item xs={12} md={5}>
                      <Box
                        sx={{
                          width: '100%',
                          height: '400px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#F5F5F5',
                          borderRadius: '12px',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={selectedProduct.lampImage}
                          alt={selectedProduct.description}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </Box>
                    </Grid>

                    {/* Details Section */}
                    <Grid item xs={12} md={7}>
                      <Typography variant='h6' sx={{ color: '#4B449D', fontWeight: 'bold', mb: 2 }}>
                        {selectedProduct.originalProduct.descriptionShort}
                      </Typography>
                      <Typography variant='body1' sx={{ mb: 2, fontWeight: 'bold' }}>
                        Full Description:
                      </Typography>
                      <Typography variant='body2' sx={{ mb: 2 }}>
                        {selectedProduct?.originalProduct?.descriptionFull || 'No full description available'}
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: '#F9F9FF',
                          borderRadius: '12px',
                          p: 3,
                          border: '1px solid #4B449D20'
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#4B449D' }}>
                              Part Number
                            </Typography>
                            <Typography variant='body1'>{selectedProduct?.vendorpartnumber || ""}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#4B449D' }}>
                              Location
                            </Typography>
                            <Typography variant='body1'>{selectedProduct.locationinstoretext}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#4B449D' }}>
                              Case Quantity
                            </Typography>
                            <Typography variant='body1'>{selectedProduct.quantityincase}</Typography>
                            <Grid item xs={6}>
                              <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#4B449D' }}>
                                Case Price
                              </Typography>
                              <Typography variant='body1'>{selectedProduct?.originalProduct?.casePriceDisplay || 'N/A'}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Quantity Controls */}
                      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                          variant='outlined'
                          sx={{
                            backgroundColor: 'transparent',
                            color: '#4B449D',
                            fontSize: '24px',
                            padding: 0,
                            height: '40px',
                            width: '40px',
                            minWidth: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '0px',
                            '&:hover': {
                              backgroundColor: '#FF292920'
                            }
                          }}
                          onClick={(event) => handleDecrement(selectedProduct.partNumber, event)}
                        >
                          -
                        </Button>

                        <TextField
                          size='small'
                          variant='outlined'
                          value={quantities[selectedProduct.partNumber] || 0}
                          onChange={(e) => handleInputChange(selectedProduct.partNumber, e.target.value, e)}
                          inputProps={{
                            style: {
                              textAlign: 'center',
                              fontSize: '16px'
                            }
                          }}
                          sx={{
                            width: '60px',
                            '& .MuiOutlinedInput-root': {
                              height: '40px',
                              borderRadius: '8px'
                            }
                          }}
                        />

                        <Button
                          variant='outlined'
                          sx={{
                            backgroundColor: 'transparent',
                            color: '#4B449D',
                            fontSize: '24px',
                            padding: 0,
                            height: '40px',
                            width: '40px',
                            minWidth: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '0px',
                            '&:hover': {
                              backgroundColor: '#54C39220'
                            }
                          }}
                          onClick={(event) => handleIncrement(selectedProduct.partNumber, event)}
                        >
                          +
                        </Button>

                        <Button
                          variant='contained'
                          sx={{
                            backgroundColor: '#4B449D',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            ml: 2,
                            '&:hover': {
                              backgroundColor: '#4B449D'
                            }
                          }}
                          onClick={() => handleAddToCart(selectedProduct)}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Modal>
        </>
      )}
    </>

  );
};

export default ProductTable;