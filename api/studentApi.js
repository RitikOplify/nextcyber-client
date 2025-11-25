import axios from "@/utils/axios";

export const studentOnboardingApi = (data) =>
  axios.post(`/student/onboarding`, data);

export const getCompaniesApi = ()=> axios.get('/student/find-companies')