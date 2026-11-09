import api from './axios.js';

export const askQuestion = (classId, question) =>
  api.post('/questions', { classId, question }).then((res) => res.data.data.question);

export const answerQuestion = (id, answer) =>
  api.patch(`/questions/${id}/answer`, { answer }).then((res) => res.data.data.question);

export const getQuestionsForClass = (classId, status) =>
  api
    .get(`/questions/class/${classId}`, { params: status ? { status } : {} })
    .then((res) => res.data.data.questions);

export const getQuestionById = (id) => api.get(`/questions/${id}`).then((res) => res.data.data.question);
