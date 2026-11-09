import { useEffect } from 'react';
import { getSocket } from '../services/socket.js';

/**
 * Joins the `poll:<pollId>` room so this client receives poll:voteUpdate
 * and poll:ended events for that specific poll's results screen.
 */
const usePollRoom = (pollId) => {
  useEffect(() => {
    if (!pollId) return undefined;
    const socket = getSocket();
    if (!socket) return undefined;

    socket.emit('poll:join', pollId);
    return () => socket.emit('poll:leave', pollId);
  }, [pollId]);
};

export default usePollRoom;
