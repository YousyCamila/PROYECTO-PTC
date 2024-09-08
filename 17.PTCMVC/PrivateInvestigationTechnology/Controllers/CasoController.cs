using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateInvestigationTechnology.Datos;
using PrivateInvestigationTechnology.Models;
using System.Security.Claims;

namespace PrivateInvestigationTechnology.Controllers

{
    [Authorize] // Se asegura de que todos los métodos requieran estar autenticados
    public class CasoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CasoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Método para mostrar los casos del cliente o detective autenticado
        [Authorize(Roles = "Cliente, Detective, Administrador")]
        public async Task<IActionResult> Index()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value); // ID del usuario autenticado
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value; // Rol del usuario

            // Si es cliente, mostrar solo sus casos
            if (userRole == "Cliente")
            {
                var casosCliente = await _context.Casos
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.IdDetectiveNavigation)
                    .Where(c => c.IdCliente == userId)
                    .ToListAsync();
                return View(casosCliente);
            }

            // Si es detective, mostrar solo los casos asignados a él
            if (userRole == "Detective")
            {
                var casosDetective = await _context.Casos
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.IdDetectiveNavigation)
                    .Where(c => c.IdDetective == userId)
                    .ToListAsync();
                return View(casosDetective);
            }

            // Si es administrador, mostrar todos los casos
            if (userRole == "Administrador")
            {
                var todosLosCasos = await _context.Casos
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.IdDetectiveNavigation)
                    .ToListAsync();
                return View(todosLosCasos);
            }

            return Unauthorized(); // Si el rol no es válido
        }

        // Mostrar detalles del caso
        [Authorize(Roles = "Cliente, Detective, Administrador")]
        public async Task<IActionResult> Details(int id)
        {
            var caso = await _context.Casos
                .Include(c => c.IdClienteNavigation)
                .Include(c => c.IdDetectiveNavigation)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (caso == null)
            {
                return NotFound();
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value); // ID del usuario autenticado
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value; // Rol del usuario

            // Verificar si el usuario tiene acceso al caso
            if (userRole == "Cliente" && caso.IdCliente != userId)
            {
                return Unauthorized();
            }

            if (userRole == "Detective" && caso.IdDetective != userId)
            {
                return Unauthorized();
            }

            return View(caso);
        }

        // Solo el administrador puede editar el caso
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var caso = await _context.Casos.FindAsync(id);
            if (caso == null)
            {
                return NotFound();
            }
            return View(caso);
        }

        [HttpPost]
        [Authorize(Roles = "Administrador")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CadenaCustodia,InvestigacionExtorsion,EstudiosSeguridad,InvestigacionInfidelidades,InvestigacionRobosEmpresariales,Antecedentes,RecuperacionVehiculos,IdCliente,IdDetective")] Caso caso)
        {
            if (id != caso.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(caso);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CasoExists(caso.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(caso);
        }

        // Método auxiliar para verificar si un caso existe
        private bool CasoExists(int id)
        {
            return _context.Casos.Any(e => e.Id == id);
        }
    }
}

