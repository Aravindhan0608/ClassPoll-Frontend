import { useEffect, useRef, useState } from 'react';
import { Bell, Check, MessageCircleQuestion, Radio, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as notificationService from '../../services/notification.service.js';
import useSocketEvent from '../../hooks/useSocketEvent.js';
import { formatRelativeTime, cn } from '../../utils/helpers.js';

const typeIcon = {
  question: MessageCircleQuestion,
  poll: Radio,
  class: Info,
  system: Info,
};

const NotificationBell = ({ notificationsRoute }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef(null);

  const loadUnreadCount = async () => {
    try {
      const count = await notificationService.getUnreadCount();
      setUnreadCount(count);
    } catch {
      /* non-critical */
    }
  };

  useEffect(() => {
    loadUnreadCount();
  }, []);

  // Live-updates the badge the instant Phase 7's `notification:new` fires,
  // instead of waiting for the next poll or page load.
  useSocketEvent('notification:new', () => {
    setUnreadCount((c) => c + 1);
  });

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleOpen = async () => {
    const next = !open;
    setOpen(next);
    if (next) {
      try {
        const { notifications: list } = await notificationService.getMyNotifications({ limit: 8 });
        setNotifications(list);
      } catch {
        /* non-critical */
      }
    }
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleOpen}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 glass-card p-0 shadow-glass">
          <div className="flex items-center justify-between border-b border-base-border px-4 py-3">
            <span className="text-sm font-medium text-ink">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
              >
                <Check className="h-3.5 w-3.5" /> Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-ink-faint">You're all caught up.</p>
            ) : (
              notifications.map((n) => {
                const Icon = typeIcon[n.type] || Info;
                return (
                  <div
                    key={n._id}
                    className={cn(
                      'flex gap-3 border-b border-base-border/60 px-4 py-3 last:border-0',
                      !n.isRead && 'bg-brand-500/5'
                    )}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-pulse-400" />
                    <div className="min-w-0">
                      <p className="text-sm text-ink">{n.title}</p>
                      <p className="mt-0.5 truncate text-xs text-ink-muted">{n.message}</p>
                      <p className="mt-1 text-[11px] text-ink-faint">{formatRelativeTime(n.createdAt)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {notificationsRoute && (
            <Link
              to={notificationsRoute}
              onClick={() => setOpen(false)}
              className="block border-t border-base-border px-4 py-2.5 text-center text-xs font-medium text-brand-400 hover:text-brand-300"
            >
              View all
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
