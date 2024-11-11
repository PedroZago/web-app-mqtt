import { FC, useCallback, useEffect, useState } from "react";
import CRUDPage from "../../components/CRUDPage";
import BreedForm from "./BreedForm";
import { BreedAttributes } from "../../models/breed.model";
import { useBreedService } from "../../services/breed.service";

const BreedsPage: FC = () => {
  const [breedData, setBreedData] = useState<BreedAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { createBreed, deleteBreed, fetchBreeds, updateBreed } =
    useBreedService();

  const loadBreeds = useCallback(async () => {
    setLoading(true);
    try {
      const breeds = await fetchBreeds();
      setBreedData(breeds);
    } catch (error) {
      console.error("Erro ao carregar espécies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBreeds();
  }, [loadBreeds]);

  const handleCreate = async (data: BreedAttributes) => {
    setLoading(true);
    try {
      await createBreed(data);
      loadBreeds();
    } catch (error) {
      console.error("Erro ao criar espécie:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (data: BreedAttributes) => {
    setLoading(true);
    try {
      await updateBreed(data);
      loadBreeds();
    } catch (error) {
      console.error("Erro ao editar espécie:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteBreed(id);
      loadBreeds();
    } catch (error) {
      console.error("Erro ao deletar espécie:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRUDPage
      title="Raça"
      columns={[
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Nome" },
        { field: "description", headerName: "Descrição" },
      ]}
      data={breedData}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={BreedForm}
      loading={loading}
    />
  );
};

export default BreedsPage;
