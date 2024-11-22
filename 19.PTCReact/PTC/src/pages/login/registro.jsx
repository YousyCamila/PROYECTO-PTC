import { Box, Button, Container, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para confirmar contraseña
  const [role, setRole] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // Código de verificación
  const [showVerification, setShowVerification] = useState(false); // Mostrar cuadro de verificación
  const navigate = useNavigate();

  const ADMIN_CODE = "123456"; // Código de verificación para administrador
  const DECT_CODE ="09876";

  const register = async (e) => {
    e.preventDefault();

    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Contraseñas no coinciden",
        text: "Por favor, asegúrate de que ambas contraseñas sean iguales.",
      });
      return; // Detener el proceso de registro si no coinciden
    }

       // Validar formato del correo
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(email) || !email.endsWith(".com")) {
         Swal.fire({
           icon: 'warning',
           title: 'Correo inválido',
           text: 'Por favor, ingresa un correo válido que termine en ".com".',
         });
         return;
       }

    // Validar código de verificación si es administrador
    if (role === "administrador" && verificationCode !== ADMIN_CODE) {
      Swal.fire({
        icon: "error",
        title: "Código de verificación incorrecto",
        text: "El código ingresado no es válido. Por favor, inténtalo de nuevo.",
      });
      return; // Detener el proceso si el código es incorrecto
    }
        // Validar código de verificación si es detective
        if (role === "detetctive" && verificationCode !== DECT_CODE) {
          Swal.fire({
            icon: "error",
            title: "Código de verificación incorrecto",
            text: "El código ingresado no es válido. Por favor, inténtalo de nuevo.",
          });
          return; // Detener el proceso si el código es incorrecto
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
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Usuario registrado exitosamente",
        });

        // Redirigir según el rol seleccionado
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
        backgroundImage:
          "url('https://scontent.fbog4-1.fna.fbcdn.net/v/t39.30808-6/312404170_109199351992944_5430879874558801924_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BxpplRDTj9EQ7kNvgHWi6tN&_nc_zt=23&_nc_ht=scontent.fbog4-1.fna&_nc_gid=A2AKN1EgkgNUcogxmZd092q&oh=00_AYD1yB-yGwsjJNx-xZQwyw0ljfDE6ELkeYLQYGZUUNP0tA&oe=6720401C')",
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
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Rol</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setShowVerification(e.target.value === "administrador" || e.target.value === "detective");
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
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#0077b6", "&:hover": { backgroundColor: "#005f91" } }}
          >
            Registrarse
          </Button>

          <Button
            onClick={() => navigate("/login")}
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