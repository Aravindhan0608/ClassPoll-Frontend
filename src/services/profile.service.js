import api from './axios.js';

export const getMyProfile = () => api.get('/profile').then((res) => res.data.data);

export const upsertMyProfile = (payload) =>
  api.put('/profile', payload).then((res) => res.data.data.studentProfile);
