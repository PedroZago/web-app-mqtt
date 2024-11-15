import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserAttributes } from "../models/user.model";
import { loginUser, registerUser } from "../services/auth.service";
import { AxiosError } from "axios";
import { Snackbar, Alert } from "@mui/material";
import { UserRole } from "../enums/user-role.enum";

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
  isAdminUser: () => boolean;
  saveUserData: (accessToken: string, user: UserAttributes) => void;
}

export interface AuthState {
  accessToken: string;
  user: UserAttributes | null;
}

interface DecodedToken {
  exp: number;
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

const handleAuthError = (error: AxiosError, action: string) => {
  if (!error?.response) {
    console.error(`${action} - No Server Response`);
  } else if (error.response?.status === 400) {
    console.error(`${action} - Bad Request`);
  } else if (error.response?.status === 401) {
    console.error(`${action} - Unauthorized`);
  } else if (error.response?.status === 409) {
    console.error(`${action} - Conflict`);
  } else {
    console.error(`${action} - Failed`);
  }
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Invalid token: " + error);
    return true;
  }
};

const navigateTo = (navigate: ReturnType<typeof useNavigate>, path: string) => {
  navigate(path, { replace: true });
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthState>(initialAuthState);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const isAuthenticated = () =>
    !!auth.accessToken && !isTokenExpired(auth.accessToken);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const saveUserData = (accessToken: string, user: UserAttributes) => {
    setAuth({
      accessToken,
      user,
    });

    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const login = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      const accessToken = response.accessToken;

      if (isTokenExpired(accessToken)) {
        throw new Error("Token expired");
      }

      saveUserData(accessToken, response.user);

      showSnackbar("Login realizado com sucesso!", "success");
      navigateTo(navigate, "/home");
    } catch (error: any) {
      handleAuthError(error, "Login");
      showSnackbar("Falha ao realizar login.", "error");
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data);
      showSnackbar(
        "Cadastro realizado com sucesso! Por favor faça login agora.",
        "success"
      );
      navigateTo(navigate, "/login");
    } catch (error: any) {
      handleAuthError(error, "Cadastro");
      showSnackbar("Falha ao realizar cadastro.", "error");
    }
  };

  const isAdminUser = (): boolean => {
    try {
      if (!auth.accessToken) {
        logout();
        return false;
      }

      const isAdminRole = auth.user?.role === UserRole.ADMIN;
      return isAdminRole;
    } catch (error: any) {
      showSnackbar(`Erro ao obter a role do usuário: ${error}`, error);
      return false;
    }
  };

  const logout = useCallback(() => {
    setAuth({ accessToken: "", user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showSnackbar("Você foi desconectado.", "info");
    navigateTo(navigate, "/login");
  }, [navigate]);

  useEffect(() => {
    if (auth.accessToken && isTokenExpired(auth.accessToken)) {
      logout();
    }
  }, [auth.accessToken, logout]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isAuthenticated,
        login,
        register,
        logout,
        isAdminUser,
        saveUserData,
      }}
    >
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export default AuthContext;
