import { Box, Button, Container, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Register = () => { 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
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
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario registrado exitosamente',
        });

        // Redirigir según el rol seleccionado
        if (role === "detective") {
            navigate(`/detective-form?email=${encodeURIComponent(email)}`); // Pasar el correo a través de la URL
          } else if (role === "cliente") {
            navigate(`/cliente-form?email=${encodeURIComponent(email)}`); // Redirigir a ClienteForm
          }else if (role === "administrador") {
            navigate(`/administrador-form?email=${encodeURIComponent(email)}`);
          } else {
            navigate("/dashboard"); // Ruta alternativa para otros roles
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: data.error,
        });
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
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
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            fontWeight: "bold",
            fontSize: 24,
            color: "#0077b6",
          }}
        >
          PTC
        </Box>

        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "center", color: "#0077b6" }}>
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
          />
          <TextField
            fullWidth
            label="Correo"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
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
            sx={{ mt: 3, backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#005f91" } }}
          >
            Registrarse
          </Button>

          {/* Botón para volver */}
          <Button
            onClick={() => navigate("/login")} // Cambia "/login" a la ruta deseada
            fullWidth
            variant="outlined"
            sx={{ mt: 2, backgroundColor: "white", color: "#0077b6", "&:hover": { backgroundColor: "#e0e0e0" } }}
          >
            Volver
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
