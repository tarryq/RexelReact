import { createSlice } from '@reduxjs/toolkit';
import { fetchAccounts, fetchStores, fetchAccountMaintenance, fetchAccountLocations, fetchAccountLocationProducts, fetchStoreMaintenance } from './accountActions';

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    stores: [],
    locations: [], // New state for locations
    locationProducts: [], // New state for location products
    selectedAccount: null,
    selectedStore: null,
    selectedLocation: null, // New state for selected location
    accountMaintenance: null, // Existing state for account maintenance
    accountLoading: false,
    storeLoading: false,
    locationLoading: false, // Loading state for locations
    locationProductsLoading: false, // Loading state for location products
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
      state.selectedLocation = null; // Reset location on account change
      state.stores = [];
      state.locations = [];
      state.locationProducts = [];
      state.accountMaintenance = null; // Reset maintenance data on account change
    },
    selectStore(state, action) {
      state.selectedStore = action.payload;
      state.selectedLocation = null; // Reset location on store change
      state.locations = [];
      state.locationProducts = [];
    },
    selectLocation(state, action) {
      state.selectedLocation = action.payload;
      state.locationProducts = [];
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
      .addCase(fetchAccountLocations.pending, (state) => {
        state.locationLoading = true;
        state.error = null;
      })
      .addCase(fetchAccountLocations.fulfilled, (state, action) => {
        state.locationLoading = false;
        state.locations = action.payload;
        state.selectedLocation = action.payload.length > 0 ? action.payload[0] : null;
      })
      .addCase(fetchAccountLocations.rejected, (state, action) => {
        state.locationLoading = false;
        state.error = action.payload || 'Failed to fetch account locations.';
      })
      .addCase(fetchAccountLocationProducts.pending, (state) => {
        state.locationProductsLoading = true;
        state.error = null;
      })
      .addCase(fetchAccountLocationProducts.fulfilled, (state, action) => {
        state.locationProductsLoading = false;
        state.locationProducts = action.payload;
      })
      .addCase(fetchAccountLocationProducts.rejected, (state, action) => {
        state.locationProductsLoading = false;
        state.error = action.payload || 'Failed to fetch account location products.';
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

export const { selectAccount, selectStore, selectLocation } = accountSlice.actions;

export default accountSlice.reducer;
