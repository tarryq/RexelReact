import React, { useState, useMemo } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { debounce, highlightText } from '../util';
import products from './products_with_diverse_images.json';

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products.map((product, index) => ({ ...product, id: index })));

  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.partNumber] = 0;
      return acc;
    }, {})
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        const filtered = products
          .map((product, index) => ({ ...product, id: index }))
          .filter(
            (product) => product.partNumber.toLowerCase().includes(value.toLowerCase()) || product.description.toLowerCase().includes(value.toLowerCase()) || product.location.toLowerCase().includes(value.toLowerCase()) || product.caseQuantity.toString().includes(value) // Include caseQuantity in the search
          );
        setFilteredProducts(filtered);
      }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleIncrement = (partNumber) => {
    setQuantities((prev) => ({
      ...prev,
      [partNumber]: prev[partNumber] + 1
    }));
  };

  const handleDecrement = (partNumber) => {
    setQuantities((prev) => ({
      ...prev,
      [partNumber]: Math.max(prev[partNumber] - 1, 0)
    }));
  };

  const handleInputChange = (partNumber, value) => {
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue) && numberValue >= 0) {
      setQuantities((prev) => ({
        ...prev,
        [partNumber]: numberValue
      }));
    }
  };

  const handleAddToCart = (product) => {
    // console.log('Added to cart:', product, 'Quantity:', quantities[product.partNumber]);
  };

  const columns = [
    {
      field: 'partNumber',
      headerName: 'Part Number',
      width: 170,
      renderCell: (params) => <Box>{highlightText(params.value.toString(), searchTerm)}</Box>
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      renderCell: (params) => <Box>{highlightText(params.value, searchTerm)}</Box>
    },
    {
      field: 'lampImage',
      headerName: 'Lamp Image',
      width: 180,
      renderCell: (params) => (
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
            alt={params.row.description}
            style={{
              width: 50,
              height: 50,
              borderRadius: '4px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
        </Box>
      )
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 200,
      renderCell: (params) => <Box>{highlightText(params.value, searchTerm)}</Box>
    },
    {
      field: 'caseQuantity',
      headerName: 'Case Quantity',
      width: 180,
      renderCell: (params) => <Box>{highlightText(params.value.toString(), searchTerm)}</Box>
    },
    {
      field: 'numberOfCasesNeeded',
      headerName: 'Number Of Cases Needed',
      minWidth: 220,
      flex: 1,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
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
              color: '#FF2929',
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
            onClick={() => handleDecrement(params.row.partNumber)}
          >
            -
          </Button>

          <TextField
            size='small'
            variant='outlined'
            value={quantities[params.row.partNumber] || 0}
            onChange={(e) => handleInputChange(params.row.partNumber, e.target.value)}
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
              },
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

          <Button
            variant='outlined'
            sx={{
              backgroundColor: 'transparent',
              color: '#54C392',
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
            onClick={() => handleIncrement(params.row.partNumber)}
          >
            +
          </Button>
        </Box>
      )
    },
    {
      field: 'addToCart',
      headerName: '',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          variant='contained'
          size='small'
          sx={{
            backgroundColor: '#4B449D',
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#4B449D'
            }
          }}
          onClick={() => handleAddToCart(params.row)}
        >
          Add to Cart
        </Button>
      )
    }
  ];

  return (
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
            borderRight: '1px solid #CCCCCC70'
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important',
            border: 'none !important'
          },
          '& .MuiDataGrid-columnHeader.Mui-selected': {
            outline: 'none !important',
            border: 'none !important'
          },
          '& .MuiDataGrid-columnHeader:hover': {
            outline: 'none !important',
            border: 'none !important',
            color: '#4B449D !important'
          },
          '& .MuiDataGrid-row.selected': {
            backgroundColor: 'transparent !important'
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none'
          },
          '& .MuiDataGrid-menuIcon': {
            visibility: 'visible !important',
            width: 'auto',
            marginLeft: 'auto'
          },
          '& .MuiDataGrid-iconButtonContainer': {
            visibility: 'visible',
            opacity: 1
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            whiteSpace: 'normal',
            textAlign: 'left'
          },
          '& .MuiDataGrid-cell': {
            textAlign: 'left',
            borderRight: '1px solid #CCCCCC70',
            outline: 'none !important'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#4B449D12',
            color: '#4B449D !important',
            fontWeight: '500 !important'
          }
        }}
      />
    </Box>
  );
};

export default ProductTable;
