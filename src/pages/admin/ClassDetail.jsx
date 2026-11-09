import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Radio, MessageCircleQuestion, ChevronDown } from 'lucide-react';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import * as adminService from '../../services/admin.service.js';
import { buildPath, formatRelativeTime, cn, percentage } from '../../utils/helpers.js';
import { ROUTES } from '../../utils/constants.js';

const statusStyles = {
  draft: 'bg-white/5 text-ink-muted',
  live: 'bg-pulse-500/15 text-pulse-400',
  ended: 'bg-brand-500/15 text-brand-300',
};

const PollWithResponses = ({ poll }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card overflow-hidden p-0">
      <button onClick={() => setExpanded((e) => !e)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className={cn('badge capitalize', statusStyles[poll.status])}>{poll.status}</span>
            <span className="text-xs text-ink-faint">{poll.totalVotes} responses</span>
          </div>
          <p className="truncate text-sm font-medium text-ink">{poll.question}</p>
        </div>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-faint transition-transform', expanded && 'rotate-180')} />
      </button>

      {expanded && (
        <div className="border-t border-base-border px-5 py-5">
          {/* Aggregate breakdown, same shape a teacher sees */}
          <div className="mb-5 space-y-2.5">
            {poll.options.map((opt) => {
              const count = poll.responses.filter((r) => r.selectedOptionText === opt.text).length;
              const pct = percentage(count, poll.totalVotes);
              return (
                <div key={opt._id}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-ink-muted">{opt.text}</span>
                    <span className="font-mono text-ink-faint">{count} · {pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Identified responses — admin-only view */}
          {poll.responses.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
                Individual responses (admin view)
              </p>
              <div className="max-h-56 space-y-1.5 overflow-y-auto rounded-lg border border-base-border p-2">
                {poll.responses.map((r, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs hover:bg-white/5">
                    <span className="text-ink">{r.student?.name || 'Deleted student'}</span>
                    <span className="text-ink-muted">{r.selectedOptionText}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AdminClassDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const detail = await adminService.getClassDetail(classId);
        setData(detail);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [classId]);

  if (isLoading || !data) return <LoadingScreen label="Loading class" />;

  const { class: classDoc, polls, questions } = data;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="glass-card mb-8 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-display text-xl text-ink">{classDoc.className}</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Taught by {classDoc.teacherId?.name}{' '}
            <Link
              to={buildPath(ROUTES.ADMIN_USER_ACTIVITY, { userId: classDoc.teacherId?._id })}
              className="text-brand-400 hover:text-brand-300"
            >
              (view activity)
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-ink-faint">
          <span className="code-chip text-sm">{classDoc.classCode}</span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {classDoc.studentCount} students
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
              <Radio className="h-4 w-4 text-pulse-400" /> Polls ({polls.length})
            </h3>
            {polls.length === 0 ? (
              <EmptyState icon={Radio} title="No polls yet" />
            ) : (
              <div className="space-y-3">
                {polls.map((poll) => (
                  <PollWithResponses key={poll._id} poll={poll} />
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg text-ink">
              <MessageCircleQuestion className="h-4 w-4 text-brand-400" /> Questions ({questions.length})
            </h3>
            {questions.length === 0 ? (
              <EmptyState icon={MessageCircleQuestion} title="No questions yet" />
            ) : (
              <div className="space-y-2.5">
                {questions.map((q) => (
                  <div key={q._id} className="glass-card p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-ink-muted">{q.studentId?.name || 'Deleted student'}</span>
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

        <div>
          <h3 className="mb-4 font-display text-lg text-ink">Roster ({classDoc.students?.length || 0})</h3>
          <div className="space-y-2">
            {(classDoc.students || []).map((s) => (
              <Link
                key={s._id}
                to={buildPath(ROUTES.ADMIN_USER_ACTIVITY, { userId: s._id })}
                className="glass-card flex items-center justify-between p-3.5 transition-colors hover:bg-white/5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{s.name}</p>
                  <p className="truncate text-xs text-ink-faint">{s.email}</p>
                </div>
                <span className={cn('badge shrink-0', s.isActive ? 'bg-pulse-500/15 text-pulse-400' : 'bg-danger-500/15 text-danger-400')}>
                  {s.isActive ? 'Active' : 'Restricted'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClassDetail;
