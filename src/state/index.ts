import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import user from "./user/reducer";

console.log(process.env.NODE_ENV !== "production");
const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppState = ReturnType<typeof store.getState>;

export default store;
