import { NavLink } from 'react-router-dom';
import { buildPath, cn } from '../../utils/helpers.js';
import { ROUTES } from '../../utils/constants.js';

const ClassTabs = ({ classId, className }) => {
  const tabs = [
    { label: 'Active Poll', to: buildPath(ROUTES.STUDENT_ACTIVE_POLL, { classId }) },
    { label: 'History', to: buildPath(ROUTES.STUDENT_POLL_HISTORY, { classId }) },
    { label: 'Questions', to: buildPath(ROUTES.STUDENT_QUESTIONS, { classId }) },
  ];

  return (
    <div className="mb-6">
      {className && <h2 className="mb-4 font-display text-xl text-ink">{className}</h2>}
      <div className="flex w-fit gap-1 rounded-lg border border-base-border bg-base-surface p-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              cn(
                'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                isActive ? 'bg-brand-gradient text-white' : 'text-ink-muted hover:text-ink'
              )
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ClassTabs;
