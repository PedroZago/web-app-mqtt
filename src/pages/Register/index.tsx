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
  name: Yup.string()
    .min(3, "Mínimo de 3 caracteres")
    .required("Campo obrigatório"),
  password: Yup.string()
    .min(8, "Mínimo de 8 caracteres")
    .required("Campo obrigatório"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "As senhas devem coincidir")
    .required("Campo obrigatório"),
});

const RegisterPage: React.FC = () => {
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", name: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await register(values);
      } catch {
        setErrMsg("Falha no cadastro. Tente novamente.");
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
              Cadastro
            </Typography>
            {errMsg && <Alert severity="error">{errMsg}</Alert>}

            <form onSubmit={formik.handleSubmit}>
              <TextInput
                variant="outlined"
                id="email"
                name="email"
                label="Email"
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
                id="name"
                name="name"
                label="Nome"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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
                sx={{ mb: 2 }}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
              />

              <TextInput
                variant="outlined"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar Senha"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                required
                sx={{ mb: 3 }}
                showPassword={showConfirmPassword}
                toggleShowPassword={() =>
                  setConfirmShowPassword(!showConfirmPassword)
                }
              />

              <CustomButton
                label="Cadastrar"
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
              Já tem uma conta?{" "}
              <Link to="/login" style={{ color: "#6a11cb" }}>
                Entrar
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;
