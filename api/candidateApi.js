import axios from "@/utils/axios";

export const findStudentsApi = (params) =>
  axios.get("/company/find-students", { params });