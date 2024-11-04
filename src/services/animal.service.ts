import { AnimalData, AnimalAttributes } from "../models/animal.model";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const API_URL = "/animals";

export const useAnimalService = () => {
  const apiPrivate = useAxiosPrivate();

  const fetchAnimals = async (): Promise<AnimalAttributes[]> => {
    const response = await apiPrivate.get(API_URL);
    return response.data;
  };

  const fetchAnimalById = async (id: string): Promise<AnimalAttributes> => {
    const response = await apiPrivate.get(`${API_URL}/${id}`);
    return response.data;
  };

  const createAnimal = async (animal: AnimalData) => {
    await apiPrivate.post(API_URL, animal);
  };

  const updateAnimal = async (animal: AnimalAttributes) => {
    await apiPrivate.put(`${API_URL}/${animal.id}`, animal);
  };

  const deleteAnimal = async (id: string) => {
    await apiPrivate.delete(`${API_URL}/${id}`);
  };

  return {
    fetchAnimals,
    fetchAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal,
  };
};
