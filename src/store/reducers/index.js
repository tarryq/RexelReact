import { createSlice } from '@reduxjs/toolkit';
import { fetchAccounts, fetchStores } from '../actions';

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    selectedAccount: null,
    stores: [],
    selectedStore: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectAccount(state, action) {
      state.selectedAccount = action.payload;
      state.stores = []; // Reset stores when a new account is selected
      state.selectedStore = null;
    },
    selectStore(state, action) {
      state.selectedStore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Accounts
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
      // Fetch Stores
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
        state.selectedStore = action.payload.length > 0 ? action.payload[0] : null;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch stores.';
      });
  },
});

export const { selectAccount, selectStore } = accountSlice.actions;
export default accountSlice.reducer;
