import { FC } from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import SidebarLayout from "../../components/SidebarLayout";

const DashboardPage: FC = () => {
  const { auth } = useAuth();

  return (
    <SidebarLayout title="Bem-vindo">
      <Typography variant="body1">
        Bem-vindo, {auth.user?.name}. Esta é sua área de administração. Escolha
        um tópico no menu para começar.
      </Typography>
    </SidebarLayout>
  );
};

export default DashboardPage;
