import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, History } from 'lucide-react';
import ClassTabs from '../../components/class/ClassTabs.jsx';
import PollResultsBars from '../../components/poll/PollResultsBars.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import * as classService from '../../services/class.service.js';
import * as pollService from '../../services/poll.service.js';
import * as voteService from '../../services/vote.service.js';
import { formatDate, cn } from '../../utils/helpers.js';

const PollHistory = () => {
  const { classId } = useParams();
  const [classDoc, setClassDoc] = useState(null);
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [resultsById, setResultsById] = useState({});

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const [classData, pollList] = await Promise.all([
          classService.getClassById(classId),
          pollService.getPollsForClass(classId),
        ]);
        setClassDoc(classData);
        setPolls(pollList.filter((p) => p.status === 'ended'));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [classId]);

  const toggleExpand = async (pollId) => {
    if (expandedId === pollId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(pollId);

    if (!resultsById[pollId]) {
      try {
        const [resultData, voteData] = await Promise.all([
          pollService.getPollResults(pollId),
          voteService.getMyVote(pollId),
        ]);
        setResultsById((prev) => ({ ...prev, [pollId]: { ...resultData, myVote: voteData.vote } }));
      } catch {
        setResultsById((prev) => ({ ...prev, [pollId]: { hidden: true } }));
      }
    }
  };

  if (isLoading) return <LoadingScreen label="Loading history" />;

  return (
    <div>
      <ClassTabs classId={classId} className={classDoc?.className} />

      {polls.length === 0 ? (
        <EmptyState icon={History} title="No past polls yet" description="Ended polls for this class will show up here." />
      ) : (
        <div className="space-y-3">
          {polls.map((poll) => {
            const isOpen = expandedId === poll._id;
            const data = resultsById[poll._id];
            return (
              <div key={poll._id} className="glass-card overflow-hidden p-0">
                <button
                  onClick={() => toggleExpand(poll._id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{poll.question}</p>
                    <p className="mt-0.5 text-xs text-ink-faint">{formatDate(poll.endTime)}</p>
                  </div>
                  <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-faint transition-transform', isOpen && 'rotate-180')} />
                </button>
                {isOpen && (
                  <div className="border-t border-base-border px-5 py-5">
                    {data?.hidden ? (
                      <p className="text-sm text-ink-muted">Results were not made visible for this poll.</p>
                    ) : data ? (
                      <PollResultsBars results={data.results} totalVotes={data.totalVotes} myOptionId={data.myVote?.selectedOption} />
                    ) : (
                      <p className="text-sm text-ink-muted">Loading…</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PollHistory;
