import { createSlice } from "@reduxjs/toolkit";
import { Users } from "../actions";

const initialState = {
  loading: false,
  users: null,
  error: true,
};
const AllUsers = createSlice({
  name: "users",
  initialState,
  //   reducers: {},
  extraReducers: {
    [Users.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [Users.pending]: (state) => {
      state.loading = true;
    },
    [Users.rejected]: (state) => {
      state.loading = false;
      state.error = false;
    },
  },
});

export const UsersReducer = AllUsers.reducer;
