import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as authService from '../services/auth.service.js';
import { connectSocket, disconnectSocket } from '../services/socket.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, ask the API who (if anyone) the accessToken cookie
  // belongs to, so a page refresh doesn't bounce a logged-in user to /login.
  useEffect(() => {
    (async () => {
      try {
        const currentUser = await authService.getMe();
        setUser(currentUser);
        connectSocket();
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (payload) => {
    const { user: loggedInUser } = await authService.login(payload);
    setUser(loggedInUser);
    connectSocket();
    return loggedInUser;
  }, []);

  const registerStudent = useCallback(async (payload) => {
    const { user: newUser } = await authService.registerStudent(payload);
    setUser(newUser);
    connectSocket();
    return newUser;
  }, []);

  const registerTeacher = useCallback(async (payload) => {
    const { user: newUser } = await authService.registerTeacher(payload);
    setUser(newUser);
    connectSocket();
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      disconnectSocket();
    }
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    registerStudent,
    registerTeacher,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
