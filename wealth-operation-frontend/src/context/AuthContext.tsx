/* import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  const setAuth = (userData: any) => {
    setUser(userData);

  };
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; */
import {createContext,useContext,useState} from "react";

export interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setAuth: (user: User | null) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export const AuthProvider = ({children}: any) => {
  const [user, setUser] =useState<User | null>(null);
  const setAuth = (userData: User | null) => {
    setUser(userData);};
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{user,setAuth,logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);