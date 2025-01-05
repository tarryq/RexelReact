import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductColumns, getProducts } from './productsApi';

export const fetchProductColumns = createAsyncThunk(
  'products/fetchProductColumns',
  async ({ userid, accountid }) => {
    const response = await getProductColumns(userid, accountid);
    return response;
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ userid, accountid, storeid }) => {
    const response = await getProducts(userid, accountid, storeid);
    return response;
  }
);