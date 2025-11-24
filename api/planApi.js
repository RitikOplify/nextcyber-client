import axios from "@/utils/axios";

export const getStudentPlansApi = () =>
  axios.get(`/student/subscription-plans`);
