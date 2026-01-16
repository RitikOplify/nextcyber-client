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
    removeJobs: (state) => {
      state.jobs = [];
      state.totalJobsPages = null;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJob = action.payload;
    },
    addAppliedJobs: (state, action) => {
      state.appliedJob.push(action.payload);
    },
    setApplications: (state, action) => {
      state.applications = action.payload.jobs;
      state.totalApplicationsPages = action.payload.totalPages;
    },
    updateAppliedJobStatus: (state, action) => {
      const { applicationId, newStatus } = action.payload;
      const applicationIndex = state.appliedJob.findIndex(
        (app) => app.id === applicationId
      );
      if (applicationIndex !== -1) {
        state.appliedJob[applicationIndex].status = newStatus;
      }
    },
  },
});

export const {
  setJobs,
  setAppliedJobs,
  addAppliedJobs,
  setApplications,
  removeJobs,
  updateAppliedJobStatus,
} = jobReducer.actions;
export default jobReducer.reducer;
