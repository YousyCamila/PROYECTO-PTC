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
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      console.log({ email, password, role });
      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Bienvenido de nuevo!',
        });

        if (role === 'administrador') {
          navigate('/admin-menu');
        } else if (role === 'cliente') {
          navigate('/cliente-menu');
        } else if (role === 'detective') {
          navigate('/detective-menu');
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
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #0077b6, #00b4d8)",
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
            fontSize: 48,
            color: "#0056b3",
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
            sx={{ backgroundColor: "white" }}
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
            sx={{ backgroundColor: "white" }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label" sx={{ color: "black" }}>Rol</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              sx={{ backgroundColor: "white" }}
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

        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate("/register")}
          sx={{ mt: 2, color: "#0077b6", borderColor: "#0077b6", "&:hover": { backgroundColor: "#e0e0e0" } }}
        >
          Registrarse
        </Button>

        {/* Botón para volver a la página de inicio */}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ mt: 2, color: "#0077b6", borderColor: "#0077b6", "&:hover": { backgroundColor: "#e0e0e0" } }}
        >
          Volver a Inicio
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
