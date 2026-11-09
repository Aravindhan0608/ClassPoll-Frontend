import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import { ROUTES } from '../../utils/constants.js';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-base px-6 text-center">
    <div className="relative">
      <span className="absolute inset-0 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full glass">
        <Compass className="h-9 w-9 text-pulse-400" />
      </div>
    </div>
    <div>
      <p className="font-mono text-sm tracking-[0.3em] text-ink-faint">ERROR 404</p>
      <h1 className="mt-2 font-display text-4xl text-ink">This page didn't get a majority vote.</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-muted">
        The page you're looking for doesn't exist, moved, or was archived by its teacher.
      </p>
    </div>
    <Link to={ROUTES.HOME}>
      <Button>Back to safety</Button>
    </Link>
  </div>
);

export default NotFound;
