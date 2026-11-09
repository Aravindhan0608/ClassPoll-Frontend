import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Radio } from 'lucide-react';
import toast from 'react-hot-toast';
import ClassTabs from '../../components/class/ClassTabs.jsx';
import PollBallot from '../../components/poll/PollBallot.jsx';
import PollResultsBars from '../../components/poll/PollResultsBars.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import useClassRoom from '../../hooks/useClassRoom.js';
import usePollRoom from '../../hooks/usePollRoom.js';
import useSocketEvent from '../../hooks/useSocketEvent.js';
import * as classService from '../../services/class.service.js';
import * as pollService from '../../services/poll.service.js';
import * as voteService from '../../services/vote.service.js';
import { getErrorMessage } from '../../utils/helpers.js';

const StudentActivePoll = () => {
  const { classId } = useParams();
  const [classDoc, setClassDoc] = useState(null);
  const [poll, setPoll] = useState(null);
  const [myVote, setMyVote] = useState(null);
  const [results, setResults] = useState(null);
  const [resultsHidden, setResultsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  useClassRoom(classId);
  usePollRoom(poll?._id);

  const loadResults = useCallback(async (pollId) => {
    try {
      const data = await pollService.getPollResults(pollId);
      setResults(data);
      setResultsHidden(false);
    } catch (error) {
      if (error.response?.status === 403) {
        setResultsHidden(true);
      }
    }
  }, []);

  const loadEverything = useCallback(async () => {
    const [classData, activePoll] = await Promise.all([
      classService.getClassById(classId),
      pollService.getActivePoll(classId),
    ]);
    setClassDoc(classData);
    setPoll(activePoll);

    if (activePoll) {
      const voteStatus = await voteService.getMyVote(activePoll._id);
      setMyVote(voteStatus.vote);
      if (voteStatus.hasVoted) await loadResults(activePoll._id);
    } else {
      setMyVote(null);
      setResults(null);
    }
  }, [classId, loadResults]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await loadEverything();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadEverything]);

  // A new poll just went live in this class.
  useSocketEvent(
    'poll:started',
    (payload) => {
      setPoll(payload.poll);
      setMyVote(null);
      setResults(null);
      setResultsHidden(false);
      toast.success('A new poll just started!');
    },
    [classId]
  );

  // The poll we're watching just ended.
  useSocketEvent(
    'poll:ended',
    (payload) => {
      if (payload.poll._id === poll?._id) {
        setPoll(payload.poll);
        loadResults(payload.poll._id);
      }
    },
    [poll?._id]
  );

  // Live tally as votes come in.
  useSocketEvent(
    'poll:voteUpdate',
    (payload) => {
      if (payload.pollId === poll?._id) {
        setResults((prev) => ({ ...prev, results: payload.results, totalVotes: payload.totalVotes }));
      }
    },
    [poll?._id]
  );

  const handleVote = async (optionId) => {
    setIsVoting(true);
    try {
      await voteService.castVote(poll._id, optionId);
      const voteStatus = await voteService.getMyVote(poll._id);
      setMyVote(voteStatus.vote);
      await loadResults(poll._id);
      toast.success('Vote submitted');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) return <LoadingScreen label="Loading class" />;

  return (
    <div>
      <ClassTabs classId={classId} className={classDoc?.className} />

      {!poll ? (
        <EmptyState
          icon={Radio}
          title="No active poll right now"
          description="Your teacher hasn't started a poll yet. This page updates the moment one goes live."
        />
      ) : (
        <div className="mx-auto max-w-xl">
          <div className="glass-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-pulse-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-pulse-500 animate-pulseRing" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pulse-500" />
                </span>
                {poll.status === 'live' ? 'Live now' : 'Ended'}
              </span>
            </div>
            <h2 className="mb-6 font-display text-xl text-ink">{poll.question}</h2>

            {poll.status === 'live' && !myVote ? (
              <PollBallot poll={poll} onVote={handleVote} isSubmitting={isVoting} />
            ) : results ? (
              <PollResultsBars
                results={results.results}
                totalVotes={results.totalVotes}
                myOptionId={myVote?.selectedOption}
              />
            ) : resultsHidden ? (
              <p className="rounded-lg border border-base-border bg-base-surface px-4 py-6 text-center text-sm text-ink-muted">
                You voted — your teacher hasn't turned on results for this poll yet.
              </p>
            ) : (
              <p className="text-sm text-ink-muted">Loading results…</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentActivePoll;
