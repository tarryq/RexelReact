import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccounts, getStores, getAccountMaintenance, getStoreMaintenance } from './accountsApi';

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

export const fetchStoreMaintenance = createAsyncThunk(
  'stores/fetchStoreMaintenance',
  async (accountId, thunkAPI) => {
    try {
      const response = await getStoreMaintenance(accountId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to fetch store maintenance data'
      );
    }
  }
);

