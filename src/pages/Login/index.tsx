import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  password: Yup.string()
    .min(6, "Mínimo de 6 caracteres")
    .required("Campo obrigatório"),
});

const LoginPage: React.FC = () => {
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
      } catch {
        setErrMsg("Falha no login. Tente novamente.");
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            padding: 3,
            boxShadow: 5,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h4" color="primary" gutterBottom>
              Login
            </Typography>
            {errMsg && <Alert severity="error">{errMsg}</Alert>}

            <form onSubmit={formik.handleSubmit}>
              <TextInput
                variant="outlined"
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                required
                sx={{ mb: 2 }}
              />

              <TextInput
                variant="outlined"
                id="password"
                name="password"
                label="Senha"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                required
                sx={{ mb: 3 }}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
              />

              <CustomButton
                label="Login"
                fullWidth
                sx={{
                  borderRadius: 8,
                  backgroundColor: "#2575fc",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#1a5dc9",
                  },
                  mb: 2,
                }}
                type="submit"
              />
            </form>

            <Typography variant="body2">
              Não tem uma conta?{" "}
              <Link to="/register" style={{ color: "#6a11cb" }}>
                Cadastre-se
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
