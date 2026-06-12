import { createContext, useContext, useState } from "react";

export interface AuthUser {
  name: string;
  email: string;
  plan: "free" | "premium";
  registeredAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isRegistered: boolean;
  registerFree: (firstName: string, lastName: string, email: string) => Promise<void>;
  setPremium: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "lexigenz_user_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const registerFree = async (firstName: string, lastName: string, email: string) => {
    try {
      await fetch("/api/register/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initials: firstName.trim(), surname: lastName.trim() }),
      });
    } catch {
      // Non-critical — continue even if API call fails
    }
    const newUser: AuthUser = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim().toLowerCase(),
      plan: "free",
      registeredAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const setPremium = () => {
    if (!user) return;
    const updated: AuthUser = { ...user, plan: "premium" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setUser(updated);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isRegistered: !!user, registerFree, setPremium, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
