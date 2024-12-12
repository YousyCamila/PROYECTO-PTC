import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import { ArrowBack, PersonAdd } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const ADMIN_CODE = "123456";
  const DECT_CODE = "09876";

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error de registro",
        text: "Contraseñas no coinciden. Por favor, asegúrate de que ambas contraseñas sean iguales.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith(".com")) {
      Swal.fire({
        icon: "error",
        title: "Error de registro",
        text: "Por favor, ingresa un correo válido que termine en '.com'.",
      });
      return;
    }

    if (role === "administrador" && verificationCode !== ADMIN_CODE) {
      Swal.fire({
        icon: "error",
        title: "Error de registro",
        text: "Código de verificación de administrador incorrecto.",
      });
      return;
    }

    if (role === "detective" && verificationCode !== DECT_CODE) {
      Swal.fire({
        icon: "error",
        title: "Error de registro",
        text: "Código de verificación de detective incorrecto.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuario/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: fullName, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSnackbar(true);
        setSnackbarMessage("Usuario registrado exitosamente");

        if (role === "detective") {
          navigate(`/detective-form?email=${encodeURIComponent(email)}`);
        } else if (role === "cliente") {
          navigate(`/cliente-form?email=${encodeURIComponent(email)}`);
        } else if (role === "administrador") {
          navigate(`/administrador-form?email=${encodeURIComponent(email)}`);
        } else {
          navigate("/dashboard");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de registro",
          text: data.error || "Ocurrió un error inesperado.",
        });
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado, por favor intenta más tarde.",
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* NavBar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(to left, rgba(0, 0, 139, 1), rgba(0, 0, 0, 0.911), rgba(0, 0, 139, 1))",
          color: "white",
          padding: "10px 20px",
          position: "absolute",
          top: 0,
          left: 0,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "0 0 10px 10px",
          zIndex: 1000,
        }}
      >
        <Tooltip title="Volver">
          <IconButton
            onClick={() => navigate("/login")}
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          PTC - Registro
        </Typography>
      </Box>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%" }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 4,
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
            marginTop: 10,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center", color: "#003366", marginBottom: 4 }}
          >
            Registrarse
          </Typography>

          <form onSubmit={register}>
            <TextField
              fullWidth
              label="Nombre Completo"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              sx={{
                marginBottom: "16px",
                input: { color: "#003366" },
              }}
            />
            <TextField
              fullWidth
              label="Correo"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              helperText="Por favor, ingresa tu correo electrónico"
              sx={{
                marginBottom: "16px",
                input: { color: "#003366" },
              }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              helperText="Ingresa tu contraseña"
              sx={{
                marginBottom: "16px",
                input: { color: "#003366" },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ padding: "10px" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              helperText="Confirma tu contraseña"
              sx={{
                marginBottom: "16px",
                input: { color: "#003366" },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    sx={{ padding: "10px" }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <FormControl fullWidth margin="normal" sx={{ marginBottom: "16px" }}>
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setShowVerification(
                    e.target.value === "administrador" || e.target.value === "detective"
                  );
                }}
                required
              >
                <MenuItem value="cliente">Cliente</MenuItem>
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="detective">Detective</MenuItem>
              </Select>
            </FormControl>

            {showVerification && (
              <TextField
                fullWidth
                label="Código de Verificación"
                margin="normal"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                sx={{
                  marginBottom: "16px",
                  input: { color: "#003366" },
                }}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#003366",
                color: "white",
                "&:hover": { backgroundColor: "#002244" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PersonAdd /> Registrarse
            </Button>
          </form>
        </Container>
      </motion.div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;