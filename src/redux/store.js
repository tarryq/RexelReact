// src/redux/store.js
import { createReduxStore } from './createAsyncSlice';
import accountReducer from './slices/accountSlice';
// import storeReducer from './slices/storeSlice'; // just for example
// import locationReducer from './slices/locationSlice';
// import productReducer from './slices/productSlice';

const store = createReduxStore({
 accounts: accountReducer,
 // stores: storeReducer,
 // locations: locationReducer,
 // products: productReducer
});

export default store;