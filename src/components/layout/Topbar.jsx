import { useEffect, useRef, useState } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import NotificationBell from '../notification/NotificationBell.jsx';
import { getInitials } from '../../utils/helpers.js';
import { ROUTES } from '../../utils/constants.js';

const profileRouteByRole = {
  student: ROUTES.STUDENT_PROFILE,
  teacher: ROUTES.TEACHER_PROFILE,
  admin: ROUTES.ADMIN_SETTINGS,
};

const notificationsRouteByRole = {
  student: ROUTES.STUDENT_NOTIFICATIONS,
  teacher: null,
  admin: null,
};

const Topbar = ({ title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-base-border bg-base/80 px-6 py-4 backdrop-blur-xl">
      <h1 className="font-display text-lg text-ink">{title}</h1>
      <div className="flex items-center gap-3">
        <NotificationBell notificationsRoute={notificationsRouteByRole[user?.role]} />
        <div className="relative" ref={ref}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-white/5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
              {getInitials(user?.name)}
            </span>
            <span className="hidden text-sm text-ink sm:inline">{user?.name?.split(' ')[0]}</span>
            <ChevronDown className="h-3.5 w-3.5 text-ink-faint" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 glass-card p-1.5 shadow-glass">
              <Link
                to={profileRouteByRole[user?.role] || ROUTES.HOME}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
              >
                <User className="h-4 w-4" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-danger-400 hover:bg-danger-500/10"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
