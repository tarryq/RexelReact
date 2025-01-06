import { createSlice } from '@reduxjs/toolkit';
import { fetchAccounts, fetchStores, fetchAccountMaintenance, fetchStoreMaintenance } from './accountActions';

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    stores: [],
    selectedAccount: null,
    selectedStore: null,
    accountMaintenance: null, // New state for account maintenance data
    accountLoading: false,
    storeLoading: false,
    maintenanceLoading: false, // Loading state for account maintenance
    storeMaintenance: null,
    storeLoading: false,
    storeError: null,
    error: null
  },
  reducers: {
    selectAccount(state, action) {
      state.selectedAccount = action.payload;
      state.selectedStore = null;
      state.stores = [];
      state.accountMaintenance = null; // Reset maintenance data on account change
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
        state.stores = action.payload.stores;
        state.selectedStore = action.payload.stores.length > 0 ? action.payload.stores[0] : null;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.storeLoading = false;
        state.error = action.payload || 'Failed to fetch stores.';
      })
      .addCase(fetchAccountMaintenance.pending, (state) => {
        state.maintenanceLoading = true;
        state.error = null;
      })
      .addCase(fetchAccountMaintenance.fulfilled, (state, action) => {
        state.maintenanceLoading = false;
        state.accountMaintenance = action.payload;
      })
      .addCase(fetchAccountMaintenance.rejected, (state, action) => {
        state.maintenanceLoading = false;
        state.error = action.payload || 'Failed to fetch account maintenance data.';
      })
      .addCase(fetchStoreMaintenance.pending, (state) => {
        state.storeLoading = true;
        state.storeError = null;
      })
      .addCase(fetchStoreMaintenance.fulfilled, (state, action) => {
        state.storeLoading = false;
        state.storeMaintenance = action.payload;
      })
      .addCase(fetchStoreMaintenance.rejected, (state, action) => {
        state.storeLoading = false;
        state.storeError = action.payload || 'Failed to fetch store maintenance data';
      });
  }
});

export const { selectAccount, selectStore } = accountSlice.actions;

export default accountSlice.reducer;
