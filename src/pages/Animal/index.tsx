import { FC, useCallback, useEffect, useState } from "react";
import CRUDPage from "../../components/CRUDPage";
import AnimalForm from "./AnimalForm";
import { AnimalAttributes } from "../../models/animal.model";
import { useAnimalService } from "../../services/animal.service";
import { useSpecieService } from "../../services/specie.service";
import moment from "moment";

const AnimalsPage: FC = () => {
  const [animalData, setAnimalData] = useState<AnimalAttributes[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { createAnimal, deleteAnimal, fetchAnimals, updateAnimal } =
    useAnimalService();

  const { fetchSpecies } = useSpecieService();

  const loadAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const animals = await fetchAnimals();
      setAnimalData(animals);
    } catch (error) {
      console.error("Erro ao carregar animais:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSpecies = useCallback(async () => {
    setLoading(true);
    try {
      const species = await fetchSpecies();
      setSpeciesOptions(species);
    } catch (error) {
      console.error("Erro ao carregar espécies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnimals();
    loadSpecies();
  }, [loadAnimals, loadSpecies]);

  const handleCreate = async (data: AnimalAttributes) => {
    setLoading(true);
    try {
      await createAnimal(data);
      loadAnimals();
    } catch (error) {
      console.error("Erro ao criar animal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (data: AnimalAttributes) => {
    setLoading(true);
    try {
      await updateAnimal(data);
      loadAnimals();
    } catch (error) {
      console.error("Erro ao editar animal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteAnimal(id);
      loadAnimals();
    } catch (error) {
      console.error("Erro ao deletar animal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRUDPage
      title="Animal"
      columns={[
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Nome" },
        {
          field: "specieId",
          headerName: "Espécie",
          renderCell: (params) => params?.row?.specie?.name,
        },
        { field: "breed", headerName: "Raça" },
        {
          field: "birthDate",
          headerName: "Data de Nascimento",
          renderCell: (params) =>
            moment(params?.row?.birthDate).format("DD/MM/YYYY"),
        },
        { field: "weight", headerName: "Peso (kg)" },
      ]}
      data={animalData}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={(props) => (
        <AnimalForm {...props} speciesOptions={speciesOptions} />
      )}
      loading={loading}
    />
  );
};

export default AnimalsPage;
