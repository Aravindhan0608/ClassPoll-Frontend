import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants.js';

let socket = null;

/**
 * Creates (or returns the existing) authenticated socket connection.
 * Auth relies on the httpOnly `accessToken` cookie riding along with the
 * handshake request (`withCredentials: true`) — the frontend never has
 * direct read access to that cookie, and shouldn't need to.
 */
export const connectSocket = () => {
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: true,
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
