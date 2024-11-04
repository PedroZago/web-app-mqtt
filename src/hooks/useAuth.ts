import { useContext, useDebugValue } from "react";
import AuthContext, { AuthContextType } from "../context/AuthProvider";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  useDebugValue(context.auth, (auth) =>
    auth?.user ? "Logged In" : "Logged Out"
  );

  return context;
};
