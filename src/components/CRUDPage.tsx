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
  Card,
  CardContent,
} from "@mui/material";
import GenericTable, { Column } from "./GenericTable";
import SidebarLayout from "./SidebarLayout";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

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
  hasNecessaryData?: boolean;
  messageHasNecessaryData?: string;
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
  hasNecessaryData = true,
  messageHasNecessaryData,
}: CRUDPageProps<T>) => {
  const [openModal, setOpenModal] = useState<
    "create" | "edit" | "delete" | null
  >(null);
  const [selectedData, setSelectedData] = useState<T | null>(null);

  const { isAdminUser } = useAuth();

  const navigate = useNavigate();

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
      <Card
        variant="outlined"
        sx={{
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        <CardContent>
          {!!onCreate && isAdminUser() && (
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
            onEdit={
              onEdit ? (data) => handleOpenModal("edit", data) : undefined
            }
            onDelete={
              onDelete
                ? (id) =>
                    handleOpenModal("delete", data.find((d) => d.id === id)!)
                : undefined
            }
          />
          {!!FormComponent &&
            (openModal === "create" || openModal === "edit") && (
              <Dialog
                open={openModal === "create" || openModal === "edit"}
                onClose={handleCloseModal}
              >
                <DialogTitle>
                  {openModal === "create"
                    ? `Adicionar ${title}`
                    : `Editar ${title}`}
                </DialogTitle>
                <DialogContent>
                  <FormComponent
                    data={selectedData}
                    onSubmit={(formData) => {
                      const dataToSubmit =
                        openModal === "create"
                          ? { ...formData, id: undefined }
                          : formData;

                      if (openModal === "create" && onCreate)
                        onCreate(dataToSubmit);
                      else if (openModal === "edit" && onEdit)
                        onEdit(dataToSubmit);
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

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!loading && !hasNecessaryData}
          >
            <Card
              variant="outlined"
              sx={{
                padding: 4,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "#fff",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6">{messageHasNecessaryData}</Typography>

              <CustomButton
                label="Voltar"
                variant="contained"
                color="primary"
                sx={{ my: 2, padding: "8px 16px" }}
                onClick={() => navigate("/home")}
              />
            </Card>
          </Backdrop>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
};

export default CRUDPage;
