import { useEffect } from 'react';
import { getSocket } from '../services/socket.js';

/**
 * Subscribes to a Socket.io event while the component is mounted.
 * Safe to call even before the socket connects — it attaches once the
 * socket instance exists and cleans up automatically on unmount.
 */
const useSocketEvent = (event, handler, deps = []) => {
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !event) return undefined;

    socket.on(event, handler);
    return () => socket.off(event, handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, ...deps]);
};

export default useSocketEvent;
