export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export const userRole: { [key: string]: string } = {
  [UserRole.USER]: "Usuário",
  [UserRole.ADMIN]: "Administrador",
};
