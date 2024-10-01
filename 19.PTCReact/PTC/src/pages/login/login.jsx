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
} from "@mui/material";
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Valor por defecto
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }), // Asegúrate de que estos valores sean correctos
      });

      const data = await response.json();

      // Log de las credenciales y la respuesta
      console.log({ email, password, role }); // Para depuración
      console.log(data); // Para depuración

      if (response.ok) {
        localStorage.setItem("token", data.token);
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Bienvenido de nuevo!',
        });

        // Verificar el rol del usuario para redirigir
        if (role === 'administrador') {
          navigate('/admin-menu'); // Redirigir al menú administrativo
        } else {
          navigate("/dashboard"); // Redirigir a una página protegida para otros roles
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: data.message || 'Credenciales inválidas',
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado, por favor intenta más tarde.',
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100vw", // Usar toda la pantalla horizontalmente
        height: "100vh", // Usar toda la pantalla verticalmente
        background: "linear-gradient(to right, #0077b6, #00b4d8)", // Degradado en toda la pantalla
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            fontWeight: "bold",
            fontSize: 48, // Aumentar tamaño de fuente
            color: "#0056b3", // Azul más prominente
          }}
        >
          PTC
        </Box>

        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "center", color: "#0077b6" }}>
          Iniciar Sesión
        </Typography>

        <form onSubmit={login}>
          <TextField
            fullWidth
            label="Correo"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            sx={{ backgroundColor: "white" }} // Fondo blanco para el input
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            sx={{ backgroundColor: "white" }} // Fondo blanco para el input
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label" sx={{ color: "black" }}>Rol</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              sx={{ backgroundColor: "white" }} // Fondo blanco para el select
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
            sx={{ mt: 3, mb: 2, backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#005f91" } }}
          >
            Iniciar Sesión
          </Button>
        </form>
        {/* Botón para redirigir a la vista de registro */}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate("/register")}
          sx={{ mt: 2, color: "#0077b6", borderColor: "#0077b6", "&:hover": { backgroundColor: "#e0e0e0" } }}
        >
          Registrarse
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
