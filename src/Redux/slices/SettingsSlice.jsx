import { createSlice } from "@reduxjs/toolkit";
import { GetSettings } from "../actions";

const initialState = {
  loading: false,
  settings: null,
};
const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: {
    [GetSettings.fulfilled]: (state, action) => {
      state.loading = false;
      state.settings = action.payload;
    },
    [GetSettings.pending]: (state) => {
      state.loading = true;
    },
    [GetSettings.rejected]: (state) => {
      state.loading = false;
      state.error = "unable to fetch data";
    },
  },
});
export const SettingsReducer = SettingsSlice.reducer;
