export const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '—';
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffSec = Math.round(diffMs / 1000);
  if (diffSec < 60) return 'just now';
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(dateString);
};

export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');

export const percentage = (part, total) => {
  if (!total) return 0;
  return Math.round((part / total) * 100);
};

export const cn = (...classes) => classes.filter(Boolean).join(' ');

/** Fills in `:param` placeholders in a route template, e.g. buildPath(ROUTES.TEACHER_POLL_RESULTS, { pollId }) */
export const buildPath = (route, params = {}) =>
  Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, value), route);

/** Extracts a friendly message from an axios error, falling back gracefully. */
export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';
