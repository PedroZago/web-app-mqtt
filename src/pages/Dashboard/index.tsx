import { FC, useCallback, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Box,
  Stepper,
  Step,
  StepLabel,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import SidebarLayout from "../../components/SidebarLayout";
import { userRole } from "../../enums/user-role.enum";
import { Link } from "react-router-dom";
import { useNotificationService } from "../../services/notification.service";

const DashboardPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<number>(0);

  const { auth } = useAuth();

  const { fetchNotifications } = useNotificationService();

  const steps = [
    "Cadastrar espécies e raças de animais",
    "Cadastrar animais",
    "Cadastrar dispositivos",
    "Acompanhar as telemetrias",
  ];

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const notifications = await fetchNotifications();

      const readCount = notifications.reduce(
        (count, notification) => (notification.read ? count + 1 : count),
        0
      );

      setNotifications(readCount);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <SidebarLayout title="Bem-vindo">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Avatar alt={auth.user?.name} sx={{ width: 56, height: 56 }} />
            <Box ml={2}>
              <Typography variant="h5">
                Bem-vindo, {auth.user?.name}!
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {auth.user?.role && userRole[auth.user?.role]
                  ? `Cargo de ${userRole[auth.user?.role]}`
                  : "Cargo não definido"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Instruções da plataforma
              </Typography>
              <Typography variant="h6" gutterBottom>
                Siga os passos abaixo para começar:
              </Typography>
              <Stepper activeStep={-1} alternativeLabel>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel>
                      {step}
                      {index === 0 && (
                        <Box
                          display="flex"
                          justifyContent="center"
                          mt={2}
                          gap={1}
                        >
                          <Link to="/species">
                            <Button variant="outlined" size="small">
                              Espécies
                            </Button>
                          </Link>
                          <Link to="/breeds">
                            <Button variant="outlined" size="small">
                              Raças
                            </Button>
                          </Link>
                        </Box>
                      )}
                      {index === 1 && (
                        <Box display="flex" justifyContent="center" mt={2}>
                          <Link to="/animals">
                            <Button variant="outlined" size="small">
                              Animais
                            </Button>
                          </Link>
                        </Box>
                      )}
                      {index === 2 && (
                        <Box display="flex" justifyContent="center" mt={2}>
                          <Link to="/devices">
                            <Button variant="outlined" size="small">
                              Dispositivos
                            </Button>
                          </Link>
                        </Box>
                      )}
                      {index === 3 && (
                        <Box display="flex" justifyContent="center" mt={2}>
                          <Link to="/telemetries">
                            <Button variant="outlined" size="small">
                              Telemetrias
                            </Button>
                          </Link>
                        </Box>
                      )}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Notificações
              </Typography>
              <Typography variant="h6" color="primary">
                {notifications === 0
                  ? "Nenhuma nova notificação"
                  : notifications === 1
                  ? "1 não lida"
                  : `${notifications} não lidas`}
              </Typography>

              <Link to="/notifications">
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Ver Notificações
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Últimas Telemetrias
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Não há telemetrias recentes.
              </Typography>
              <Link to="/telemetries">
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Ver Mais
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </SidebarLayout>
  );
};

export default DashboardPage;
