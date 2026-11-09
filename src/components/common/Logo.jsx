import { cn } from '../../utils/helpers.js';

const Logo = ({ size = 'md', showWordmark = true, className }) => {
  const dims = { sm: 'h-6 w-6', md: 'h-8 w-8', lg: 'h-10 w-10' };
  const text = { sm: 'text-base', md: 'text-lg', lg: 'text-xl' };

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className={cn('relative flex items-center justify-center rounded-lg bg-brand-gradient', dims[size])}>
        <span className="absolute h-full w-full rounded-lg bg-brand-gradient opacity-40 animate-pulseRing" />
        <span className="relative h-2 w-2 rounded-full bg-white" />
      </div>
      {showWordmark && (
        <span className={cn('font-display font-semibold tracking-tight text-ink', text[size])}>
          ClassPoll<span className="text-pulse-400">+</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
