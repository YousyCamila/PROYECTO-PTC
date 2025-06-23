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
  Paper,
} from "@mui/material";
import { ArrowBack, PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
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
      const response = await fetch("https://proyecto-ptc.onrender.com/api/usuario/register", {
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
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Estética navbar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0077b6",
          color: "white",
          padding: "12px 24px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
          position: "absolute",
          top: 0,
        }}
      >
        <Tooltip title="Volver">
          <IconButton
            onClick={() => navigate("/login")}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
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
            backgroundColor: "#ffffff",
            padding: 4,
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            marginTop: 10,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              marginTop: '50px',
              color: "#003366",
              fontWeight: "bold",
              marginBottom: 4,
              
            }}
          >
            Crear cuenta
          </Typography>

          <form onSubmit={register}>
            <TextField
              fullWidth
              id="fullName-input"
              label="Nombre completo"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              helperText="Por favor, ingresa tu nombre completo"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              id="correo"
              label="Correo electrónico"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              helperText="Por favor, ingresa tu correo electrónico"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              id="Contra"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              helperText="Ingresa una contraseña segura"
              sx={{ marginBottom: 2 }}
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
              id="confiContra"
              label="Confirmar contraseña"
              type={showConfirmPassword ? "text" : "password"}
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              helperText="Confirma tu contraseña"
              sx={{ marginBottom: 2 }}
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
            <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
              id="role-select"
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
                id="CodigoVeri"
                label="Código de verificación"
                margin="normal"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            )}

            <Button
            id="Registrarse"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#0077b6",
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#005f87" },
              }}
            >
              Registrarse
            </Button>
          </form>
        </Container>
      </motion.div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
