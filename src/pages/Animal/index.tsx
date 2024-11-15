import { FC, useCallback, useEffect, useState } from "react";
import CRUDPage from "../../components/CRUDPage";
import AnimalForm from "./AnimalForm";
import { AnimalAttributes } from "../../models/animal.model";
import { useAnimalService } from "../../services/animal.service";
import { useSpecieService } from "../../services/specie.service";
import { useBreedService } from "../../services/breed.service";
import moment from "moment";
import { Option } from "../../interfaces/option";
import { AnimalSex, animalSex } from "../../enums/animal-sex.enum";

const AnimalsPage: FC = () => {
  const [animalData, setAnimalData] = useState<AnimalAttributes[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<Option[]>([]);
  const [breedsOptions, setBreedsOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { createAnimal, deleteAnimal, fetchAnimals, updateAnimal } =
    useAnimalService();

  const { fetchSpecies } = useSpecieService();
  const { fetchBreeds } = useBreedService();

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

  const loadBreeds = useCallback(async () => {
    setLoading(true);
    try {
      const breeds = await fetchBreeds();
      setBreedsOptions(breeds);
    } catch (error) {
      console.error("Erro ao carregar raças:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const animalSexOptions: Option[] = Object.entries(AnimalSex).map(
    ([_, value]) => ({
      id: value,
      name: animalSex[value],
    })
  );

  useEffect(() => {
    loadAnimals();
    loadSpecies();
    loadBreeds();
  }, [loadAnimals, loadSpecies, loadBreeds]);

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
        {
          field: "breedId",
          headerName: "Raça",
          renderCell: (params) => params?.row?.breed?.name,
        },
        {
          field: "sex",
          headerName: "Sexo",
          renderCell: (params) => animalSex[params.row.sex] || params.row.sex,
        },
        {
          field: "birthDate",
          headerName: "Data de Nascimento",
          renderCell: (params) =>
            moment.parseZone(params?.row?.birthDate).format("DD/MM/YYYY"),
        },
        { field: "weight", headerName: "Peso (kg)" },
      ]}
      data={animalData}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={(props) => (
        <AnimalForm
          {...props}
          speciesOptions={speciesOptions}
          breedsOptions={breedsOptions}
          animalSexOptions={animalSexOptions}
        />
      )}
      loading={loading}
      hasNecessaryData={
        speciesOptions.length !== 0 || speciesOptions.length !== 0
      }
      messageHasNecessaryData="É necessário realizar o cadastro de espécies e raças antes de cadastrar o animal."
    />
  );
};

export default AnimalsPage;
