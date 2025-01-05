import { createSlice } from '@reduxjs/toolkit'
import { fetchProductColumns, fetchProducts } from './productActions'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    productColumns: [],
    products: [],
    productLoading: false,
    productError: null,
  },
  reducers: {
    updateQuantity(state, action) {
      const { partNumber, quantity } = action.payload
      state.quantities[partNumber] = quantity
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null
    },
    clearProducts(state) {
      state.products = [];
      state.productColumns = [];
      state.productError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductColumns.pending, (state) => {
        state.productLoading = true
      })
      .addCase(fetchProductColumns.fulfilled, (state, action) => {
        state.productLoading = false
        state.productColumns = action.payload
      })
      .addCase(fetchProducts.pending, (state) => {
        state.productLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = action.payload;
        state.quantities = action.payload.reduce((acc, product) => {
          acc[product.partNumber] = product.quantitytoorder || 0;
          return acc;
        }, {});
      })
  },
})

export const { updateQuantity, setSelectedProduct, clearSelectedProduct, clearProducts } = productSlice.actions

export default productSlice.reducer
