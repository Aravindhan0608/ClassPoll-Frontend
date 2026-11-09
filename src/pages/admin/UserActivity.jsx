import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Shield, Vote, MessageCircleQuestion, UserX, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import ConfirmDialog from '../../components/modals/ConfirmDialog.jsx';
import * as adminService from '../../services/admin.service.js';
import { getInitials, formatRelativeTime, getErrorMessage, cn } from '../../utils/helpers.js';

const AdminUserActivity = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const load = async () => {
    const activity = await adminService.getUserActivity(userId);
    setData(activity);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await load();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  const handleToggleActive = async () => {
    setIsUpdating(true);
    try {
      const updated = await adminService.updateUser(userId, { isActive: !data.user.isActive });
      setData((prev) => ({ ...prev, user: updated }));
      toast.success(updated.isActive ? 'Account reactivated' : 'Account restricted');
      setConfirmOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading || !data) return <LoadingScreen label="Loading activity" />;

  const { user, votes, questions } = data;
  const isRestricting = user.isActive;

  return (
    <div className="mx-auto max-w-2xl">
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="glass-card mb-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-lg font-semibold text-white">
            {getInitials(user.name)}
          </span>
          <div>
            <p className="font-display text-lg text-ink">{user.name}</p>
            <p className="flex items-center gap-1.5 text-sm text-ink-faint">
              <Mail className="h-3.5 w-3.5" /> {user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge bg-white/5 text-ink-muted capitalize">
            <Shield className="h-3 w-3" /> {user.role}
          </span>
          <span className={cn('badge', user.isActive ? 'bg-pulse-500/15 text-pulse-400' : 'bg-danger-500/15 text-danger-400')}>
            {user.isActive ? 'Active' : 'Restricted'}
          </span>
          <Button
            size="sm"
            variant={isRestricting ? 'danger' : 'secondary'}
            onClick={() => setConfirmOpen(true)}
          >
            {isRestricting ? <UserX className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
            {isRestricting ? 'Restrict' : 'Activate'}
          </Button>
        </div>
      </div>

      {user.role === 'student' && (
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
              <Vote className="h-4 w-4 text-brand-400" /> Poll responses ({votes.length})
            </h3>
            {votes.length === 0 ? (
              <EmptyState icon={Vote} title="No poll responses yet" />
            ) : (
              <div className="space-y-2.5">
                {votes.map((v, i) => (
                  <div key={i} className="glass-card p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-ink-faint">{v.className}</span>
                      <span className="text-xs text-ink-faint">{formatRelativeTime(v.votedAt)}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink">{v.question}</p>
                    <p className="mt-1 text-sm text-pulse-400">Selected: {v.selectedOptionText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
              <MessageCircleQuestion className="h-4 w-4 text-amber-400" /> Questions asked ({questions.length})
            </h3>
            {questions.length === 0 ? (
              <EmptyState icon={MessageCircleQuestion} title="No questions asked yet" />
            ) : (
              <div className="space-y-2.5">
                {questions.map((q) => (
                  <div key={q._id} className="glass-card p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-ink-faint">{q.classId?.className}</span>
                      <span className="text-xs text-ink-faint">{formatRelativeTime(q.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink">{q.question}</p>
                    {q.answer && <p className="mt-2 text-sm text-pulse-400">↳ {q.answer}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleToggleActive}
        isLoading={isUpdating}
        title={isRestricting ? 'Restrict this account?' : 'Reactivate this account?'}
        description={
          isRestricting
            ? `${user.name} will be signed out and unable to log back in until reactivated. This does not delete their data.`
            : `${user.name} will be able to log in again immediately.`
        }
        confirmLabel={isRestricting ? 'Restrict account' : 'Reactivate account'}
        variant={isRestricting ? 'danger' : 'primary'}
      />
    </div>
  );
};

export default AdminUserActivity;
