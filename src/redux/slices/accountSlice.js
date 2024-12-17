// src/redux/slices/accountSlice.js
import { createAsyncSlice } from '../createAsyncSlice';
import * as accountService from '../services/accountService';

export const accountSlice = createAsyncSlice({
 name: 'accounts',
 service: accountService.fetchAccounts,
 initialState: {
  selectedAccount: null,
  availableAccounts: []
 }
});

export const {
 fetch: fetchAccounts,
 clearState: clearAccountState
} = accountSlice.actions;
export default accountSlice.reducer;
