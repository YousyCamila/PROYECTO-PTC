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

      console.log({ email, role });
      console.log(data);

      if (response.ok) {

        localStorage.setItem("userId", data.userId.trim()); // Guarda el userId en localStorage
        localStorage.setItem("role", data.role);      // Guarda el rol del usuario en localStorage

        
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Bienvenido de nuevo!',
        });

        if (role === 'administrador') {
          navigate('/admin-menu');
        } else if (role === 'cliente') {
          navigate('/cliente-menu');
          console.log(data.idCliente);
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
      backgroundImage: "url('https://scontent.fbog4-1.fna.fbcdn.net/v/t39.30808-6/312404170_109199351992944_5430879874558801924_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BxpplRDTj9EQ7kNvgHWi6tN&_nc_zt=23&_nc_ht=scontent.fbog4-1.fna&_nc_gid=A2AKN1EgkgNUcogxmZd092q&oh=00_AYD1yB-yGwsjJNx-xZQwyw0ljfDE6ELkeYLQYGZUUNP0tA&oe=6720401C')", // URL de la imagen
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
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
