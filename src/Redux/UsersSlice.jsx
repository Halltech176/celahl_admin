import { createSlice } from "@reduxjs/toolkit";
import { Users } from "./actions";

const initialState = {
  loading: false,
  user: null,
  error: "",
};
const AllUsers = createSlice({
  name: "users",
  initialState,
  //   reducers: {},
  extraReducers: {
    [Users.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [Users.pending]: (state) => {
      state.loading = true;
    },
    [Users.rejected]: (state) => {
      state.loading = false;
      state.error = "unable to fetch data";
    },
  },
});

export const UserReducer = AllUsers.reducer;
