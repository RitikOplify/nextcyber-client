import axios from "@/utils/axios";

export const jobApplyApi = (id, data) => axios.patch(`/job/apply/${id}`, data);
export const recruiterjobApi = () => axios.get(`/job/recruiter`);
