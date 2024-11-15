import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

const MissingPage: FC = () => {
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
          sx={{ fontSize: "6rem", fontWeight: "bold", color: "#1976d2" }}
        >
          Oops!
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: "20px", color: "#333" }}>
          Página não encontrada
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "40px", color: "#666" }}
        >
          A página que você está procurando não existe ou foi movida. Mas não se
          preocupe, você pode voltar para a página inicial!
        </Typography>
        <Link to="/home">
          <Button variant="contained" color="primary" size="large">
            Voltar para a página inicial
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default MissingPage;
