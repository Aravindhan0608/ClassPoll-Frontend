import { cn } from '../../utils/helpers.js';

export const Spinner = ({ className }) => (
  <div
    className={cn(
      'h-5 w-5 rounded-full border-2 border-white/20 border-t-brand-400 animate-spin',
      className
    )}
  />
);

const LoadingScreen = ({ label = 'Loading ClassPoll+' }) => (
  <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-base">
    <div className="relative flex h-14 w-14 items-center justify-center">
      <span className="absolute inline-flex h-full w-full rounded-full bg-brand-500/40 animate-pulseRing" />
      <span className="relative inline-flex h-8 w-8 rounded-full bg-brand-gradient" />
    </div>
    <p className="text-sm text-ink-muted">{label}</p>
  </div>
);

export default LoadingScreen;
