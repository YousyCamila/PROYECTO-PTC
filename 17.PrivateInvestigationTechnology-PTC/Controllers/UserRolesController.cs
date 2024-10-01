using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using _17.PrivateInvestigationTechnology_PTC.Models.ViewModels;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    [Authorize(Roles = "Administrador, SuperUsuario")]
    public class UserRolesController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserRolesController> _logger;

        public UserRolesController(UserManager<ApplicationUser> userManager,
                                   RoleManager<IdentityRole> roleManager,
                                   ApplicationDbContext context,
                                   ILogger<UserRolesController> logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
            _logger = logger;
        }

        // Mostrar lista de usuarios y sus roles
        public async Task<IActionResult> Index()
        {
            var users = await _userManager.Users.ToListAsync();
            var userRolesViewModel = new List<UserRolesViewModel>();

            foreach (var user in users)
            {
                var thisViewModel = new UserRolesViewModel
                {
                    UserId = user.Id,
                    Email = user.Email,
                    Roles = new List<string>(await _userManager.GetRolesAsync(user)),
                    FullName = user.FullName,
                    PhoneNumber = user.PhoneNumber
                };
                userRolesViewModel.Add(thisViewModel);
            }

            return View(userRolesViewModel);
        }

        // GET: Gestión de roles para un usuario específico
        public async Task<IActionResult> Manage(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            var model = new List<ManageUserRolesViewModel>();
            foreach (var role in _roleManager.Roles)
            {
                var userRolesViewModel = new ManageUserRolesViewModel
                {
                    RoleId = role.Id,
                    RoleName = role.Name,
                    IsSelected = await _userManager.IsInRoleAsync(user, role.Name)
                };
                model.Add(userRolesViewModel);
            }

            ViewBag.UserId = user.Id;
            ViewBag.FullName = user.FullName;
            ViewBag.PhoneNumber = user.PhoneNumber;

            return View(model);
        }

        // POST: Asignar roles a un usuario y sincronizar datos
        [HttpPost]
        public async Task<IActionResult> Manage(string userId, List<ManageUserRolesViewModel> roles)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            // Obtener los roles actuales del usuario
            var currentRoles = await _userManager.GetRolesAsync(user);

            // Roles seleccionados en el formulario
            var selectedRoles = roles.Where(r => r.IsSelected).Select(r => r.RoleName).ToList();

            try
            {
                // Agregar nuevos roles seleccionados
                var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(currentRoles).ToList());
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", "No se pudo agregar los roles.");
                    return View(roles);
                }

                // Remover roles no seleccionados
                result = await _userManager.RemoveFromRolesAsync(user, currentRoles.Except(selectedRoles).ToList());
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", "No se pudo remover los roles.");
                    return View(roles);
                }

                // Asignar el usuario a la entidad correspondiente
                await AssignToEntityAsync(user, selectedRoles);

                // Usar TempData para pasar el mensaje de éxito a través de la redirección
                TempData["SuccessMessage"] = "Roles actualizados con éxito";
            }
            catch (System.Exception ex)
            {
                _logger?.LogError(ex, $"Error al gestionar roles para el usuario con ID: {userId}");
                ModelState.AddModelError("", "Se produjo un error al gestionar los roles del usuario.");
                return View(roles);
            }

            return RedirectToAction("Manage", new { userId = user.Id });
        }



        // Asignar el usuario a la entidad correspondiente (Administrador, Cliente o Detective)
        private async Task AssignToEntityAsync(ApplicationUser user, List<string> selectedRoles)
        {
            foreach (var role in selectedRoles)
            {
                if (role == "Administrador")
                {
                    await AssignAdminAsync(user);
                }
                else if (role == "Cliente")
                {
                    await AssignClienteAsync(user);
                }
                else if (role == "Detective")
                {
                    await AssignDetectiveAsync(user);
                }
            }
        }

        // Método para asignar el rol de Administrador
        private async Task AssignAdminAsync(ApplicationUser user)
        {
            if (!_context.Administradores.Any(a => a.IdentityUserId == user.Id))
            {
                var admin = new Administrador
                {
                    IdentityUserId = user.Id,
                    IdentityUser = user,
                    NumeroIdentidad = "123456789", // Ajustar según sea necesario
                    HojaDeVida = null,
                    FotoPerfil = null
                };
                _context.Administradores.Add(admin);
                await _context.SaveChangesAsync();
            }
        }

        // Método para asignar el rol de Cliente
        private async Task AssignClienteAsync(ApplicationUser user)
        {
            if (!_context.Clientes.Any(c => c.IdentityUserId == user.Id))
            {
                var cliente = new Cliente
                {
                    IdentityUserId = user.Id,
                    IdentityUser = user
                };
                _context.Clientes.Add(cliente);
                await _context.SaveChangesAsync();
            }
        }

        // Método para asignar el rol de Detective
        private async Task AssignDetectiveAsync(ApplicationUser user)
        {
            if (!_context.Detectives.Any(d => d.IdentityUserId == user.Id))
            {
                var detective = new Detective
                {
                    IdentityUserId = user.Id,
                    IdentityUser = user,
                    NumeroIdentidad = "654987321", // Ajustar según sea necesario
                    HojaDeVida = null,
                    FotoPerfil = null
                };
                _context.Detectives.Add(detective);
                await _context.SaveChangesAsync();
            }
        }
    }
}
