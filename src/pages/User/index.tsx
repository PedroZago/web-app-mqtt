import { FC, useCallback, useEffect, useState } from "react";
import CRUDPage from "../../components/CRUDPage";
import UserForm from "./UserForm";
import { UserAttributes } from "../../models/user.model";
import { useUserService } from "../../services/user.service";
import moment from "moment";
import { userRole, UserRole } from "../../enums/user-role.enum";

const UsersPage: FC = () => {
  const [userData, setUserData] = useState<UserAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { createUser, deleteUser, fetchUsers, updateUser } = useUserService();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const users = await fetchUsers();
      setUserData(users);
    } catch (error) {
      console.error("Erro ao carregar animais:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const userRoleOptions: { id: string; name: string }[] = Object.entries(
    UserRole
  ).map(([_, value]) => ({
    id: value,
    name: userRole[value],
  }));

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreate = async (data: UserAttributes) => {
    setLoading(true);
    try {
      await createUser(data);
      loadUsers();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (data: UserAttributes) => {
    setLoading(true);
    try {
      await updateUser(data);
      loadUsers();
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRUDPage
      title="Usuário"
      columns={[
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Nome" },
        { field: "email", headerName: "E-mail" },
        {
          field: "role",
          headerName: "Função",
          renderCell: (params) => userRole[params.row.role] || params.row.role,
        },
      ]}
      data={userData}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={(props) => (
        <UserForm {...props} userRoleOptions={userRoleOptions} />
      )}
      loading={loading}
    />
  );
};

export default UsersPage;
