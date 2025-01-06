import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccounts, getStores, getAccountMaintenance, getAccountLocations, getAccountLocationProducts } from './accountsApi';

// Existing actions remain unchanged
export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async (userId, thunkAPI) => {
  try {
    const response = await getAccounts(userId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch accounts');
  }
});

export const fetchStores = createAsyncThunk('accounts/fetchStores', async ({ userId, accountId }, thunkAPI) => {
  try {
    const response = await getStores(userId, accountId);
    return { accountId, stores: response };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch stores');
  }
});

export const fetchAccountMaintenance = createAsyncThunk('accounts/fetchAccountMaintenance', async (accountId, thunkAPI) => {
  try {
    const response = await getAccountMaintenance(accountId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch account maintenance data');
  }
});

// New action for fetching account locations
export const fetchAccountLocations = createAsyncThunk('accounts/fetchAccountLocations', async ({ accountId, userId, langId=1 }, thunkAPI) => {
  try {
    const response = await getAccountLocations(accountId, userId, langId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch account locations');
  }
});

// New action for fetching account location products
export const fetchAccountLocationProducts = createAsyncThunk('accounts/fetchAccountLocationProducts', async ({ accountId, locationId, langId=1, userId }, thunkAPI) => {
  try {
    const response = await getAccountLocationProducts(accountId, locationId, langId, userId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch account location products');
  }
});
