using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using _17.PrivateInvestigationTechnology_PTC.Models.ViewModels;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    [Authorize(Roles = "Administrador, SuperUsuario")]
    public class UserRolesController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public UserRolesController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        // Index para mostrar todos los usuarios y sus roles
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
                    Roles = new List<string>(await _userManager.GetRolesAsync(user))
                };
                userRolesViewModel.Add(thisViewModel);
            }

            return View(userRolesViewModel);
        }

        // GET: Manage para mostrar los roles asignados a un usuario
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
            ViewBag.UserName = user.UserName;

            return View(model);
        }

        // POST: Asignar roles a un usuario y añadirlo a la tabla correspondiente
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

            // Asignar el usuario a la entidad correspondiente (Administrador, Cliente o Detective) dependiendo del rol asignado
            await AssignToEntityAsync(user, selectedRoles);

            return RedirectToAction("Index");
        }

        // Método para asignar el usuario a la entidad correspondiente según el rol seleccionado
        private async Task AssignToEntityAsync(IdentityUser user, List<string> selectedRoles)
        {
            foreach (var role in selectedRoles)
            {
                if (role == "Administrador")
                {
                    // Verificar si ya existe el administrador
                    if (!_context.Administradores.Any(a => a.IdentityUserId == user.Id))
                    {
                        var admin = new Administrador
                        {
                            Nombre = user.UserName, // Puedes asignar otros campos como Nombre, etc.
                            NumeroIdentidad = "123456789", // Ajustar según sea necesario
                            NumeroCelular = "3001234567",  // Ajustar según sea necesario
                            HojaDeVida = null, // O asignar si existe un archivo
                            IdentityUserId = user.Id
                        };
                        _context.Administradores.Add(admin);
                    }
                }
                else if (role == "Cliente")
                {
                    if (!_context.Clientes.Any(c => c.IdentityUserId == user.Id))
                    {
                        var cliente = new Cliente
                        {
                            Nombre = user.UserName,
                            NumeroIdentidad = "987654321",  // Ajustar según sea necesario
                            NumeroCelular = "3007654321",   // Ajustar según sea necesario
                            IdentityUserId = user.Id
                        };
                        _context.Clientes.Add(cliente);
                    }
                }
                else if (role == "Detective")
                {
                    if (!_context.Detectives.Any(d => d.IdentityUserId == user.Id))
                    {
                        var detective = new Detective
                        {
                            Nombre = user.UserName,
                            NumeroIdentidad = "654987321",  // Ajustar según sea necesario
                            NumeroCelular = "3001239876",   // Ajustar según sea necesario
                            FechaNacimiento = DateTime.Parse("1990-01-01"), // Ajustar según sea necesario
                            HojaDeVida = null, // O asignar si existe un archivo
                            IdentityUserId = user.Id
                        };
                        _context.Detectives.Add(detective);
                    }
                }
            }

            await _context.SaveChangesAsync(); // Guardar cambios en la base de datos
        }
    }
}
