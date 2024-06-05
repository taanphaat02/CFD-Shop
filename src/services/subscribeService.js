import axiosInstance from "../utils/axiosInstance";

export const subscribeService = {
  subsubscribe(payload = {}) {
    return axiosInstance.post(`/subscribes`, payload);
  },
  subscribeDeal(payload = {}) {
    return axiosInstance.post(`/subscribes/deals`, payload);
  },
};
