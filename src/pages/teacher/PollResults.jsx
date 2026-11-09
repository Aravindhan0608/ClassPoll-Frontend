import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Square } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button.jsx';
import PollResultsBars from '../../components/poll/PollResultsBars.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import usePollRoom from '../../hooks/usePollRoom.js';
import useSocketEvent from '../../hooks/useSocketEvent.js';
import * as pollService from '../../services/poll.service.js';
import { getErrorMessage } from '../../utils/helpers.js';

const TeacherPollResults = () => {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  usePollRoom(pollId);

  const load = useCallback(async () => {
    const [pollData, resultData] = await Promise.all([
      pollService.getPollById(pollId),
      pollService.getPollResults(pollId),
    ]);
    setPoll(pollData);
    setResults(resultData);
  }, [pollId]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await load();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [load]);

  useSocketEvent(
    'poll:voteUpdate',
    (payload) => {
      if (payload.pollId === pollId) {
        setResults((prev) => ({ ...prev, results: payload.results, totalVotes: payload.totalVotes }));
      }
    },
    [pollId]
  );

  useSocketEvent(
    'poll:ended',
    (payload) => {
      if (payload.poll._id === pollId) setPoll(payload.poll);
    },
    [pollId]
  );

  const handleEnd = async () => {
    try {
      const updated = await pollService.endPoll(pollId);
      setPoll(updated);
      toast.success('Poll ended');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading || !poll || !results) return <LoadingScreen label="Loading results" />;

  return (
    <div className="mx-auto max-w-2xl">
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="glass-card p-6">
        <div className="mb-5 flex items-center justify-between">
          <span
            className={`badge ${poll.status === 'live' ? 'bg-pulse-500/15 text-pulse-400' : 'bg-brand-500/15 text-brand-300'} capitalize`}
          >
            {poll.status === 'live' && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-pulse-500 animate-pulseRing" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pulse-500" />
              </span>
            )}
            {poll.status}
          </span>
          {poll.status === 'live' && (
            <Button size="sm" variant="danger" onClick={handleEnd}>
              <Square className="h-3.5 w-3.5" /> End poll
            </Button>
          )}
        </div>
        <h2 className="mb-6 font-display text-xl text-ink">{poll.question}</h2>
        <PollResultsBars results={results.results} totalVotes={results.totalVotes} />
      </div>
    </div>
  );
};

export default TeacherPollResults;
