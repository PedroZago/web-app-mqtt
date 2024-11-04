import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { UserAttributes } from "../models/user.model";
import { loginUser, registerUser } from "../services/auth.service";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  isAuthenticated: () => boolean;
  login: (user: LoginData) => Promise<void>;
  register: (user: RegisterData) => Promise<void>;
  logout: () => void;
}

export interface AuthState {
  accessToken: string;
  user: UserAttributes | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

const initialAuthState: AuthState = {
  accessToken: localStorage.getItem("token") || "",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthState>(initialAuthState);

  useEffect(() => {
    if (auth.accessToken) {
      localStorage.setItem("token", auth.accessToken);
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [auth]);

  const isAuthenticated = () => !!auth.accessToken;

  const login = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      const accessToken = response.accessToken;

      setAuth({
        user: response.user,
        accessToken,
      });

      navigate("/home", { replace: true });
    } catch (error: any) {
      if (!error?.response) {
        console.error("No Server Response");
      } else if (error.response?.status === 400) {
        console.error("Missing Name or Password");
      } else if (error.response?.status === 401) {
        console.error("Unauthorized");
      } else {
        console.error("Login Failed");
      }
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data);
      navigate("/login", { replace: true });
    } catch (error: any) {
      if (!error?.response) {
        console.error("No Server Response");
      } else if (error.response?.status === 409) {
        console.error("Name Taken");
      } else {
        console.error("Registration Failed");
      }
    }
  };

  const logout = () => {
    setAuth({ accessToken: "", user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
