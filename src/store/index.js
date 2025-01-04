import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './reducers'; // Ensure the correct path to the reducer

const store = configureStore({
  reducer: {
    accounts: accountReducer, // Add your reducers here
  },
});

export default store;
