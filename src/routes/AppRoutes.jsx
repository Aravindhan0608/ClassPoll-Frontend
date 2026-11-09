import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import RoleRoute from './RoleRoute.jsx';
import LoadingScreen from '../components/common/LoadingScreen.jsx';

import StudentLayout from '../layouts/StudentLayout.jsx';
import TeacherLayout from '../layouts/TeacherLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';

// Route-level code splitting
const Landing = lazy(() => import('../pages/shared/Landing.jsx'));
const NotFound = lazy(() => import('../pages/shared/NotFound.jsx'));
const Login = lazy(() => import('../pages/auth/Login.jsx'));
const StudentRegister = lazy(() => import('../pages/auth/StudentRegister.jsx'));
const TeacherRegister = lazy(() => import('../pages/auth/TeacherRegister.jsx'));

const StudentDashboard = lazy(() => import('../pages/student/Dashboard.jsx'));
const MyClasses = lazy(() => import('../pages/student/MyClasses.jsx'));
const StudentActivePoll = lazy(() => import('../pages/student/ActivePoll.jsx'));
const PollHistory = lazy(() => import('../pages/student/PollHistory.jsx'));
const StudentQuestions = lazy(() => import('../pages/student/Questions.jsx'));
const NotificationsPage = lazy(() => import('../pages/student/Notifications.jsx'));
const StudentProfile = lazy(() => import('../pages/student/Profile.jsx'));

const TeacherDashboard = lazy(() => import('../pages/teacher/Dashboard.jsx'));
const TeacherClasses = lazy(() => import('../pages/teacher/Classes.jsx'));
const TeacherClassDetail = lazy(() => import('../pages/teacher/ClassDetail.jsx'));
const TeacherPollResults = lazy(() => import('../pages/teacher/PollResults.jsx'));
const TeacherQuestions = lazy(() => import('../pages/teacher/Questions.jsx'));
const TeacherProfile = lazy(() => import('../pages/teacher/Profile.jsx'));

const AdminDashboard = lazy(() => import('../pages/admin/Dashboard.jsx'));
const AdminUsers = lazy(() => import('../pages/admin/Users.jsx'));
const AdminClasses = lazy(() => import('../pages/admin/Classes.jsx'));
const AdminClassDetail = lazy(() => import('../pages/admin/ClassDetail.jsx'));
const AdminUserActivity = lazy(() => import('../pages/admin/UserActivity.jsx'));
const AdminAnalytics = lazy(() => import('../pages/admin/Analytics.jsx'));
const AdminSettings = lazy(() => import('../pages/admin/Settings.jsx'));

import { ROUTES, ROLES } from '../utils/constants.js';

const roleHome = {
  [ROLES.STUDENT]: ROUTES.STUDENT_DASHBOARD,
  [ROLES.TEACHER]: ROUTES.TEACHER_DASHBOARD,
  [ROLES.ADMIN]: ROUTES.ADMIN_DASHBOARD,
};

/** Sends an already-logged-in user away from public auth pages to their dashboard. */
const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to={roleHome[user.role] || ROUTES.HOME} replace />;
  return children;
};

const AppRoutes = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      {/* Public */}
      <Route path={ROUTES.HOME} element={<Landing />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER_STUDENT}
        element={
          <PublicOnlyRoute>
            <StudentRegister />
          </PublicOnlyRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER_TEACHER}
        element={
          <PublicOnlyRoute>
            <TeacherRegister />
          </PublicOnlyRoute>
        }
      />

      {/* Authenticated */}
      <Route element={<ProtectedRoute />}>
        {/* Student */}
        <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
          <Route element={<StudentLayout />}>
            <Route path={ROUTES.STUDENT_DASHBOARD} element={<StudentDashboard />} />
            <Route path={ROUTES.STUDENT_CLASSES} element={<MyClasses />} />
            <Route path={ROUTES.STUDENT_ACTIVE_POLL} element={<StudentActivePoll />} />
            <Route path={ROUTES.STUDENT_POLL_HISTORY} element={<PollHistory />} />
            <Route path={ROUTES.STUDENT_QUESTIONS} element={<StudentQuestions />} />
            <Route path={ROUTES.STUDENT_NOTIFICATIONS} element={<NotificationsPage />} />
            <Route path={ROUTES.STUDENT_PROFILE} element={<StudentProfile />} />
          </Route>
        </Route>

        {/* Teacher */}
        <Route element={<RoleRoute allowedRoles={[ROLES.TEACHER]} />}>
          <Route element={<TeacherLayout />}>
            <Route path={ROUTES.TEACHER_DASHBOARD} element={<TeacherDashboard />} />
            <Route path={ROUTES.TEACHER_CLASSES} element={<TeacherClasses />} />
            <Route path={ROUTES.TEACHER_CLASS_DETAIL} element={<TeacherClassDetail />} />
            <Route path={ROUTES.TEACHER_QUESTIONS} element={<TeacherQuestions />} />
            <Route path={ROUTES.TEACHER_PROFILE} element={<TeacherProfile />} />
          </Route>
          {/* Poll results is a focused, single-column view — no sidebar chrome needed */}
          <Route path={ROUTES.TEACHER_POLL_RESULTS} element={<TeacherPollResults />} />
        </Route>

        {/* Admin */}
        <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            <Route path={ROUTES.ADMIN_USERS} element={<AdminUsers />} />
            <Route path={ROUTES.ADMIN_USER_ACTIVITY} element={<AdminUserActivity />} />
            <Route path={ROUTES.ADMIN_CLASSES} element={<AdminClasses />} />
            <Route path={ROUTES.ADMIN_CLASS_DETAIL} element={<AdminClassDetail />} />
            <Route path={ROUTES.ADMIN_ANALYTICS} element={<AdminAnalytics />} />
            <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettings />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
