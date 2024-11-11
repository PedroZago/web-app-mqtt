import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { BreedData, BreedAttributes } from "../models/breed.model";

const API_URL = "/breeds";

export const useBreedService = () => {
  const apiPrivate = useAxiosPrivate();

  const fetchBreeds = async (): Promise<BreedAttributes[]> => {
    const response = await apiPrivate.get(API_URL);
    return response.data;
  };

  const fetchBreedById = async (id: string): Promise<BreedAttributes> => {
    const response = await apiPrivate.get(`${API_URL}/${id}`);
    return response.data;
  };

  const createBreed = async (breed: BreedData) => {
    await apiPrivate.post(API_URL, breed);
  };

  const updateBreed = async (breed: BreedAttributes) => {
    await apiPrivate.put(`${API_URL}/${breed.id}`, breed);
  };

  const deleteBreed = async (id: string) => {
    await apiPrivate.delete(`${API_URL}/${id}`);
  };

  return {
    fetchBreeds,
    fetchBreedById,
    createBreed,
    updateBreed,
    deleteBreed,
  };
};
