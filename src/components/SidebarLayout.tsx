import { FC, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Divider,
  Backdrop,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PetsIcon from "@mui/icons-material/Pets";
import DevicesIcon from "@mui/icons-material/Devices";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GraphIcon from "@mui/icons-material/ShowChart";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const drawerWidth = 240;

interface SidebarLayoutProps {
  title: string;
  children: React.ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const { logout } = useAuth();

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => logout();

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.drawer,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {[
            { text: "Animais", path: "/animals", icon: <PetsIcon /> },
            { text: "Dispositivos", path: "/devices", icon: <DevicesIcon /> },
            {
              text: "Notificações",
              path: "/notifications",
              icon: <NotificationsIcon />,
            },
            { text: "Espécies", path: "/species", icon: <AssignmentIcon /> },
            { text: "Telemetrias", path: "/telemetries", icon: <GraphIcon /> },
            { text: "Usuários", path: "/users", icon: <PeopleIcon /> },
          ].map((item, index) => (
            <div key={item.text}>
              <ListItemButton component={Link} to={item.path}>
                {item.icon}
                <ListItemText primary={item.text} sx={{ ml: 1 }} />
              </ListItemButton>
              {index < 5 && <Divider />}
            </div>
          ))}
        </List>
      </Drawer>
      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={handleDrawerToggle}
      />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 2,
          transition: "margin 0.3s ease",
          overflowY: "auto",
        }}
      >
        <Toolbar />
        <Container
          sx={{
            width: "100%",
            maxWidth: "none",
            padding: 3,
          }}
          maxWidth={false}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
