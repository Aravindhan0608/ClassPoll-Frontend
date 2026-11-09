import { percentage } from '../../utils/helpers.js';

const COLORS = ['bg-brand-500', 'bg-pulse-500', 'bg-amber-500', 'bg-danger-400', 'bg-brand-300', 'bg-pulse-300'];

const PollResultsBars = ({ results, totalVotes, myOptionId }) => (
  <div className="space-y-4">
    {results.map((r, i) => {
      const pct = percentage(r.votes, totalVotes);
      const isMine = myOptionId && r.optionId === myOptionId;
      return (
        <div key={r.optionId}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-ink">
              {r.text}
              {isMine && <span className="badge bg-brand-500/15 px-2 py-0.5 text-[11px] text-brand-300">Your vote</span>}
            </span>
            <span className="font-mono text-ink-muted">
              {r.votes} · {pct}%
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full rounded-full ${COLORS[i % COLORS.length]} transition-all duration-500 ease-out`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      );
    })}
    <p className="pt-1 text-right text-xs text-ink-faint">{totalVotes} total votes</p>
  </div>
);

export default PollResultsBars;
