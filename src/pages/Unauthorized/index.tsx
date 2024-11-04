import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Container>
      <Typography variant="h1" component="h1" gutterBottom>
        Unauthorized
      </Typography>
      <Typography variant="body1" gutterBottom>
        You do not have access to the requested page.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" onClick={goBack}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
