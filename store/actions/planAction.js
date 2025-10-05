import { getPlansApi } from "@/api/planApi";
import { setPlans } from "../slices/planSlice";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

export const asyncGetPlans = (query, setIsLoading) => async (dispatch) => {
  if (typeof setIsLoading === "function") setIsLoading(true);

  try {
    const { data } = await getPlansApi(query);
    dispatch(setPlans(data.plans));
  } catch (error) {
    toast.error(getErrorMessage(error));
  } finally {
    if (typeof setIsLoading === "function") setIsLoading(false);
  }
};
