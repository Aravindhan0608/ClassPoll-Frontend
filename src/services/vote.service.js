import api from './axios.js';

export const castVote = (pollId, optionId) =>
  api.post('/votes', { pollId, optionId }).then((res) => res.data.data.vote);

export const getMyVote = (pollId) =>
  api.get(`/votes/my/${pollId}`).then((res) => res.data.data);
