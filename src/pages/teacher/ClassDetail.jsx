import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Copy, Plus, Users, MessageCircleQuestion, Radio } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../../components/modals/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import PollCard from '../../components/poll/PollCard.jsx';
import CreatePollForm from '../../components/poll/CreatePollForm.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import useClassRoom from '../../hooks/useClassRoom.js';
import useSocketEvent from '../../hooks/useSocketEvent.js';
import * as classService from '../../services/class.service.js';
import * as pollService from '../../services/poll.service.js';
import { buildPath } from '../../utils/helpers.js';
import { ROUTES } from '../../utils/constants.js';

const TeacherClassDetail = () => {
  const { classId } = useParams();
  const [classDoc, setClassDoc] = useState(null);
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pollModalOpen, setPollModalOpen] = useState(false);

  useClassRoom(classId);

  const load = async () => {
    const [classData, pollList] = await Promise.all([
      classService.getClassById(classId),
      pollService.getPollsForClass(classId),
    ]);
    setClassDoc(classData);
    setPolls(pollList);
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
  }, [classId]);

  useSocketEvent('poll:ended', (payload) => {
    setPolls((prev) => prev.map((p) => (p._id === payload.poll._id ? payload.poll : p)));
  });

  const handlePollChange = (updated) => {
    setPolls((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
  };

  const handlePollDeleted = (id) => {
    setPolls((prev) => prev.filter((p) => p._id !== id));
  };

  const handlePollCreated = (poll) => {
    setPolls((prev) => [poll, ...prev]);
    setPollModalOpen(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(classDoc.classCode);
    toast.success('Join code copied');
  };

  if (isLoading) return <LoadingScreen label="Loading class" />;

  return (
    <div className="space-y-8">
      <div className="glass-card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-display text-xl text-ink">{classDoc.className}</h2>
          {classDoc.description && <p className="mt-1 text-sm text-ink-muted">{classDoc.description}</p>}
          <span className="mt-2 flex items-center gap-1.5 text-xs text-ink-faint">
            <Users className="h-3.5 w-3.5" /> {classDoc.students?.length || 0} students enrolled
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-ink-faint">Join code</p>
            <p className="code-chip">{classDoc.classCode}</p>
          </div>
          <button onClick={copyCode} className="rounded-lg border border-base-border p-2.5 text-ink-muted hover:bg-white/5 hover:text-ink" aria-label="Copy join code">
            <Copy className="h-4 w-4" />
          </button>
          <Link to={buildPath(ROUTES.TEACHER_QUESTIONS, { classId })}>
            <Button variant="secondary" size="sm">
              <MessageCircleQuestion className="h-4 w-4" /> Questions
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg text-ink">Polls</h3>
          <Button size="sm" onClick={() => setPollModalOpen(true)}>
            <Plus className="h-4 w-4" /> Create poll
          </Button>
        </div>

        {polls.length === 0 ? (
          <EmptyState icon={Radio} title="No polls yet" description="Create your first poll to start collecting live votes." />
        ) : (
          <div className="space-y-3">
            {polls.map((poll) => (
              <PollCard key={poll._id} poll={poll} onChange={handlePollChange} onDeleted={handlePollDeleted} />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={pollModalOpen} onClose={() => setPollModalOpen(false)} title="Create a poll">
        <CreatePollForm classId={classId} onCreated={handlePollCreated} onCancel={() => setPollModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default TeacherClassDetail;
