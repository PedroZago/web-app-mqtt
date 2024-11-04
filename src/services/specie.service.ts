import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { SpecieData, SpecieAttributes } from "../models/specie.model";

const API_URL = "/species";

export const useSpecieService = () => {
  const apiPrivate = useAxiosPrivate();

  const fetchSpecies = async (): Promise<SpecieAttributes[]> => {
    const response = await apiPrivate.get(API_URL);
    return response.data;
  };

  const fetchSpecieById = async (id: string): Promise<SpecieAttributes> => {
    const response = await apiPrivate.get(`${API_URL}/${id}`);
    return response.data;
  };

  const createSpecie = async (specie: SpecieData) => {
    await apiPrivate.post(API_URL, specie);
  };

  const updateSpecie = async (specie: SpecieAttributes) => {
    await apiPrivate.put(`${API_URL}/${specie.id}`, specie);
  };

  const deleteSpecie = async (id: string) => {
    await apiPrivate.delete(`${API_URL}/${id}`);
  };

  return {
    fetchSpecies,
    fetchSpecieById,
    createSpecie,
    updateSpecie,
    deleteSpecie,
  };
};
