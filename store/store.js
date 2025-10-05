import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice.js";
import plans from "./slices/planSlice.js";

export const store = configureStore({
  reducer: { auth, plans },
});
