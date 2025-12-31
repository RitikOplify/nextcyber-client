import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  jobs: [],
  totalJobsPages: null,
  appliedJob: [],
};

export const jobReducer = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload.jobs;
      state.totalJobsPages = action.payload.totalPages;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJob = action.payload;
    },
    addAppliedJobs: (state, action) => {
      state.appliedJob.push(action.payload);
    },
  },
});

export const { setJobs, setAppliedJobs, addAppliedJobs } = jobReducer.actions;

export default jobReducer.reducer;
