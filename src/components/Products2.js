import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Modal,
  Grid,
  Paper,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { debounce, highlightText } from '../util';
import products from './products_with_diverse_images.json';

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
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
            (product) => product.partNumber.toLowerCase().includes(value.toLowerCase()) ||
              product.description.toLowerCase().includes(value.toLowerCase()) ||
              product.location.toLowerCase().includes(value.toLowerCase()) ||
              product.caseQuantity.toString().includes(value)
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
    event.stopPropagation()
    const numberValue = value === '' ? 0 : parseInt(value, 10);
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

  const handleRowClick = (params) => {
    setSelectedProduct(params.row);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
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
            onClick={(event) => handleDecrement(params.row.partNumber, event)}
          >
            -
          </Button>

          <TextField
            size='small'
            variant='outlined'
            value={quantities[params.row.partNumber] || 0}
            onClick = {(e)=> e.stopPropagation()}
            onChange={(e) => handleInputChange(params.row.partNumber, e.target.value, e)}
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
            onClick={(event) => handleIncrement(params.row.partNumber, event)}
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
              backgroundColor: '#4B449D', // Primary color
              color: 'white',
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              letterSpacing: '0.5px'
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
              backgroundColor: '#3D3689', // Slightly darker shade for hover
              outline: 'none !important',
              border: 'none !important'
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 600,
              whiteSpace: 'normal',
              textAlign: 'left'
            },
            '& .MuiDataGrid-columnSeparator': {
              color: 'rgba(255,255,255,0.2)'
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
              marginLeft: 'auto',
              color: 'white !important',
              '& svg': {
                color: 'white !important'
              }
            },
            '& .MuiDataGrid-iconButtonContainer': {
              visibility: 'visible',
              opacity: 1
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
            }, 
            '& .MuiDataGrid-iconButtonContainer': {
              '& .MuiDataGrid-sortIcon': {
                color: 'white !important'
              }
            }
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
              {/* Close Button */}
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
                  <Typography variant="h4" sx={{ color: '#4B449D', fontWeight: 'bold', mb: 2 }}>
                    {selectedProduct.description}
                  </Typography>
                  <Box sx={{
                    backgroundColor: '#F9F9FF',
                    borderRadius: '12px',
                    p: 3,
                    border: '1px solid #4B449D20'
                  }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#4B449D' }}>
                          Part Number
                        </Typography>
                        <Typography variant="body1">
                          {selectedProduct.partNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#4B449D' }}>
                          Location
                        </Typography>
                        <Typography variant="body1">
                          {selectedProduct.location}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#4B449D' }}>
                          Case Quantity
                        </Typography>
                        <Typography variant="body1">
                          {selectedProduct.caseQuantity}
                        </Typography>
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
  );
};

export default ProductTable;