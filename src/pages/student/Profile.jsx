import { useState, useEffect } from 'react';
import { Mail, Shield, Calendar, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { getInitials, formatDate } from '../../utils/helpers.js';
import { Spinner } from '../../components/common/LoadingScreen.jsx';
import StudentProfileForm from '../../components/forms/StudentProfileForm.jsx';
import * as profileService from '../../services/profile.service.js';

const StudentProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    profileService
      .getMyProfile()
      .then((data) => {
        if (isMounted) {
          setProfile(data?.studentProfile || {});
        }
      })
      .catch((err) => {
        console.error('Failed to load profile', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="glass-card p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-2xl font-semibold text-white">
          {getInitials(user?.name)}
        </div>
        <h2 className="mt-4 font-display text-xl text-ink">{user?.name}</h2>
        <span className="badge mt-2 bg-white/5 text-ink-muted">Student</span>

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

      <div className="glass-card p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg text-ink">Academic Profile</h3>
            <p className="text-xs text-ink-muted">Manage your institutional details</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        ) : (
          <StudentProfileForm
            defaultValues={profile}
            onSaved={(updatedProfile) => setProfile(updatedProfile)}
          />
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
