using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    [Authorize(Roles = "Administrador")]  // Solo los administradores pueden acceder
    public class AdministradorLoginController : Controller
    {
        // Acción para mostrar la vista principal del administrador
        public IActionResult Index()
        {
            return View();
        }

        // Acción para gestionar el Blog
        public IActionResult GestionarBlog()
        {
            // Aquí puedes redirigir al controlador y acción correspondiente para gestionar el blog
            return RedirectToAction("Index", "Blog");
        }

        // Acción para gestionar Investigadores
        public IActionResult GestionarInvestigadores()
        {
            // Redirige al controlador que maneja la lógica de los investigadores
            return RedirectToAction("Index", "Detective");
        }

        // Acción para gestionar Clientes
        public IActionResult GestionarClientes()
        {
            // Redirige al controlador que maneja la lógica de los clientes
            return RedirectToAction("Index", "Clientes");
        }

        // Acción para gestionar Casos
        public IActionResult GestionarCasos()
        {
            // Redirige al controlador que maneja la lógica de los casos
            return RedirectToAction("Index", "Casos");
        }

        // Acción para gestionar la comunicación
        public IActionResult Comunicacion()
        {
            // Si la comunicación está gestionada por otro controlador, se redirige allí
            return RedirectToAction("Index", "Comunicacion");
        }

        // Acción para cerrar sesión y redirigir al inicio
        public IActionResult CerrarSesion()
        {
            return RedirectToAction("Logout", "Account");  // Asegúrate de que el controlador de cuenta tiene esta acción implementada
        }

        // Acción para volver al inicio
        public IActionResult VolverAlInicio()
        {
            return RedirectToAction("Index", "Home");  // Te redirige a la página principal del sitio
        }

        public IActionResult AdministrarRoles()
        {
            return RedirectToAction("Index", "Roles");  // Te redirige a la página principal del sitio
        }

        public IActionResult AdministrarUsuariosNuevos()
        {
            return RedirectToAction("Index", "UserRoles");  // Te redirige a la página principal del sitio
        }
    }
}
