import { useEffect } from 'react';
import { getSocket } from '../services/socket.js';

/**
 * Joins the `class:<classId>` socket room on mount (so this client
 * receives poll:started, poll:ended, question:new/answered, and
 * class:onlineCount events for that class) and leaves it on unmount.
 */
const useClassRoom = (classId) => {
  useEffect(() => {
    if (!classId) return undefined;
    const socket = getSocket();
    if (!socket) return undefined;

    socket.emit('class:join', classId);
    return () => socket.emit('class:leave', classId);
  }, [classId]);
};

export default useClassRoom;
