import { createSlice } from "@reduxjs/toolkit";
import { BankAccounts } from "../actions";

const initialState = {
  loading: false,
  bankaccounts: null,
  error: false,
};
const BankNames = createSlice({
  name: "bankname",
  initialState,
  reducers: {},
  extraReducers: {
    [BankAccounts.fulfilled]: (state, action) => {
      state.loading = false;
      state.bankaccounts = action.payload;
      state.error = false;
    },
    [BankAccounts.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [BankAccounts.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const BanksReducer = BankNames.reducer;
