import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        login(values);
      } catch (error) {
        console.error("Error logging in:", error);
        setErrMsg("Login Failed");
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h4" align="center">
          Login
        </Typography>

        {errMsg && (
          <Alert severity="error" aria-live="assertive">
            {errMsg}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
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
          />

          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Need an Account? <Link to="/register">Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
