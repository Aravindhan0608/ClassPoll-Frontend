import { useEffect, useState } from 'react';
import { Radio } from 'lucide-react';

const OPTIONS = [
  { label: 'Photosynthesis', color: 'bg-brand-500' },
  { label: 'Cellular respiration', color: 'bg-pulse-500' },
  { label: 'Osmosis', color: 'bg-amber-500' },
];

// Cycles through a few plausible vote distributions so the hero mockup
// feels like a poll that's actually collecting live votes, not a static image.
const FRAMES = [
  [12, 4, 2],
  [18, 9, 3],
  [24, 15, 6],
  [31, 19, 8],
  [31, 22, 12],
];

const LivePollMock = () => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAMES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const votes = FRAMES[frameIndex];
  const total = votes.reduce((a, b) => a + b, 0);

  return (
    <div className="glass-card w-full max-w-md p-6 animate-floatSlow">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-pulse-500 animate-pulseRing" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pulse-500" />
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-pulse-400">Live</span>
        </div>
        <div className="flex items-center gap-1.5 text-ink-faint">
          <Radio className="h-3.5 w-3.5" />
          <span className="text-xs">{total} votes</span>
        </div>
      </div>

      <p className="mb-5 font-display text-lg text-ink">
        Which process releases energy from glucose?
      </p>

      <div className="space-y-3">
        {OPTIONS.map((opt, i) => {
          const pct = total ? Math.round((votes[i] / total) * 100) : 0;
          return (
            <div key={opt.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-ink-muted">{opt.label}</span>
                <span className="font-mono text-ink-faint">{pct}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full ${opt.color} transition-all duration-700 ease-out`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LivePollMock;
