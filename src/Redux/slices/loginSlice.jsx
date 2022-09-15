import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions";

const initialState = {
  loading: false,
  user: null,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state) => {
      state.loading = false;
      state.error = "unable to fetch data";
    },
  },
});
export const loginReducer = loginSlice.reducer;
