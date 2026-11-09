import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import LivePollMock from '../poll/LivePollMock.jsx';
import { ROUTES } from '../../utils/constants.js';

const AuthLayout = ({ title, subtitle, children, footer }) => (
  <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
    {/* Branding panel */}
    <div className="relative hidden flex-col justify-between overflow-hidden border-r border-base-border p-10 lg:flex">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <Link to={ROUTES.HOME} className="relative z-10">
        <Logo />
      </Link>
      <div className="relative z-10 flex flex-1 items-center justify-center py-12">
        <LivePollMock />
      </div>
      <p className="relative z-10 text-sm text-ink-faint">
        "The first time every student answered at once — that's when I knew lectures had changed."
      </p>
    </div>

    {/* Form panel */}
    <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
      <Link to={ROUTES.HOME} className="mb-10 lg:hidden">
        <Logo />
      </Link>
      <div className="mx-auto w-full max-w-sm">
        <h1 className="font-display text-2xl text-ink sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>}
        <div className="mt-8">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-ink-muted">{footer}</div>}
      </div>
    </div>
  </div>
);

export default AuthLayout;
