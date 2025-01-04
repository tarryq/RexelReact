import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductColumns, getProducts } from './productsApi';

// export const fetchProductColumns = createAsyncThunk(
//  'products/fetchProductColumns',
//  async ({ userId, accountId }, thunkAPI) => {

//   try {
//    const response = await getProductColumns(userId, accountId);
//    return response;
//   } catch (error) {
//    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch product columns');
//   }
//  }
// );

// export const fetchProducts = createAsyncThunk(
//  'products/fetchProducts',
//  async ({ userId, accountId, storeId }, thunkAPI) => {
//   try {
//    const response = await getProducts(userId, accountId, storeId);
//    return response;
//   } catch (error) {
//    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch products');
//   }
//  }
// );

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