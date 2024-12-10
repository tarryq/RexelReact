import React, { useState, useMemo } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import products from './products_with_diverse_images.json';
import { debounce, highlightText } from '../util/utils'; // Import your custom debounce utility

const useStyles = makeStyles({
  searchField: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '400px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#4B449D', // Default border color
      },
      '&:hover fieldset': {
        borderColor: '#4B449D', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4B449D !important', // Border color when focused
      },
    },
    '& .MuiInputLabel-root': {
      color: '#4B449D', // Default label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#4B449D !important', // Label color when focused
    },
  },

  tableHeader: {
    backgroundColor: '#4B449D',
    color: '#ffffff !important' ,
    fontWeight: 'bold',
    textAlign: 'left !important',
  },
  addToCartButton: {
    backgroundColor: '#4B449D !important',
    color: 'white',
    '&:hover': {
      backgroundColor: '#6A0DAD',
    },
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '0.9rem',
  },
  lampImage: {
    width: 50,
    height: 50,
    borderRadius: '4px',
  },
  tableContainer: {
    marginTop: '20px',
    border: '1px solid #4B0082',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  counterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  counterButton: {
    minWidth: '34px',
    minHeight: '32px',
    borderRadius: '50%',
    fontSize: '18px !important',
    fontWeight: '600',
    color: '#4B449D',
  },
  textField: {
    width: '80px',
    textAlign: 'center',
  },
  searchField: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '400px',
  },
});

const ProductTable = () => {
  const classes = useStyles();
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.partNumber] = 0;
      return acc;
    }, {})

  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Debounced search logic
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        const filtered = products.filter(
          (product) =>
            product.partNumber.toLowerCase().includes(value.toLowerCase()) ||
            product.description.toLowerCase().includes(value.toLowerCase()) ||
            product.caseQuantity.toString().toLocaleLowerCase().includes(value.toString().toLocaleLowerCase()) ||
            product.location.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
      }, 300), // Delay of 300ms
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update the immediate search term
    debouncedSearch(value); // Trigger the debounced search
  };

  const handleIncrement = (partNumber) => {
    setQuantities((prev) => ({
      ...prev,
      [partNumber]: prev[partNumber] + 1,
    }));
  };

  const handleDecrement = (partNumber) => {
    setQuantities((prev) => ({
      ...prev,
      [partNumber]: Math.max(prev[partNumber] - 1, 0),
    }));
  };

  const handleInputChange = (partNumber, value) => {
    if (value === '') {
      setQuantities((prev) => ({
        ...prev,
        [partNumber]: 0,
      }));
    } else {
      const numberValue = parseInt(value, 10);
      if (!isNaN(numberValue) && numberValue >= 0) {
        setQuantities((prev) => ({
          ...prev,
          [partNumber]: numberValue,
        }));
      }
    }
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product, 'Quantity:', quantities[product.partNumber]);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // Aligns child elements to the right
          marginBottom: '20px',
        }}
      >
        <TextField
          label="Search by Part Number, Description, or Location"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: '100%',
            maxWidth: '400px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#4B449D',
              },
              '&:hover fieldset': {
                borderColor: '#4B449D',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4B449D',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#4B449D',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#4B449D',
            },
          }}
        />
      </Box>


      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Part Number</TableCell>
              <TableCell className={classes.tableHeader}>Description</TableCell>
              <TableCell className={classes.tableHeader}>Lamp Image</TableCell>
              <TableCell className={classes.tableHeader}>Location</TableCell>
              <TableCell className={classes.tableHeader}>Case Quantity</TableCell>
              <TableCell className={classes.tableHeader}>Number of Cases Needed</TableCell>
              <TableCell className={classes.tableHeader}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.partNumber}>
                <TableCell> {highlightText(product?.partNumber?.toString(), searchTerm)}</TableCell>
                <TableCell>{highlightText(product?.description?.toString(), searchTerm)}</TableCell>
                <TableCell>
                  <img
                    src={product.lampImage}
                    alt={product.description}
                    className={classes.lampImage}
                  />
                </TableCell>
                <TableCell> {highlightText(product?.location?.toString(), searchTerm)}</TableCell>
                <TableCell>{highlightText(product?.caseQuantity?.toString(), searchTerm)}</TableCell>
                <TableCell>
                  <div className={classes.counterContainer}>
                    <Button
                      className={classes.counterButton}
                      onClick={() => handleDecrement(product.partNumber)}
                      sx={{
                        minWidth: '34px',
                        minHeight: '32px',
                        borderRadius: '50%',
                        fontSize: '20px !important',
                        fontWeight: '600',
                        color: '#4B449D !important'}}
                    >
                      -
                    </Button>
                    <TextField
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      value={quantities[product.partNumber]}
                      onChange={(e) => handleInputChange(product.partNumber, e.target.value)}
                      inputProps={{
                        min: 0,
                        style: { textAlign: 'center' },
                      }}
                    />
                    <Button
                      className={classes.counterButton}
                      onClick={() => handleIncrement(product.partNumber)}
                      sx={{
                        minWidth: '34px',
                        minHeight: '32px',
                        borderRadius: '50%',
                        fontSize: '20px !important',
                        fontWeight: '600',
                        color: '#4B449D !important'
                      }}
                    >
                      +
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    className={classes.addToCartButton}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductTable;
