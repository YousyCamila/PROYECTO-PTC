import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Importa jwt_decode para decodificar el token JWT
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
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Iconos para ver/ocultar la contraseña

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }), // Incluye el rol en la solicitud
      });

      const data = await response.json();

      if (response.ok) {
        // Decodifica el token para obtener email, id y role
        const decodedToken = jwt_decode(data.accessToken);

        // Guarda los datos en localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", decodedToken.id); // Guarda el id del usuario
        localStorage.setItem("email", decodedToken.email); // Guarda el email
        localStorage.setItem("role", decodedToken.role); // Guarda el rol

        

        // Redirige según el rol decodificado del token
        if (decodedToken.role === "administrador") {
          navigate("/admin-menu");
        } else if (decodedToken.role === "cliente") {
          navigate("/cliente-menu");
        } else if (decodedToken.role === "detective") {
          navigate("/detective-menu");
        }
      } else {
        // Mostrar mensaje de error si hay problema con el rol o credenciales
        Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text: data.error || "Credenciales inválidas",
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
        background: "linear-gradient(to top, #0077b6, #00aaff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* NavBar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0077b6",
          color: "white",
          padding: "10px 20px",
          position: "absolute", // Colocando el navbar arriba de todo
          top: "10px", // Ajustando la distancia desde el top
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          sx={{ color: "white", display: "flex", alignItems: "center" }}
        >
          <ArrowBack />
          <Typography variant="body1" sx={{ marginLeft: "6px" }}>
            Volver
          </Typography>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          PTC - Iniciar Sesión
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
            borderRadius: 2,
            boxShadow: 3,
            marginTop: 10, // Esto asegura que el formulario no se superponga al navbar
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center", color: "#0077b6", marginBottom: 8 }}
          >
            Iniciar sesión
          </Typography>

          <form onSubmit={login}>
            <TextField
              fullWidth
              label="Correo"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ marginBottom: "16px" }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ padding: "10px" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />} {/* Logo de ver contraseña */}
                  </IconButton>
                ),
              }}
            />
            <FormControl fullWidth margin="normal" sx={{ marginBottom: "16px" }}>
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="cliente">Cliente</MenuItem>
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="detective">Detective</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#0077b6",
                "&:hover": { backgroundColor: "#005f91" },
              }}
            >
              Iniciar sesión
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                color: "#0077b6",
                borderColor: "#0077b6",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
              onClick={() => navigate("/register")}
            >
              ¿No tienes cuenta? Regístrate
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
        <Alert severity="success" sx={{ width: "100%" }}>
          ¡Login exitoso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
