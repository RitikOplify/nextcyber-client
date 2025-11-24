import axios from "@/utils/axios";

export const studentOnboardingApi = (data) =>
  axios.post(`/student/onboarding`, data);
