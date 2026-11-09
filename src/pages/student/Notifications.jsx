import { useEffect, useState } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingScreen from '../../components/common/LoadingScreen.jsx';
import Button from '../../components/common/Button.jsx';
import * as notificationService from '../../services/notification.service.js';
import { formatRelativeTime, cn } from '../../utils/helpers.js';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    const { notifications: list } = await notificationService.getMyNotifications({ limit: 50 });
    setNotifications(list);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await load();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleMarkRead = async (id) => {
    await notificationService.markAsRead(id);
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
  };

  const handleDelete = async (id) => {
    await notificationService.deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  if (isLoading) return <LoadingScreen label="Loading notifications" />;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-end">
        <Button variant="secondary" size="sm" onClick={handleMarkAllRead}>
          <Check className="h-4 w-4" /> Mark all read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
      ) : (
        <div className="space-y-2.5">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={cn('glass-card flex items-start justify-between gap-4 p-4', !n.isRead && 'border-brand-500/30')}
            >
              <div className="min-w-0">
                <p className="text-sm text-ink">{n.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{n.message}</p>
                <p className="mt-1.5 text-xs text-ink-faint">{formatRelativeTime(n.createdAt)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkRead(n._id)}
                    className="rounded-lg p-1.5 text-ink-faint hover:bg-white/5 hover:text-pulse-400"
                    aria-label="Mark as read"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n._id)}
                  className="rounded-lg p-1.5 text-ink-faint hover:bg-white/5 hover:text-danger-400"
                  aria-label="Delete notification"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
