import axios from "@/utils/axios";


export const getStudentNotificationsApi = (query) => {
  return axios.get("/student/notifications", { params: query });
};

export const getCompanyNotificationsApi = (query) => {
  return axios.get("/company/notifications", { params: query });
};

export const markStudentNotificationAsReadApi = (notificationId) => {
  return axios.post(`/student/mark-notification-as-read?notificationId=${notificationId}`);
}

export const markCompanyNotificationAsReadApi = (notificationId) => {
  return axios.post(`/company/mark-notification-as-read?notificationId=${notificationId}`);
}   