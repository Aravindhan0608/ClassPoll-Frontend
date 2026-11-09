import api from './axios.js';

export const createPoll = (payload) => api.post('/polls', payload).then((res) => res.data.data.poll);

export const startPoll = (id) => api.post(`/polls/${id}/start`).then((res) => res.data.data.poll);

export const endPoll = (id) => api.post(`/polls/${id}/end`).then((res) => res.data.data.poll);

export const updatePoll = (id, payload) =>
  api.patch(`/polls/${id}`, payload).then((res) => res.data.data.poll);

export const deletePoll = (id) => api.delete(`/polls/${id}`).then((res) => res.data);

export const getPollsForClass = (classId) =>
  api.get(`/polls/class/${classId}`).then((res) => res.data.data.polls);

export const getActivePoll = (classId) =>
  api
    .get(`/polls/class/${classId}/active`)
    .then((res) => res.data.data.poll)
    .catch((err) => {
      if (err.response?.status === 404) return null;
      throw err;
    });

export const getPollById = (id) => api.get(`/polls/${id}`).then((res) => res.data.data.poll);

export const getPollResults = (id) => api.get(`/polls/${id}/results`).then((res) => res.data.data);
