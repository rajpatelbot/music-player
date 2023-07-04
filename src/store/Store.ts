import { configureStore } from "@reduxjs/toolkit";
import BaseSlice from "./slice/BaseSlice";

export const store = configureStore({
  reducer: {
    base: BaseSlice,
  },
});
