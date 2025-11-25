import axios from "@/utils/axios";

export const getCompanyProfileApi = (id) =>
  axios.get(`/student/company-profile?id=${id}`);
