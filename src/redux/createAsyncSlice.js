import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Create a standardized async action creator
 * @param {Object} config Configuration for async slice
 * @param {string} config.name Slice name
 * @param {Function} config.service Service method to call
 * @param {Object} [config.initialState={}] Initial state
 * @param {Function} [config.transformResponse] Optional response transformer
 * @returns {Object} Slice with async actions and reducers
 */
export const createAsyncSlice = (config) => {
 const {
  name,
  service,
  initialState = {},
  transformResponse = (response) => response
 } = config;

 // Create async thunk
 const asyncAction = createAsyncThunk(
  `${name}/fetch`,
  async (payload, thunkAPI) => {
   try {
    const response = await service(payload);
    return transformResponse(response);
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
   }
  }
 );

 // Create slice
 const slice = createSlice({
  name,
  initialState: {
   data: null,
   status: 'idle',
   error: null,
   ...initialState
  },
  reducers: {
   clearState: (state) => {
    state.data = null;
    state.status = 'idle';
    state.error = null;
   }
  },
  extraReducers: (builder) => {
   builder
    .addCase(asyncAction.pending, (state) => {
     state.status = 'loading';
     state.error = null;
    })
    .addCase(asyncAction.fulfilled, (state, action) => {
     state.status = 'succeeded';
     state.data = action.payload;
     state.error = null;
    })
    .addCase(asyncAction.rejected, (state, action) => {
     state.status = 'failed';
     state.error = action.payload || action.error.message;
     state.data = null;
    });
  }
 });

 return {
  actions: {
   ...slice.actions,
   fetch: asyncAction
  },
  reducer: slice.reducer
 };
};
