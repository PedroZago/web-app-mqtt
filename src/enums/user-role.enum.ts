export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  EDITOR = "editor",
}

export const userRole: { [key: string]: string } = {
  [UserRole.USER]: "Usuário",
  [UserRole.ADMIN]: "Administrador",
  [UserRole.EDITOR]: "Editor",
};
