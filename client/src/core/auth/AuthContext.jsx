import { createContext, useCallback, useMemo, useState } from "react";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const signedInUser = { email: credentials.email };
      setUser(signedInUser);
      return signedInUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (details) => {
    setIsLoading(true);
    try {
      const registeredUser = { name: `${details.firstName} ${details.lastName}`, email: details.email };
      setUser(registeredUser);
      return registeredUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => setUser(null), []);
  const value = useMemo(() => ({ user, isLoading, isAuthenticated: Boolean(user), login, register, logout }), [user, isLoading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
