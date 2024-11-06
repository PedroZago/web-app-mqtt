import { FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import GenericTable, { Column } from "./GenericTable";
import SidebarLayout from "./SidebarLayout";

interface CRUDPageProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  onCreate?: (data: T) => void;
  onEdit?: (data: T) => void;
  onDelete?: (id: string) => void;
  FormComponent?: FC<{
    data?: T | null;
    onSubmit: (data: T) => void;
  }>;
  loading: boolean;
}

const CRUDPage = <T extends { id: string }>({
  title,
  columns,
  data,
  onCreate,
  onEdit,
  onDelete,
  FormComponent,
  loading,
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
    <SidebarLayout title={title}>
      {!!onCreate && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal("create")}
        >
          Adicionar Novo
        </Button>
      )}
      <GenericTable
        columns={columns}
        data={data}
        onEdit={onEdit ? (data) => handleOpenModal("edit", data) : undefined}
        onDelete={
          onDelete
            ? (id) => handleOpenModal("delete", data.find((d) => d.id === id)!)
            : undefined
        }
      />
      {!!FormComponent && (openModal === "create" || openModal === "edit") && (
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
                if (openModal === "create" && onCreate) onCreate(formData);
                else if (openModal === "edit" && onEdit) onEdit(formData);
                handleCloseModal();
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      )}
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
              if (selectedData && !!onDelete) onDelete(selectedData.id);
              handleCloseModal();
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </SidebarLayout>
  );
};

export default CRUDPage;
