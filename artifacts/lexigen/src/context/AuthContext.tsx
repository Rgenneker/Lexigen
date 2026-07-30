import { createContext, useContext, useState, useCallback } from "react";

export interface AuthUser {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  plan: "free" | "premium";
  premiumLanguage: string | null;
  registeredAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isRegistered: boolean;
  registerFree: (firstName: string, lastName: string, email: string, password: string, phone: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  setPremium: () => void;
  setPremiumLanguage: (language: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "lexigenz_user_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored) as AuthUser;
      // backfill field for existing sessions
      if (parsed.premiumLanguage === undefined) parsed.premiumLanguage = null;
      return parsed;
    } catch {
      return null;
    }
  });

  const registerFree = async (firstName: string, lastName: string, email: string, password: string, phone: string) => {
    const res = await fetch("/api/register/free", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string };
      throw new Error(body.error ?? "Registration failed");
    }
    const data = await res.json() as { id: number; name: string; email: string; phone: string; plan: string };
    const newUser: AuthUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      plan: "free",
      premiumLanguage: null,
      registeredAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string };
      throw new Error(body.error ?? "Login failed");
    }
    const data = await res.json() as {
      id: number; name: string; email: string; phone?: string;
      plan: string; premiumLanguage: string | null; registeredAt: string;
    };
    const loggedIn: AuthUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      plan: data.plan as "free" | "premium",
      premiumLanguage: data.premiumLanguage ?? null,
      registeredAt: data.registeredAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
    setUser(loggedIn);
  };

  const setPremium = () => {
    if (!user) return;
    const updated: AuthUser = { ...user, plan: "premium" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setUser(updated);
  };

  const setPremiumLanguage = useCallback(async (language: string) => {
    if (!user?.id) return;
    const res = await fetch("/api/user/premium-language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, language }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: string };
      throw new Error(body.error ?? "Failed to save language");
    }
    const updated: AuthUser = { ...user, premiumLanguage: language };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setUser(updated);
  }, [user]);

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isRegistered: !!user, registerFree, login, setPremium, setPremiumLanguage, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
