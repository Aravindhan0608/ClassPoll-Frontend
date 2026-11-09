import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { buildPath } from '../../utils/helpers.js';

const ClassCard = ({ classItem, linkTo, actions }) => (
  <div className="glass-card flex flex-col gap-4 p-6 transition-transform hover:-translate-y-0.5">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="truncate font-display text-lg text-ink">{classItem.className}</h3>
        {classItem.teacherId?.name && (
          <p className="mt-0.5 text-sm text-ink-muted">by {classItem.teacherId.name}</p>
        )}
      </div>
      <span className="code-chip shrink-0">{classItem.classCode}</span>
    </div>

    {classItem.description && (
      <p className="line-clamp-2 text-sm text-ink-muted">{classItem.description}</p>
    )}

    <div className="mt-auto flex items-center justify-between pt-2">
      <span className="flex items-center gap-1.5 text-sm text-ink-faint">
        <Users className="h-4 w-4" /> {classItem.studentCount ?? classItem.students?.length ?? 0} students
      </span>
      {linkTo ? (
        <Link
          to={buildPath(linkTo, { classId: classItem._id })}
          className="flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300"
        >
          Open <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      ) : (
        actions
      )}
    </div>
  </div>
);

export default ClassCard;
