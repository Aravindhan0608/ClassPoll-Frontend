export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
};

export const POLL_STATUS = {
  DRAFT: 'draft',
  LIVE: 'live',
  ENDED: 'ended',
};

export const QUESTION_STATUS = {
  PENDING: 'pending',
  ANSWERED: 'answered',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER_STUDENT: '/register/student',
  REGISTER_TEACHER: '/register/teacher',

  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_CLASSES: '/student/classes',
  STUDENT_ACTIVE_POLL: '/student/classes/:classId/poll',
  STUDENT_POLL_HISTORY: '/student/classes/:classId/history',
  STUDENT_QUESTIONS: '/student/classes/:classId/questions',
  STUDENT_NOTIFICATIONS: '/student/notifications',
  STUDENT_PROFILE: '/student/profile',

  TEACHER_DASHBOARD: '/teacher/dashboard',
  TEACHER_CREATE_CLASS: '/teacher/classes/new',
  TEACHER_CLASSES: '/teacher/classes',
  TEACHER_CLASS_DETAIL: '/teacher/classes/:classId',
  TEACHER_CREATE_POLL: '/teacher/classes/:classId/polls/new',
  TEACHER_POLL_RESULTS: '/teacher/polls/:pollId',
  TEACHER_QUESTIONS: '/teacher/classes/:classId/questions',
  TEACHER_PROFILE: '/teacher/profile',

  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_ACTIVITY: '/admin/users/:userId/activity',
  ADMIN_CLASSES: '/admin/classes',
  ADMIN_CLASS_DETAIL: '/admin/classes/:classId',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',
};
