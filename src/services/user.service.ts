import { UserData, UserAttributes } from "../models/user.model";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const API_URL = "/users";

export const useUserService = () => {
  const apiPrivate = useAxiosPrivate();

  const fetchUsers = async (): Promise<UserAttributes[]> => {
    const response = await apiPrivate.get(API_URL);
    return response.data;
  };

  const fetchUserById = async (id: string): Promise<UserAttributes> => {
    const response = await apiPrivate.get(`${API_URL}/${id}`);
    return response.data;
  };

  const fetchMe = async (): Promise<UserAttributes> => {
    const response = await apiPrivate.get(`${API_URL}/me`);
    return response.data;
  };

  const createUser = async (user: UserData) => {
    await apiPrivate.post(API_URL, user);
  };

  const updateUser = async (user: UserAttributes) => {
    await apiPrivate.put(`${API_URL}/${user.id}`, user);
  };

  const deleteUser = async (id: string) => {
    await apiPrivate.delete(`${API_URL}/${id}`);
  };

  return {
    fetchUsers,
    fetchUserById,
    fetchMe,
    createUser,
    updateUser,
    deleteUser,
  };
};
