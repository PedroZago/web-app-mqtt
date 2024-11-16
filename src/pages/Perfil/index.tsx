import { FC, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
  Divider,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import PerfilForm from "./PerfilForm";
import { UserAttributes } from "../../models/user.model";
import { userRole } from "../../enums/user-role.enum";
import SidebarLayout from "../../components/SidebarLayout";
import CloseIcon from "@mui/icons-material/Close";
import { useUserService } from "../../services/user.service";

const ProfilePage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const { auth, saveUserData } = useAuth();

  const { updateUser, fetchMe } = useUserService();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = async (data: UserAttributes) => {
    setLoading(true);
    try {
      await updateUser(data);

      const user = await fetchMe();

      saveUserData(auth.accessToken, user);
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  return (
    <SidebarLayout title="Perfil do Usuário">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar alt={auth.user?.name} sx={{ width: 120, height: 120, mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {auth.user?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          {userRole[auth.user?.role || ""] || "Cargo não definido"}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Detalhes do Perfil
        </Typography>

        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Nome:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {auth?.user?.name}
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Email:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {auth?.user?.email}
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Cargo:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {userRole[auth?.user?.role || ""] || "Cargo não definido"}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ":hover": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            Editar Perfil
          </Button>
        </Box>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 24,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
          Editar Perfil
        </DialogTitle>
        <DialogContent>
          {auth && <PerfilForm data={auth.user} onSubmit={handleSubmit} />}
        </DialogContent>
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

export default ProfilePage;
