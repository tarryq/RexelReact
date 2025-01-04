import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import accountService from '../services';

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async (userId) => {
  const response = await accountService.getAccounts(userId);
  return response;
});

export const fetchStores = createAsyncThunk('accounts/fetchStores', async ({ userId, accountId }) => {
  const response = await accountService.getStores(userId, accountId);
  return { accountId, stores: response };
});

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    stores: {},
    selectedAccount: null,
    selectedStore: null,
    loading: false,
    error: null
  },
  reducers: {
    selectAccount(state, action) {
      state.selectedAccount = action.payload;
      state.selectedStore = null; // Reset store when a new account is selected
    },
    selectStore(state, action) {
      state.selectedStore = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
        state.selectedAccount = action.payload.length > 0 ? action.payload[0] : null;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch accounts.';
      })
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores[action.payload.accountId] = action.payload.stores;
        state.selectedStore = action.payload.stores.length > 0 ? action.payload.stores[0] : null;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch stores.';
      });
  }
});

export const { selectAccount, selectStore } = accountSlice.actions;
export default accountSlice.reducer;
