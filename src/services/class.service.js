import api from './axios.js';

export const createClass = (payload) => api.post('/classes', payload).then((res) => res.data.data.class);

export const getMyTeacherClasses = (includeArchived = false) =>
  api
    .get('/classes/teacher/my', { params: { includeArchived } })
    .then((res) => res.data.data.classes);

export const getMyStudentClasses = () =>
  api.get('/classes/student/my').then((res) => res.data.data.classes);

export const getClassById = (id) => api.get(`/classes/${id}`).then((res) => res.data.data.class);

export const updateClass = (id, payload) =>
  api.patch(`/classes/${id}`, payload).then((res) => res.data.data.class);

export const archiveClass = (id) => api.delete(`/classes/${id}`).then((res) => res.data);

export const regenerateJoinCode = (id) =>
  api.post(`/classes/${id}/regenerate-code`).then((res) => res.data.data.classCode);

export const joinClass = (classCode) =>
  api.post('/classes/join', { classCode }).then((res) => res.data.data.class);

export const removeStudent = (classId, studentId) =>
  api.delete(`/classes/${classId}/students/${studentId}`).then((res) => res.data.data.class);
