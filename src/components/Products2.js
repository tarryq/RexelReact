import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, Modal, Grid, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { debounce, highlightText } from '../utils';
import { ProductTableSkeleton } from '../skeletons/skeleton';
// import { fetchProductColumns, fetchProducts } from '../store/actions';
import { fetchProductColumns, fetchProducts } from '../store/features/products/productActions';

const ProductTable = (props) => {
  // const { user, selectedStore, selectedAccount } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  }, []);

  const { accounts, stores, selectedAccount, selectedStore, accountLoading, storeLoading } = useSelector((state) => state.accounts);

  const { productColumns, products, productLoading, productError } = useSelector((state) => state.products);

  const userid = user?.userId;
  const accountid = selectedAccount?.id;
  const storeid = selectedStore?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userid && accountid && storeid) {
      dispatch(fetchProductColumns({ userid, accountid }));
      dispatch(fetchProducts({ userid, accountid, storeid }));
    }
  }, [userid, accountid, storeid, dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const initialProducts = useMemo(() => {
    if (Array.isArray(products)) {
      return products.map((product, index) => {
        const dynamicProduct = {
          id: index,
          originalProduct: product
        };
        const productWithLowerKeys = keysToLowerCase(product);
        productColumns.forEach((column) => {
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
  }, [products, productColumns]);

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
      setQuantities(
        initialProducts.reduce((acc, product) => {
          acc[product.partnumber] = product.quantitytoorder || 0;
          return acc;
        }, {})
      );
    }
  }, [initialProducts]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        const filtered = initialProducts.filter((product) =>
          productColumns.some((column) => {
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

  const columns = productColumns
    .filter((column) => column.columnName !== 'N/A' && column.accountColumnName !== '')
    .map((column) => ({
      field: column.columnName.toLowerCase(),
      headerName: column.gridDisplayLabel || column.accountColumnName,
      width: column.accountColumnWidth * 20,
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
        return <Box textAlign={column.cellAlignment.toLowerCase()}>{highlightText(params?.value?.toString(), searchTerm)}</Box>;
      }
    }));

  if (accountLoading || storeLoading || productLoading) return <ProductTableSkeleton />;

  if (productError) return <div>Error loading products: {productError}</div>;

  function keysToLowerCase(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key.toLowerCase()] = obj[key];
      return acc;
    }, {});
  }

  return (
    <>
      <Box
        sx={{
          padding: '20px 30px',
          backgroundColor: '#FFFFFF',
          margin: '10px 0px',
          borderRadius: '12px',
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'
        }}
      >
        <Typography
          variant='body1'
          sx={{
            display: 'flex',
            alignItems: 'start',
            color: '#4B449D',
            fontWeight: 600,
            fontSize: '24px'
          }}
        >
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
                        <Typography variant='body1'>{selectedProduct?.vendorpartnumber || ''}</Typography>
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
                  <Box
                    sx={{
                      mt: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
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
