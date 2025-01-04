import { createSlice } from '@reduxjs/toolkit';
import { fetchAccounts, fetchStores, fetchProductColumns, fetchProducts } from '../actions';

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    stores: {},
    selectedAccount: null,
    selectedStore: null,
    accountLoading: false,
    storeLoading: false,
    error: null,

    //products        
    productColumns: [],
    products: [],
    productLoading: false,
    productError: null,
    quantities: {},
    selectedProduct: null

  },
  reducers: {
    selectAccount(state, action) {
      state.selectedAccount = action.payload;
      state.selectedStore = null; // Reset store when a new account is selected
    },
    selectStore(state, action) {
      state.selectedStore = action.payload;
    },
    updateQuantity(state, action) {
      const { partNumber, quantity } = action.payload;
      state.quantities[partNumber] = quantity;
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
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
        state.stores[action.payload.accountId] = action.payload.stores;
        state.selectedStore = action.payload.stores.length > 0 ? action.payload.stores[0] : null;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.storeLoading = false;
        state.error = action.payload || 'Failed to fetch stores.';
      })

      // Product cases
      .addCase(fetchProductColumns.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(fetchProductColumns.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productColumns = action.payload;
      })
      .addCase(fetchProductColumns.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = action.payload;
        state.quantities = action.payload.reduce((acc, product) => {
          acc[product.partNumber] = product.quantitytoorder || 0;
          return acc;
        }, {});
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.payload;
      });
  }
});

export const {
  selectAccount,
  selectStore,
  updateQuantity,
  setSelectedProduct,
  clearSelectedProduct,
} = accountSlice.actions
export default accountSlice.reducer
