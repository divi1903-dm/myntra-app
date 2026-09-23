import { createContext, useContext, useEffect, useState } from "react";
import {
  clearUserData,
  getStore,
  getUserData,
  saveUserData,
  setStore,
} from "@/utils/storage";
import React from "react";
import axios from "axios";

type AuthUser = { _id: string; name: string; email: string; method?: string };

type LocalAccount = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  ready: boolean;
  user: AuthUser | null;
  Signup: (fullName: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const ACCOUNTS_KEY = "local_accounts";
const API = "https://myntra-clone-xj36.onrender.com";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const persistUser = async (next: AuthUser) => {
    await saveUserData(next._id, next.name, next.email, next.method || "email");
    setUser(next);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    (async () => {
      const data = await getUserData();
      if (data._id && data.name && data.email) {
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          method: data.method || "email",
        });
        setIsAuthenticated(true);
      }
      setReady(true);
    })();
  }, []);

  const getAccounts = async (): Promise<LocalAccount[]> => {
    const raw = await getStore(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const login = async (email: string, password: string) => {
    const accounts = await getAccounts();
    const local = accounts.find(
      (account) => account.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (local) {
      if (local.password !== password) {
        throw new Error("Invalid password");
      }
      await persistUser({
        _id: local._id,
        name: local.fullName,
        email: local.email,
        method: "email",
      });
      return;
    }

    try {
      const res = await axios.post(`${API}/user/login`, { email, password });
      const data = res.data.user;
      const name = data.fullName || data.name;
      if (!name) throw new Error(data.message || "Login failed");
      await persistUser({
        _id: data._id,
        name,
        email: data.email,
        method: "email",
      });
    } catch (error: any) {
      if (error?.message === "Invalid password") throw error;
      throw new Error("Invalid email or password");
    }
  };

  const Signup = async (fullName: string, email: string, password: string) => {
    const accounts = await getAccounts();
    const exists = accounts.find(
      (account) => account.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) throw new Error("User already exists");

    const localUser: LocalAccount = {
      _id: `local-${Date.now()}`,
      fullName,
      email: email.trim().toLowerCase(),
      password,
    };
    await setStore(ACCOUNTS_KEY, JSON.stringify([...accounts, localUser]));

    try {
      await axios.post(`${API}/user/signup`, { fullName, email, password });
    } catch {
      // Local signup still works if the remote API is down.
    }

    await persistUser({
      _id: localUser._id,
      name: fullName,
      email: localUser.email,
      method: "email",
    });
  };

  const loginWithGoogle = async () => {
    await persistUser({
      _id: "google-demo-user",
      name: "Google Shopper",
      email: "google.shopper@gmail.com",
      method: "google",
    });
  };

  const logout = async () => {
    await clearUserData();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        ready,
        user,
        Signup,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
