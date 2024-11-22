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
} from "@mui/material";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
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

        Swal.fire({
          icon: "success",
          title: "Login exitoso",
          text: "Bienvenido de nuevo!",
        });

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
        backgroundImage: "url('https://scontent.fbog4-1.fna.fbcdn.net/v/t39.30808-6/312404170_109199351992944_5430879874558801924_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BxpplRDTj9EQ7kNvgHWi6tN&_nc_zt=23&_nc_ht=scontent.fbog4-1.fna&_nc_gid=A2AKN1EgkgNUcogxmZd092q&oh=00_AYD1yB-yGwsjJNx-xZQwyw0ljfDE6ELkeYLQYGZUUNP0tA&oe=6720401C')",
        backgroundSize: "cover",
        background: "linear-gradient(to top, #0077b6, #00aaff)",
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
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#0077b6",
            marginBottom: "20px",
          }}
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
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ marginBottom: "16px" }}
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
    </Box>
  );
};

export default Login;
