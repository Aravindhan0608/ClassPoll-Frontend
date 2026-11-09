import { Link, NavLink } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import Button from '../common/Button.jsx';
import { ROUTES } from '../../utils/constants.js';

const PublicNavbar = () => (
  <header className="sticky top-0 z-40 border-b border-base-border bg-base/80 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <Link to={ROUTES.HOME}>
        <Logo />
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        <a href="#features" className="text-sm text-ink-muted transition-colors hover:text-ink">
          Features
        </a>
        <a href="#how-it-works" className="text-sm text-ink-muted transition-colors hover:text-ink">
          How it works
        </a>
        <a href="#roles" className="text-sm text-ink-muted transition-colors hover:text-ink">
          For every role
        </a>
      </nav>
      <div className="flex items-center gap-3">
        <NavLink to={ROUTES.LOGIN} className="btn-ghost text-sm">
          Log in
        </NavLink>
        <Link to={ROUTES.REGISTER_STUDENT}>
          <Button size="sm">Get started</Button>
        </Link>
      </div>
    </div>
  </header>
);

export default PublicNavbar;
