import { combineReducers } from '@reduxjs/toolkit';
import accountsReducer from './features/accounts/accountSlice';
import productsReducer from './features/products/productSlice';
import cartReducer from './features/cart/cartSlice';

const rootReducer = combineReducers({
 accounts: accountsReducer,
 products: productsReducer,
 cart: cartReducer,
});

export default rootReducer;
