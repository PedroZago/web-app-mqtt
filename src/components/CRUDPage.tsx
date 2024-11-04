import { FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import GenericTable, { Column } from "./GenericTable";

interface CRUDPageProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  onCreate: (data: T) => void;
  onEdit: (data: T) => void;
  onDelete: (id: string) => void;
  FormComponent: FC<{
    data?: T | null;
    onSubmit: (data: T) => void;
  }>;
}

const CRUDPage = <T extends { id: string }>({
  title,
  columns,
  data,
  onCreate,
  onEdit,
  onDelete,
  FormComponent,
}: CRUDPageProps<T>) => {
  const [openModal, setOpenModal] = useState<
    "create" | "edit" | "delete" | null
  >(null);
  const [selectedData, setSelectedData] = useState<T | null>(null);

  const handleOpenModal = (type: "create" | "edit" | "delete", data?: T) => {
    setSelectedData(data || null);
    setOpenModal(type);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedData(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal("create")}
      >
        Adicionar Novo
      </Button>
      <GenericTable
        columns={columns}
        data={data}
        onEdit={(data) => handleOpenModal("edit", data)}
        onDelete={(id) =>
          handleOpenModal("delete", data.find((d) => d.id === id)!)
        }
      />

      {/* Modal de Criação e Edição */}
      <Dialog
        open={openModal === "create" || openModal === "edit"}
        onClose={handleCloseModal}
      >
        <DialogTitle>
          {openModal === "create" ? `Adicionar ${title}` : `Editar ${title}`}
        </DialogTitle>
        <DialogContent>
          <FormComponent
            data={selectedData}
            onSubmit={(formData) => {
              if (openModal === "create") {
                onCreate(formData);
              } else {
                onEdit(formData);
              }
              handleCloseModal();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Exclusão */}
      <Dialog open={openModal === "delete"} onClose={handleCloseModal}>
        <DialogTitle>Excluir {title}</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir este item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            color="error"
            onClick={() => {
              if (selectedData) onDelete(selectedData.id);
              handleCloseModal();
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CRUDPage;
