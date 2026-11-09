import { Link } from 'react-router-dom';
import { Play, Square, Trash2, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../common/Button.jsx';
import { buildPath, getErrorMessage, formatDate } from '../../utils/helpers.js';
import { ROUTES } from '../../utils/constants.js';
import * as pollService from '../../services/poll.service.js';

const statusStyles = {
  draft: 'bg-white/5 text-ink-muted',
  live: 'bg-pulse-500/15 text-pulse-400',
  ended: 'bg-brand-500/15 text-brand-300',
};

const PollCard = ({ poll, onChange, onDeleted }) => {
  const handleStart = async () => {
    try {
      const updated = await pollService.startPoll(poll._id);
      onChange?.(updated);
      toast.success('Poll is live');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleEnd = async () => {
    try {
      const updated = await pollService.endPoll(poll._id);
      onChange?.(updated);
      toast.success('Poll ended');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    try {
      await pollService.deletePoll(poll._id);
      onDeleted?.(poll._id);
      toast.success('Draft deleted');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="glass-card flex items-center justify-between gap-4 p-5">
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <span className={`badge ${statusStyles[poll.status]} capitalize`}>{poll.status}</span>
          {poll.status === 'ended' && <span className="text-xs text-ink-faint">{formatDate(poll.endTime)}</span>}
        </div>
        <p className="truncate text-sm font-medium text-ink">{poll.question}</p>
        <p className="mt-0.5 text-xs text-ink-faint">{poll.options.length} options</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {poll.status === 'draft' && (
          <>
            <Button size="sm" onClick={handleStart}>
              <Play className="h-3.5 w-3.5" /> Start
            </Button>
            <button
              onClick={handleDelete}
              className="rounded-lg p-2 text-ink-faint hover:bg-white/5 hover:text-danger-400"
              aria-label="Delete draft"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
        {poll.status === 'live' && (
          <Button size="sm" variant="danger" onClick={handleEnd}>
            <Square className="h-3.5 w-3.5" /> End
          </Button>
        )}
        {(poll.status === 'live' || poll.status === 'ended') && (
          <Link to={buildPath(ROUTES.TEACHER_POLL_RESULTS, { pollId: poll._id })}>
            <Button size="sm" variant="secondary">
              <BarChart3 className="h-3.5 w-3.5" /> Results
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PollCard;
