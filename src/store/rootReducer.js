import { combineReducers } from '@reduxjs/toolkit';
import accountsReducer from './features/accounts/accountSlice';
import productsReducer from './features/products/productSlice';

const rootReducer = combineReducers({
 accounts: accountsReducer,
 products: productsReducer,
});

export default rootReducer;
