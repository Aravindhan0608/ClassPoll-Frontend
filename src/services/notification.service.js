import api from './axios.js';

export const getMyNotifications = (params = {}) =>
  api.get('/notifications', { params }).then((res) => res.data.data);

export const getUnreadCount = () =>
  api.get('/notifications/unread-count').then((res) => res.data.data.count);

export const markAsRead = (id) =>
  api.patch(`/notifications/${id}/read`).then((res) => res.data.data.notification);

export const markAllAsRead = () => api.patch('/notifications/read-all').then((res) => res.data.data);

export const deleteNotification = (id) => api.delete(`/notifications/${id}`).then((res) => res.data);
