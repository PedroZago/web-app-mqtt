import { FC, useCallback, useEffect, useState } from "react";
import CRUDPage from "../../components/CRUDPage";
import SpecieForm from "./SpecieForm";
import { SpecieAttributes } from "../../models/specie.model";
import { useSpecieService } from "../../services/specie.service";

const SpeciesPage: FC = () => {
  const [specieData, setSpecieData] = useState<SpecieAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { createSpecie, deleteSpecie, fetchSpecies, updateSpecie } =
    useSpecieService();

  const loadSpecies = useCallback(async () => {
    setLoading(true);
    try {
      const species = await fetchSpecies();
      setSpecieData(species);
    } catch (error) {
      console.error("Erro ao carregar espécies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSpecies();
  }, [loadSpecies]);

  const handleCreate = async (data: SpecieAttributes) => {
    setLoading(true);
    try {
      await createSpecie(data);
      loadSpecies();
    } catch (error) {
      console.error("Erro ao criar espécie:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (data: SpecieAttributes) => {
    setLoading(true);
    try {
      await updateSpecie(data);
      loadSpecies();
    } catch (error) {
      console.error("Erro ao editar espécie:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteSpecie(id);
      loadSpecies();
    } catch (error) {
      console.error("Erro ao deletar espécie:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRUDPage
      title="Espécie"
      columns={[
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Nome" },
        { field: "description", headerName: "Descrição" },
      ]}
      data={specieData}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
      FormComponent={SpecieForm}
      loading={loading}
    />
  );
};

export default SpeciesPage;
