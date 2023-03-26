import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "state";
import { fetchUserById } from "./action";

export const USER_SLICE_NAME = "user";
interface UserState {
  email: string;
  isAdmin: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  email: "",
  isAdmin: false,
  loading: "idle",
} as UserState;

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = "pending";
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;

      state.loading = "succeeded";
    });
  },
});

export const userSelector = (state: AppState) => state.user;

export default userSlice.reducer;
