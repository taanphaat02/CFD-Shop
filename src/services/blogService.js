import axiosInstance from "../utils/axiosInstance";

export const blogService = {
  getBlogs() {
    return axiosInstance.get(`/blogs`);
  },
  getBlogBySlug(slug = "") {
    return axiosInstance.get(`/blogs/${slug}`);
  },
  getCategories() {
    return axiosInstance.get(`/blog-categories`);
  },
  getBlogCatorygy(slug = "") {
    return axiosInstance.get(`/blog-categories/${slug}`);
  },
  getTags() {
    return axiosInstance / get(`blog-tags`);
  },
  getBlogTags(slug = "") {
    return axiosInstance.get(`/blog-tags/${slug}`);
  },
};
