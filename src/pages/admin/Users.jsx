import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserX, UserCheck, Trash2, Users as UsersIcon, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import ConfirmDialog from '../../components/modals/ConfirmDialog.jsx';
import * as adminService from '../../services/admin.service.js';
import { getInitials, getErrorMessage, buildPath, cn } from '../../utils/helpers.js';
import { ROUTES } from '../../utils/constants.js';

const ROLE_TABS = [
  { label: 'All', value: '' },
  { label: 'Students', value: 'student' },
  { label: 'Teachers', value: 'teacher' },
];

const AdminUsers = () => {
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState(null); // { type: 'restrict'|'activate'|'delete', user }
  const [isProcessing, setIsProcessing] = useState(false);

  const load = async () => {
    const { users: list, pagination: p } = await adminService.getUsers({ role, search, page, limit: 12 });
    setUsers(list);
    setPagination(p);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, page]);

  // Debounced search — refetch 400ms after the user stops typing.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      load();
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const closeDialog = () => setPendingAction(null);

  const confirmAction = async () => {
    if (!pendingAction) return;
    const { type, user } = pendingAction;
    setIsProcessing(true);
    try {
      if (type === 'delete') {
        await adminService.deleteUser(user._id);
        setUsers((prev) => prev.filter((u) => u._id !== user._id));
        toast.success('User deleted');
      } else {
        const updated = await adminService.updateUser(user._id, { isActive: type === 'activate' });
        setUsers((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
        toast.success(type === 'activate' ? 'Account reactivated' : 'Account restricted');
      }
      closeDialog();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsProcessing(false);
    }
  };

  const dialogCopy = {
    restrict: {
      title: 'Restrict this account?',
      description: (u) => `${u.name} will be signed out and unable to log back in until reactivated. Their data is kept.`,
      confirmLabel: 'Restrict account',
      variant: 'danger',
    },
    activate: {
      title: 'Reactivate this account?',
      description: (u) => `${u.name} will be able to log in again immediately.`,
      confirmLabel: 'Reactivate account',
      variant: 'primary',
    },
    delete: {
      title: 'Delete this account?',
      description: (u) => `This permanently removes ${u.name}'s account. This cannot be undone.`,
      confirmLabel: 'Delete permanently',
      variant: 'danger',
    },
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-lg border border-base-border bg-base-surface p-1">
          {ROLE_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setRole(tab.value);
                setPage(1);
              }}
              className={cn(
                'rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors',
                role === tab.value ? 'bg-brand-gradient text-white' : 'text-ink-muted hover:text-ink'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="input w-64 pl-9"
          />
        </div>
      </div>

      {isLoading ? (
        <LoadingScreen label="Loading users" />
      ) : users.length === 0 ? (
        <EmptyState icon={UsersIcon} title="No users found" description="Try a different search or filter." />
      ) : (
        <div className="space-y-2.5">
          {users.map((user) => (
            <div key={user._id} className="glass-card flex items-center justify-between gap-4 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
                  {getInitials(user.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{user.name}</p>
                  <p className="truncate text-xs text-ink-faint">{user.email}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="badge bg-white/5 text-ink-muted capitalize">{user.role}</span>
                <span className={cn('badge', user.isActive ? 'bg-pulse-500/15 text-pulse-400' : 'bg-danger-500/15 text-danger-400')}>
                  {user.isActive ? 'Active' : 'Restricted'}
                </span>
                {user.role === 'student' && (
                  <Link
                    to={buildPath(ROUTES.ADMIN_USER_ACTIVITY, { userId: user._id })}
                    className="rounded-lg p-2 text-ink-faint hover:bg-white/5 hover:text-brand-400"
                    aria-label="View activity"
                  >
                    <Activity className="h-4 w-4" />
                  </Link>
                )}
                <button
                  onClick={() => setPendingAction({ type: user.isActive ? 'restrict' : 'activate', user })}
                  className="rounded-lg p-2 text-ink-faint hover:bg-white/5 hover:text-ink"
                  aria-label={user.isActive ? 'Restrict' : 'Reactivate'}
                >
                  {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setPendingAction({ type: 'delete', user })}
                  className="rounded-lg p-2 text-ink-faint hover:bg-white/5 hover:text-danger-400"
                  aria-label="Delete user"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={cn(
                'h-8 w-8 rounded-lg text-sm font-medium transition-colors',
                p === page ? 'bg-brand-gradient text-white' : 'text-ink-muted hover:bg-white/5 hover:text-ink'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {pendingAction && (
        <ConfirmDialog
          isOpen={Boolean(pendingAction)}
          onClose={closeDialog}
          onConfirm={confirmAction}
          isLoading={isProcessing}
          title={dialogCopy[pendingAction.type].title}
          description={dialogCopy[pendingAction.type].description(pendingAction.user)}
          confirmLabel={dialogCopy[pendingAction.type].confirmLabel}
          variant={dialogCopy[pendingAction.type].variant}
        />
      )}
    </div>
  );
};

export default AdminUsers;
