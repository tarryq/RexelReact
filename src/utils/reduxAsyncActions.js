// utils/reduxAsyncActions.js

import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Create a standardized async action creator
 * @param {string} actionType - Unique action type identifier
 * @param {Function} serviceMethod - Service method to call
 * @returns {Function} Async thunk action creator
 */
export const createAsyncAction = (actionType, serviceMethod) => {
 return createAsyncThunk(
  actionType,
  async (payload, thunkAPI) => {
   try {
    const response = await serviceMethod(payload);
    return response;
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
   }
  }
 );
};

/**
 * Create a reducer handling async action states
 * @param {string} actionType - Base action type
 * @param {Object} initialState - Initial state configuration
 * @returns {Object} Reducer handling async action states
 */
export const createAsyncReducer = (actionType, initialState = {}) => {
 return {
  [createAsyncAction(actionType).pending]: (state) => {
   return {
    ...state,
    status: 'loading',
    error: null
   };
  },
  [createAsyncAction(actionType).fulfilled]: (state, action) => {
   return {
    ...state,
    status: 'succeeded',
    data: action.payload,
    error: null
   };
  },
  [createAsyncAction(actionType).rejected]: (state, action) => {
   return {
    ...state,
    status: 'failed',
    error: action.payload || action.error.message
   };
  }
 };
};

// Example usage in a slice
export const createGenericSlice = (config) => {
 const { name, initialState, reducers = {}, extraReducers = {} } = config;

 return createSlice({
  name,
  initialState: {
   data: null,
   status: 'idle',
   error: null,
   ...initialState
  },
  reducers: {
   clearError: (state) => {
    state.error = null;
   },
   ...reducers
  },
  extraReducers: {
   ...extraReducers
  }
 });
};