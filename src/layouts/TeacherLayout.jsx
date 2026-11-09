import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, BookOpen, User } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';
import Logo from '../components/common/Logo.jsx';
import { ROUTES } from '../utils/constants.js';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: ROUTES.TEACHER_DASHBOARD, end: true },
  { label: 'Classes', icon: BookOpen, to: ROUTES.TEACHER_CLASSES },
  { label: 'Profile', icon: User, to: ROUTES.TEACHER_PROFILE },
];

const titleFor = (pathname) => {
  if (pathname.startsWith(ROUTES.TEACHER_PROFILE)) return 'Profile';
  if (pathname.includes('/questions')) return 'Questions';
  if (pathname.startsWith('/teacher/polls/')) return 'Poll Results';
  if (pathname.startsWith(ROUTES.TEACHER_CLASSES) && pathname !== ROUTES.TEACHER_CLASSES) return 'Class';
  if (pathname.startsWith(ROUTES.TEACHER_CLASSES)) return 'Classes';
  return 'Dashboard';
};

const TeacherLayout = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-base">
      <Sidebar items={NAV_ITEMS} roleLabel="Teacher" />

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex w-64 flex-col bg-base-surface">
            <div className="flex items-center justify-between px-6 py-6">
              <Logo size="sm" />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5 text-ink-muted" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.to}
                  href={item.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-white/5 hover:text-ink"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-base-border px-4 py-3 lg:hidden">
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5 text-ink-muted" />
          </button>
          <Logo size="sm" />
        </div>
        <Topbar title={titleFor(location.pathname)} />
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
