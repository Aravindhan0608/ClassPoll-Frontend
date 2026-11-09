import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Users, RefreshCw, Archive, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import EmptyState from '../../components/common/EmptyState.jsx';
import Button from '../../components/common/Button.jsx';
import CreateClassModal from '../../components/class/CreateClassModal.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import * as classService from '../../services/class.service.js';
import { buildPath, getErrorMessage } from '../../utils/helpers.js';
import { ROUTES } from '../../utils/constants.js';

const TeacherClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const load = async () => {
    const list = await classService.getMyTeacherClasses();
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
  }, []);

  const handleRegenerate = async (id) => {
    try {
      const newCode = await classService.regenerateJoinCode(id);
      setClasses((prev) => prev.map((c) => (c._id === id ? { ...c, classCode: newCode } : c)));
      toast.success(`New join code: ${newCode}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleArchive = async (id) => {
    try {
      await classService.archiveClass(id);
      setClasses((prev) => prev.filter((c) => c._id !== id));
      toast.success('Class archived');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) return <LoadingScreen label="Loading classes" />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink-muted">{classes.length} active class{classes.length === 1 ? '' : 'es'}</p>
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Create class
        </Button>
      </div>

      {classes.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No classes yet"
          description="Create a class to get a shareable join code for your students."
          action={<Button onClick={() => setModalOpen(true)}>Create your first class</Button>}
        />
      ) : (
        <div className="space-y-3">
          {classes.map((c) => (
            <div key={c._id} className="glass-card flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="font-medium text-ink">{c.className}</p>
                <span className="mt-1 flex items-center gap-3 text-xs text-ink-faint">
                  <span className="code-chip text-sm">{c.classCode}</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {c.studentCount ?? c.students?.length ?? 0}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRegenerate(c._id)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-ink-muted hover:bg-white/5 hover:text-ink"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> New code
                </button>
                <button
                  onClick={() => handleArchive(c._id)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-ink-muted hover:bg-white/5 hover:text-danger-400"
                >
                  <Archive className="h-3.5 w-3.5" /> Archive
                </button>
                <Link to={buildPath(ROUTES.TEACHER_CLASS_DETAIL, { classId: c._id })}>
                  <Button size="sm" variant="secondary">
                    Open <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateClassModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreated={load} />
    </div>
  );
};

export default TeacherClasses;
