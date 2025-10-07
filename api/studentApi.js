import axios from "@/utils/axios";

export const studentOnboardingApi = (id, data) =>
  axios.patch(`/student/onboarding/${id}`, data);
