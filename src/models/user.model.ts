import { UserRole } from "../enums/user-role.enum";

export interface UserData {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface UserAttributes extends UserData {
  id: string;
}
