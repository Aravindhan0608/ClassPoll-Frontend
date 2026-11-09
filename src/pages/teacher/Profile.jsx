import { Mail, Shield, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { getInitials, formatDate } from '../../utils/helpers.js';

const TeacherProfile = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-card p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-2xl font-semibold text-white">
          {getInitials(user?.name)}
        </div>
        <h2 className="mt-4 font-display text-xl text-ink">{user?.name}</h2>
        <span className="badge mt-2 bg-white/5 text-ink-muted">Teacher</span>

        <div className="mt-8 space-y-4 text-left">
          <div className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3">
            <Mail className="h-4 w-4 text-ink-faint" />
            <div>
              <p className="text-xs text-ink-faint">Email</p>
              <p className="text-sm text-ink">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3">
            <Shield className="h-4 w-4 text-ink-faint" />
            <div>
              <p className="text-xs text-ink-faint">Role</p>
              <p className="text-sm capitalize text-ink">{user?.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-base-border px-4 py-3">
            <Calendar className="h-4 w-4 text-ink-faint" />
            <div>
              <p className="text-xs text-ink-faint">Member since</p>
              <p className="text-sm text-ink">{formatDate(user?.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
