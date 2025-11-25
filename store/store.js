import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice.js";
import plans from "./slices/planSlice.js";
import jobs from "./slices/jobSlice.js";
import companies from "./slices/companySlice.js";

export const store = configureStore({
  reducer: { auth, plans, jobs, companies },
});
