import { createSlice } from '@reduxjs/toolkit';
import { fetchAccounts, fetchStores } from './accountActions';

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    stores: [], // Changed from object to array to hold store list
    selectedAccount: null,
    selectedStore: null,
    accountLoading: false,
    storeLoading: false,
    error: null
  },
  reducers: {
    selectAccount(state, action) {
      state.selectedAccount = action.payload;
      state.selectedStore = null; // Reset store when a new account is selected
      state.stores = []; // Clear stores when a new account is selected
    },
    selectStore(state, action) {
      state.selectedStore = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.accountLoading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.accountLoading = false;
        state.accounts = action.payload;
        state.selectedAccount = action.payload.length > 0 ? action.payload[0] : null;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.accountLoading = false;
        state.error = action.payload || 'Failed to fetch accounts.';
      })
      .addCase(fetchStores.pending, (state) => {
        state.storeLoading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.storeLoading = false;
        state.stores = action.payload.stores; // Fetch stores based on the account
        state.selectedStore = action.payload.stores.length > 0 ? action.payload.stores[0] : null;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.storeLoading = false;
        state.error = action.payload || 'Failed to fetch stores.';
      });
  }
});

export const { selectAccount, selectStore } = accountSlice.actions;

export default accountSlice.reducer;
