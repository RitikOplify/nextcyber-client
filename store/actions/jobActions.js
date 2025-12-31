import { appliedJobApi, companyjobApi, getJobsApi } from "@/api/jobApi";
import { setAppliedJobs, setJobs } from "../slices/jobSlice";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/errMessage";

export const asyncGetJobs = (query, setIsLoading) => async (dispatch) => {
  setIsLoading?.(true);
  try {
    const { data } = await getJobsApi(query);
    dispatch(setJobs(data.data.jobs));
  } catch (error) {
    toast.error(getErrorMessage(error, "Failed to fetch Jobs"));
  } finally {
    setIsLoading?.(false);
  }
};

export const asyncGetAppliedJob = (query, setIsLoading) => async (dispatch) => {
  setIsLoading?.(true);
  try {
    const { data } = await appliedJobApi(query);
    dispatch(setAppliedJobs(data.data.applications));
  } catch (error) {
    toast.error(getErrorMessage(error, "Failed to fetch Jobs"));
  } finally {
    setIsLoading?.(false);
  }
};

export const asyncGetCreatedJobs = (query, setLoading) => async (dispatch) => {
  setLoading?.(true);
  try {
    const { data } = await companyjobApi(query);
    dispatch(setJobs(data?.data));
    setLoading?.(false);
  } catch (error) {
    toast.error(getErrorMessage(error, "Failed to fetch Jobs"));
    setLoading?.(false);
  }
};
