import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  jobs: [],
  appliedJob: [],
};

export const jobReducer = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJob = action.payload;
    },
    addAppliedJobs: (state, action) => {
      state.appliedJob.push(action.payload);
    },
  },
});

export const { setJobs, setAppliedJobs,addAppliedJobs } = jobReducer.actions;

export default jobReducer.reducer;
