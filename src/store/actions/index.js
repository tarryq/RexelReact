import { createAsyncThunk } from '@reduxjs/toolkit';
import accountService from '../services';

// Fetch all accounts for the user
export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async (userId, thunkAPI) => {
  try {
    const response = await accountService.getAccounts(userId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch accounts');
  }
});

// Fetch stores for a selected account
export const fetchStores = createAsyncThunk('accounts/fetchStores', async ({ userId, accountId }, thunkAPI) => {
  try {
    const response = await accountService.getStores(userId, accountId);
    return { accountId, stores: response };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch stores');
  }
});
