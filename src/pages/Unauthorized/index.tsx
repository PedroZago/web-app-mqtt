import { FC } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const UnauthorizedPage: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          sx={{ fontSize: "6rem", fontWeight: "bold", color: "#d32f2f" }}
        >
          Acesso Negado
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: "20px", color: "#333" }}>
          Você não tem permissão para acessar esta página.
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "40px", color: "#666" }}
        >
          Parece que você está tentando acessar uma página restrita. Por favor,
          volte e tente outra ação.
        </Typography>
        <Box>
          <Link to="/home">
            <Button variant="contained" color="primary" size="large">
              Voltar
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default UnauthorizedPage;
