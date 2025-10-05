import axios from "@/utils/axios";

export const getPlansApi = (params) =>
  axios.get(`/plan`, {
    params,
  });
