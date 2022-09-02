import { Grid, TextField, Button, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/slices/auth/thunks";

const formData = {
  displayName: "Rafael de Jesus",
  email: "rebolledo@gmail.com",
  password: "1234567890",
};

const formValidations = {
  displayName: [(value) => value.length >= 1, "El nombre es requerido"],
  email: [(value) => value.includes("@"), "El correo electrónico no es valido"],
  password: [(value) => value.length >= 6, "La contraseña es requerida"],
};

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    displayName,
    email,
    password,
    onInputChange,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(
      startCreatingUserWithEmailPassword({ email, password, displayName })
    );
  };
  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <TextField
              value={displayName}
              onChange={onInputChange}
              name="displayName"
              label="Nombre completo:"
              type="text"
              placeholder="Rafael de Jesus"
              fullWidth
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              value={email}
              onChange={onInputChange}
              name="email"
              label="Correo electrónico:"
              type="email"
              placeholder="example@gmail.com"
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              value={password}
              onChange={onInputChange}
              name="password"
              label="Contraseña:"
              type="password"
              placeholder="*****"
              fullWidth
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/login">
              ¿ Ya tienes cuenta ?, inicia sesión
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
