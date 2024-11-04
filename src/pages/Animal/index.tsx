import { FC, useEffect, useState } from "react";
import CRUDPage from "../../components/CRUDPage";
import AnimalForm from "./AnimalForm";
import { AnimalAttributes } from "../../models/animal.model";
import {
  fetchAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  fetchSpecies, // Novo: Função para buscar espécies
} from "../../services/animal.service";

const AnimalsPage: FC = () => {
  const [animalData, setAnimalData] = useState<AnimalAttributes[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega a lista de animais
  const loadAnimals = async () => {
    setLoading(true);
    try {
      const animals = await fetchAnimals();
      setAnimalData(animals);
    } catch (error) {
      console.error("Erro ao carregar animais:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega a lista de espécies
  const loadSpecies = async () => {
    try {
      const species = await fetchSpecies();
      setSpeciesOptions(species);
    } catch (error) {
      console.error("Erro ao carregar espécies:", error);
    }
  };

  useEffect(() => {
    loadAnimals();
    loadSpecies();
  }, []);

  const handleCreate = async (data: AnimalAttributes) => {
    try {
      await createAnimal(data);
      loadAnimals();
    } catch (error) {
      console.error("Erro ao criar animal:", error);
    }
  };

  const handleEdit = async (data: AnimalAttributes) => {
    try {
      await updateAnimal(data);
      loadAnimals();
    } catch (error) {
      console.error("Erro ao editar animal:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAnimal(id);
      loadAnimals();
    } catch (error) {
      console.error("Erro ao deletar animal:", error);
    }
  };

  return (
    <CRUDPage
      title="Animais"
      columns={[
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Nome" },
        { field: "specie", headerName: "Espécie" },
        { field: "breed", headerName: "Raça" },
        { field: "birthDate", headerName: "Data de Nascimento" },
        { field: "weight", headerName: "Peso (kg)" },
      ]}
      data={animalData}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={(props) => (
        <AnimalForm {...props} speciesOptions={speciesOptions} />
      )}
      // loading={loading}
    />
  );
};

export default AnimalsPage;
