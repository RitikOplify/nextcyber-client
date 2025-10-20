import axios from "@/utils/axios";

export const recruiterOnboardingApi = (id, data) =>
  axios.post(`/recruiter/onboarding/${id}`, data);
