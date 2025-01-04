import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './reducers';

const store = configureStore({
  reducer: {
    accounts: accountReducer,
  },
});

export default store;
