"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User, UserRole } from "@/types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string, role?: UserRole) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const baseUser: Omit<User, "email" | "name" | "role"> = {
  id: "user-1",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(
    (email: string, _password: string, role: UserRole = "customer") => {
      setUser({
        ...baseUser,
        email,
        name: email.split("@")[0],
        role,
      });
    },
    []
  );

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      signIn,
      signOut,
    }),
    [user, signIn, signOut]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
