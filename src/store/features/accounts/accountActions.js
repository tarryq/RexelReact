import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccounts, getStores } from './accountsApi';

export const fetchAccounts = createAsyncThunk(
 'accounts/fetchAccounts',
 async (userId, thunkAPI) => {
  try {
   const response = await getAccounts(userId);
   return response;
  } catch (error) {
   return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch accounts');
  }
 }
);

export const fetchStores = createAsyncThunk(
 'accounts/fetchStores',
 async ({ userId, accountId }, thunkAPI) => {
  try {
   const response = await getStores(userId, accountId);
   return { accountId, stores: response };
  } catch (error) {
   return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch stores');
  }
 }
);
