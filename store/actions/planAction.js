import { getCompanyPlansApi, getStudentPlansApi } from "@/api/planApi";
import { setPlans } from "../slices/planSlice";
import toast from "react-hot-toast";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

export const asyncGetStudentPlans = (setIsLoading) => async (dispatch) => {
  if (typeof setIsLoading === "function") setIsLoading(true);

  try {
    const { data } = await getStudentPlansApi();
    dispatch(setPlans(data.plans));
  } catch (error) {
    toast.error(getErrorMessage(error));
  } finally {
    if (typeof setIsLoading === "function") setIsLoading(false);
  }
};

export const asyncGetCompanyPlans = (setIsLoading) => async (dispatch) => {
  if (typeof setIsLoading === "function") setIsLoading(true);
  try {
    const { data } = await getCompanyPlansApi();
    dispatch(setPlans(data.plans));
  } catch (error) {
    toast.error(getErrorMessage(error));
  } finally {
    if (typeof setIsLoading === "function") setIsLoading(false);
  }
};
