import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  user: null,
};
const userSlice = createSlice({
  name: "verify_user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
