import axios from "@/utils/axios";

export const studentOnboardingApi = (id, data) =>
  axios.post(`/student/onboarding/${id}`, data);
