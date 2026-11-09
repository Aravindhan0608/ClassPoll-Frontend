import api from './axios.js';

export const registerStudent = (payload) =>
  api.post('/auth/register/student', payload).then((res) => res.data.data);

export const registerTeacher = (payload) =>
  api.post('/auth/register/teacher', payload).then((res) => res.data.data);

export const login = (payload) => api.post('/auth/login', payload).then((res) => res.data.data);

export const logout = () => api.post('/auth/logout').then((res) => res.data);

export const getMe = () => api.get('/auth/me').then((res) => res.data.data.user);
