import {
  Container,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  CssBaseline,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240;

const DashboardPage: FC = () => {
  const { auth } = useAuth();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {[
            { text: "Animais", path: "/animals" },
            { text: "Dispositivos", path: "/devices" },
            { text: "Notificações", path: "/notifications" },
            { text: "Espécies", path: "/species" },
            { text: "Telemetrias", path: "/telemetries" },
            { text: "Usuários", path: "/users" },
          ].map((item) => (
            <ListItemButton component={Link} to={item.path} key={item.text}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Bem-vindo, {auth.user?.name}
          </Typography>
          <Typography variant="body1">
            Esta é sua área de administração. Escolha um tópico no menu para
            começar.
          </Typography>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
