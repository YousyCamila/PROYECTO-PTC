using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PrivateInvestigationTechnology.Datos;
using PrivateInvestigationTechnology.Models;

namespace PrivateInvestigationTechnology.Controllers
{
    [Authorize]
    public class ContratoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ContratoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Contrato
        public async Task<IActionResult> Index()
        {
            if (User.IsInRole("Administrador"))
            {
                var contratos = _context.Contratos
                    .Include(c => c.IdClienteNavigation)
                    .ThenInclude(c => c.IdNavigation)
                    .Include(c => c.IdDetectiveNavigation)
                    .ThenInclude(d => d.IdNavigation);
                return View(await contratos.ToListAsync());
            }

            var userEmail = User.FindFirstValue(ClaimTypes.Email);

            // Buscar el cliente basado en el correo del usuario
            var cliente = await _context.Clientes
                .Include(c => c.Contratos)
                .ThenInclude(c => c.IdDetectiveNavigation)
                .FirstOrDefaultAsync(c => c.IdNavigation.Correo == userEmail);

            if (cliente != null)
            {
                var contratos = _context.Contratos
                    .Where(c => c.IdCliente == cliente.Id)
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.IdDetectiveNavigation);
                return View(await contratos.ToListAsync());
            }

            // Buscar el detective basado en el correo del usuario
            var detective = await _context.Detectives
                .Include(d => d.Contratos)
                .ThenInclude(c => c.IdClienteNavigation)
                .FirstOrDefaultAsync(d => d.IdNavigation.Correo == userEmail);

            if (detective != null)
            {
                var contratos = _context.Contratos
                    .Where(c => c.IdDetective == detective.Id)
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.IdDetectiveNavigation);
                return View(await contratos.ToListAsync());
            }

            // Si el usuario no es ni cliente ni detective, mostrar una vista vacía o de acceso denegado
            return Forbid();
        }


        // GET: Contrato/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Contratos == null)
            {
                return NotFound();
            }

            var contrato = await _context.Contratos
                .Include(c => c.IdClienteNavigation)
                .Include(c => c.IdDetectiveNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (contrato == null)
            {
                return NotFound();
            }

            var userEmail = User.FindFirstValue(ClaimTypes.Email);

            if (User.IsInRole("Administrador") ||
                contrato.IdClienteNavigation.IdNavigation.Correo == userEmail ||
                contrato.IdDetectiveNavigation.IdNavigation.Correo == userEmail)
            {
                return View(contrato);
            }

            return Forbid();
        }

        // GET: Contrato/Create
        [Authorize(Roles = "Administrador")]
        public IActionResult Create()
        {
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id");
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id");
            return View();
        }

        // POST: Contrato/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Create([Bind("Id,DescripcionServicio,FechaInicio,FechaCierre,Clausulas,Tarifa,Estado,IdCliente,IdDetective")] Contrato contrato)
        {
            if (ModelState.IsValid)
            {
                _context.Add(contrato);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", contrato.IdCliente);
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id", contrato.IdDetective);
            return View(contrato);
        }

        // GET: Contrato/Edit/5
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Contratos == null)
            {
                return NotFound();
            }

            var contrato = await _context.Contratos.FindAsync(id);
            if (contrato == null)
            {
                return NotFound();
            }
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", contrato.IdCliente);
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id", contrato.IdDetective);
            return View(contrato);
        }

        // POST: Contrato/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,DescripcionServicio,FechaInicio,FechaCierre,Clausulas,Tarifa,Estado,IdCliente,IdDetective")] Contrato contrato)
        {
            if (id != contrato.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(contrato);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContratoExists(contrato.Id))
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
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", contrato.IdCliente);
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id", contrato.IdDetective);
            return View(contrato);
        }

        // GET: Contrato/Delete/5
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Contratos == null)
            {
                return NotFound();
            }

            var contrato = await _context.Contratos
                .Include(c => c.IdClienteNavigation)
                .Include(c => c.IdDetectiveNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (contrato == null)
            {
                return NotFound();
            }

            return View(contrato);
        }

        // POST: Contrato/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Contratos == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Contratos'  is null.");
            }
            var contrato = await _context.Contratos.FindAsync(id);
            if (contrato != null)
            {
                _context.Contratos.Remove(contrato);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ContratoExists(int id)
        {
            return (_context.Contratos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
