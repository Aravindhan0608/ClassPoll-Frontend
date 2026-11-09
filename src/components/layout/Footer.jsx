import Logo from '../common/Logo.jsx';

const Footer = () => (
  <footer className="border-t border-base-border">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
      <Logo size="sm" />
      <p className="text-sm text-ink-faint">
        © {new Date().getFullYear()} ClassPoll+. Built for classrooms that move fast.
      </p>
    </div>
  </footer>
);

export default Footer;
