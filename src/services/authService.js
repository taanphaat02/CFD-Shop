import axiosInstance from "../utils/axiosInstance";

export const authService = {
  login(payload = {}) {
    return axiosInstance.post(`/customer/login`, payload);
  },
  register(payload = {}) {
    return axiosInstance.post(`/customer/register`, payload);
  },
  getProfile() {
    return axiosInstance.get(`/customer/profiles`);
  },
  getDataProvince() {
    return axiosInstance.get(`/provinces`);
  },
  getDataProvinceById(id) {
    return axiosInstance.get(`/provinces/${id}`);
  },
  getDataDistrict(id) {
    return axiosInstance.get(`/districts?province=${id}`);
  },
  getDataDistrictById(id) {
    return axiosInstance.get(`/districts/${id}`);
  },
  getDataWard(id) {
    return axiosInstance.get(`wards?district=${id}`);
  },
  getDataWardById(id) {
    return axiosInstance.get(`/wards/${id}`);
  },
  updateProfile(payload = {}) {
    return axiosInstance.put(`/customer/profiles`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getOrderMe() {
    return axiosInstance.get(`/orders/me`);
  },
  review(payload = {}) {
    return axiosInstance.post(`/reviews`, payload);
  },
  addWishlist(payload = {}) {
    return axiosInstance.post(`/customer/white-list`, payload);
  },
  deleteWishlist: (payload = {}) => {
    return axiosInstance.delete("/customer/white-list", {
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });
  },
};
