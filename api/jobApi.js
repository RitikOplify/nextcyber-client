import axios from "@/utils/axios";

export const getJobsApi = (params) =>
  axios.get("/student/find-jobs", { params });

export const jobApplyApi = (id) => axios.post(`/student/apply-job?jobId=${id}`);
export const appliedJobApi = () => axios.get(`/student/job-applications`);

export const companyjobApi = (params) =>
  axios.get(`/company/created-jobs`, { params });
