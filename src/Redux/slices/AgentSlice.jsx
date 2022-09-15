import { createSlice } from "@reduxjs/toolkit";
import { GetAgent } from "../actions";

const initialState = {
  loading: false,
  agent: null,
  error: false,
};
const GetAgentProfile = createSlice({
  name: "agent",
  initialState,
  //   reducers: {},
  extraReducers: {
    [GetAgent.fulfilled]: (state, action) => {
      state.loading = false;
      state.agent = action.payload;
      state.error = false;
    },
    [GetAgent.pending]: (state) => {
      state.loading = true;
      state.agent = null;
      state.error = false;
    },
    [GetAgent.rejected]: (state) => {
      state.loading = false;
      state.error = true;
      state.agent = null;
    },
  },
});

export const GetAgentReducer = GetAgentProfile.reducer;
