import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import products from './products_with_diverse_images.json';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#4B449D',
    color: '#FFFFFF'
  },
  addToCartButton: {
    backgroundColor: '#4B449D',
    color: 'white',
    '&:hover': {
      backgroundColor: '#6A0DAD'
    }
  },
  lampImage: {
    width: 50,
    height: 50
  },
  tableContainer: {
    color: '#FFFFFF',
    marginTop: '20px',
    border: '1px solid #4B0082'
  }
});

const ProductTable = ({ products }) => {
  const classes = useStyles();

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  return (
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
          {products.map((product) => (
            <TableRow key={product.partNumber}>
              <TableCell>{product.partNumber}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <img src={product.lampImage} alt={product.description} className={classes.lampImage} />
              </TableCell>
              <TableCell>{product.location}</TableCell>
              <TableCell>{product.caseQuantity}</TableCell>
              <TableCell>
                <TextField type='number' size='small' variant='outlined' defaultValue={product.numberOfCasesNeeded} inputProps={{ min: 0 }} />
              </TableCell>
              <TableCell>
                <Button variant='contained' className={classes.addToCartButton} onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const App = () => {
  return <ProductTable products={products} />;
};

export default App;
