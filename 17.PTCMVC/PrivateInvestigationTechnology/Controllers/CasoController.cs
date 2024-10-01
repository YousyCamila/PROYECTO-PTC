using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PrivateInvestigationTechnology.Datos;
using PrivateInvestigationTechnology.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace PrivateInvestigationTechnology.Controllers
{
    [Authorize] // Requiere autenticación en todos los métodos por defecto
    public class CasoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CasoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Caso
        [Authorize(Roles = "Cliente,Detective,Administrador")]
        public async Task<IActionResult> Index()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            IQueryable<Caso> casosQuery = _context.Casos
                .Include(c => c.IdClienteNavigation)
                .Include(c => c.IdDetectiveNavigation);

            if (userRole == "Cliente")
            {
                casosQuery = casosQuery.Where(c => c.IdCliente == userId);
            }
            else if (userRole == "Detective")
            {
                casosQuery = casosQuery.Where(c => c.IdDetective == userId);
            }

            return View(await casosQuery.ToListAsync());
        }

        // GET: Caso/Details/5
        [Authorize(Roles = "Cliente,Detective,Administrador")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var caso = await _context.Casos
                .Include(c => c.IdClienteNavigation)
                .Include(c => c.IdDetectiveNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (caso == null)
            {
                return NotFound();
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // Verificar que el cliente o detective solo vea su propio caso
            if ((userRole == "Cliente" && caso.IdCliente != userId) ||
                (userRole == "Detective" && caso.IdDetective != userId))
            {
                return Unauthorized();
            }

            return View(caso);
        }

        // GET: Caso/Create
        [Authorize(Roles = "Administrador")]
        public IActionResult Create()
        {
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id");
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id");
            return View();
        }

        // POST: Caso/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Create([Bind("Id,CadenaCustodia,InvestigacionExtorsion,EstudiosSeguridad,InvestigacionInfidelidades,InvestigacionRobosEmpresariales,Antecedentes,RecuperacionVehiculos,IdCliente,IdDetective")] Caso caso)
        {
            if (ModelState.IsValid)
            {
                _context.Add(caso);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", caso.IdCliente);
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id", caso.IdDetective);
            return View(caso);
        }

        // GET: Caso/Edit/5
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
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", caso.IdCliente);
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id", caso.IdDetective);
            return View(caso);
        }

        // POST: Caso/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
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
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", caso.IdCliente);
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id", caso.IdDetective);
            return View(caso);
        }

        // GET: Caso/Delete/5
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var caso = await _context.Casos
                .Include(c => c.IdClienteNavigation)
                .Include(c => c.IdDetectiveNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (caso == null)
            {
                return NotFound();
            }

            return View(caso);
        }

        // POST: Caso/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var caso = await _context.Casos.FindAsync(id);
            if (caso != null)
            {
                _context.Casos.Remove(caso);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool CasoExists(int id)
        {
            return _context.Casos.Any(e => e.Id == id);
        }
    }
}
