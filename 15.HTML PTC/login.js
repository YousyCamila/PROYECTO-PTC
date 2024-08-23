// js/login.js
function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;

    var usuarios = {
        cliente: { username: "cliente", password: "cliente123", role: "cliente" },
        administrador: { username: "admin", password: "admin123", role: "administrador" },
        detective: { username: "detective", password: "detective123", role: "detective" }
    };

    if (usuarios[role] && usuarios[role].username === username && usuarios[role].password === password) {
        alert("Inicio de sesión exitoso como " + role);

        switch (role) {
            case "cliente":
                window.location.href = "cliente.html";
                break;
            case "administrador":
                window.location.href = "Administrador/index.html";
                break;
            case "detective":
                window.location.href = "detective.html";
                break;
            default:
                window.location.href = "index.html";
                break;
        }
    } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
}
