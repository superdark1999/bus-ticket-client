import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "state";

export const USER_SLICE_NAME = "user";

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState: {
    user: {
      email: "Long@gmail.com",
      isAdmin: true,
    },
  },
  reducers: {},
});

export const userSelector = (state: AppState) => state.user;

export default userSlice.reducer;
