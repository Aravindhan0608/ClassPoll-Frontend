import api from './axios.js';

export const getDashboardOverview = () => api.get('/admin/dashboard').then((res) => res.data.data);

export const getAnalytics = () => api.get('/admin/analytics').then((res) => res.data.data);

export const getUsers = (params = {}) => api.get('/admin/users', { params }).then((res) => res.data.data);

export const getUserById = (id) => api.get(`/admin/users/${id}`).then((res) => res.data.data.user);

export const getUserActivity = (id) => api.get(`/admin/users/${id}/activity`).then((res) => res.data.data);

export const updateUser = (id, payload) =>
  api.patch(`/admin/users/${id}`, payload).then((res) => res.data.data.user);

export const deleteUser = (id) => api.delete(`/admin/users/${id}`).then((res) => res.data);

export const getAllClasses = (params = {}) => api.get('/admin/classes', { params }).then((res) => res.data.data);

export const getClassDetail = (id) => api.get(`/admin/classes/${id}`).then((res) => res.data.data);

export const archiveClass = (id) => api.delete(`/admin/classes/${id}`).then((res) => res.data);
