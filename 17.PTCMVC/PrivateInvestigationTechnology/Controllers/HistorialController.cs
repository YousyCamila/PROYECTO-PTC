using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateInvestigationTechnology.Datos;
using PrivateInvestigationTechnology.Models;
using System.Security.Claims; // Asegúrate de importar esto

namespace PrivateInvestigationTechnology.Controllers
{
    public class HistorialsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HistorialsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Historials
        public async Task<IActionResult> Index()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier); // Obtén el ID del usuario actual
            if (userIdStr == null || !int.TryParse(userIdStr, out var userId))
            {
                return Unauthorized();
            }

            var cliente = await _context.Clientes
                .Include(c => c.Historials)
                .FirstOrDefaultAsync(c => c.Id == userId);

            if (cliente == null)
            {
                return NotFound();
            }

            var historial = cliente.Historials.ToList();
            return View(historial);
        }

        // GET: Historials/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Historials == null)
            {
                return NotFound();
            }

            var historial = await _context.Historials
                .Include(h => h.IdClienteNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (historial == null)
            {
                return NotFound();
            }

            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdStr == null || !int.TryParse(userIdStr, out var userId))
            {
                return Unauthorized();
            }

            if (historial.IdCliente != userId)
            {
                return Forbid(); // Si el historial no pertenece al usuario, denegar acceso
            }

            return View(historial);
        }
    }
}
