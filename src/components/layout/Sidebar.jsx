import { NavLink } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import { cn } from '../../utils/helpers.js';

/**
 * items: [{ label, icon: LucideIcon, to }]
 * roleLabel: shown as a small badge under the logo (e.g. "Student", "Teacher", "Admin")
 */
const Sidebar = ({ items, roleLabel }) => (
  <aside className="hidden w-64 shrink-0 flex-col border-r border-base-border bg-base-surface/40 lg:flex">
    <div className="flex items-center justify-between px-6 py-6">
      <Logo size="sm" />
    </div>
    {roleLabel && (
      <div className="px-6 pb-4">
        <span className="badge bg-white/5 text-ink-muted">{roleLabel}</span>
      </div>
    )}
    <nav className="flex-1 space-y-1 px-3">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-brand-500/15 text-brand-300'
                : 'text-ink-muted hover:bg-white/5 hover:text-ink'
            )
          }
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
