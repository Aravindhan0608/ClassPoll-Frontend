import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Archive, BookOpen, Users, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import ConfirmDialog from '../../components/modals/ConfirmDialog.jsx';
import * as adminService from '../../services/admin.service.js';
import { getErrorMessage, buildPath } from '../../utils/helpers.js';
import { ROUTES } from '../../utils/constants.js';

const AdminClasses = () => {
  const [search, setSearch] = useState('');
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingArchive, setPendingArchive] = useState(null);
  const [isArchiving, setIsArchiving] = useState(false);

  const load = async () => {
    const { classes: list } = await adminService.getAllClasses({ search, limit: 50 });
    setClasses(list);
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
  }, []);

  useEffect(() => {
    const timeout = setTimeout(load, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleArchive = async () => {
    if (!pendingArchive) return;
    setIsArchiving(true);
    try {
      await adminService.archiveClass(pendingArchive._id);
      setClasses((prev) => prev.filter((c) => c._id !== pendingArchive._id));
      toast.success('Class archived');
      setPendingArchive(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink-muted">{classes.length} class{classes.length === 1 ? '' : 'es'}</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search class name or code…"
            className="input w-64 pl-9"
          />
        </div>
      </div>

      {isLoading ? (
        <LoadingScreen label="Loading classes" />
      ) : classes.length === 0 ? (
        <EmptyState icon={BookOpen} title="No classes found" description="Try a different search." />
      ) : (
        <div className="space-y-2.5">
          {classes.map((c) => (
            <div key={c._id} className="glass-card flex flex-wrap items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{c.className}</p>
                <p className="mt-0.5 text-xs text-ink-faint">Taught by {c.teacherId?.name || 'Unknown'}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="code-chip text-sm">{c.classCode}</span>
                <span className="flex items-center gap-1 text-xs text-ink-faint">
                  <Users className="h-3.5 w-3.5" /> {c.studentCount}
                </span>
                <button
                  onClick={() => setPendingArchive(c)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink-muted hover:bg-white/5 hover:text-danger-400"
                >
                  <Archive className="h-3.5 w-3.5" /> Archive
                </button>
                <Link
                  to={buildPath(ROUTES.ADMIN_CLASS_DETAIL, { classId: c._id })}
                  className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-brand-300 hover:bg-white/10"
                >
                  Enter class <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(pendingArchive)}
        onClose={() => setPendingArchive(null)}
        onConfirm={handleArchive}
        isLoading={isArchiving}
        title="Archive this class?"
        description={
          pendingArchive
            ? `"${pendingArchive.className}" will be hidden from active class lists for everyone. Polls, questions, and votes are preserved.`
            : ''
        }
        confirmLabel="Archive class"
      />
    </div>
  );
};

export default AdminClasses;
