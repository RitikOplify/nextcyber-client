import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  jobs: [],
  applications: [],
  totalApplicationsPages: null,
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
    setApplications: (state, action) => {
      state.applications = action.payload.application;
      state.totalApplicationsPages = action.payload.totalPages;
    },
  },
});

export const { setJobs, setAppliedJobs, addAppliedJobs, setApplications } =
  jobReducer.actions;
export default jobReducer.reducer;
