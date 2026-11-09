import { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '../common/Button.jsx';
import { cn } from '../../utils/helpers.js';

const PollBallot = ({ poll, onVote, isSubmitting }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="space-y-2.5">
        {poll.options.map((opt) => (
          <button
            key={opt._id}
            type="button"
            onClick={() => setSelected(opt._id)}
            className={cn(
              'flex w-full items-center justify-between rounded-lg border px-4 py-3.5 text-left text-sm transition-colors',
              selected === opt._id
                ? 'border-brand-500 bg-brand-500/10 text-ink'
                : 'border-base-border bg-base-surface text-ink-muted hover:border-white/20'
            )}
          >
            {opt.text}
            {selected === opt._id && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500">
                <Check className="h-3.5 w-3.5 text-white" />
              </span>
            )}
          </button>
        ))}
      </div>
      <Button
        className="mt-5 w-full"
        disabled={!selected}
        isLoading={isSubmitting}
        onClick={() => onVote(selected)}
      >
        Submit vote
      </Button>
    </div>
  );
};

export default PollBallot;
