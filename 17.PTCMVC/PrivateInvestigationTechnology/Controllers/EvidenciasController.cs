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
    [Authorize] // Todos los usuarios deben estar autenticados
    public class EvidenciasController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EvidenciasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Evidencias
        public async Task<IActionResult> Index()
        {
            var evidencias = _context.Evidencia.Include(e => e.IdCasosNavigation);
            // Solo los administradores pueden ver el CRUD completo
            if (User.IsInRole("Administrador"))
            {
                return View(await evidencias.ToListAsync());
            }
            else
            {
                // Para clientes y detectives, filtrar solo las evidencias asociadas
                var userId = GetCurrentUserId();
                var evidenciasAccesibles = await evidencias
                    .Where(e => e.IdCasosNavigation.IdClienteNavigation.IdNavigation.Id == userId ||
                                e.IdCasosNavigation.IdDetectiveNavigation.IdNavigation.Id == userId)
                    .ToListAsync();
                return View(evidenciasAccesibles);
            }
        }

        // GET: Evidencias/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Evidencia == null)
            {
                return NotFound();
            }

            var evidencia = await _context.Evidencia
                .Include(e => e.IdCasosNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (evidencia == null)
            {
                return NotFound();
            }

            // Solo permitir a los administradores ver los detalles completos
            if (User.IsInRole("Administrador") ||
                evidencia.IdCasosNavigation.IdClienteNavigation.IdNavigation.Id == GetCurrentUserId() ||
                evidencia.IdCasosNavigation.IdDetectiveNavigation.IdNavigation.Id == GetCurrentUserId())
            {
                return View(evidencia);
            }

            return Forbid(); // Denegar acceso si el usuario no tiene permiso
        }

        // GET: Evidencias/Create
        [Authorize(Roles = "Cliente,Detective")]
        public IActionResult Create()
        {
            ViewData["IdCasos"] = new SelectList(_context.Casos, "Id", "Id");
            return View();
        }

        // POST: Evidencias/Create
        [Authorize(Roles = "Cliente,Detective")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,FechaEvidencia,Descripcion,IdCasos")] Evidencia evidencia)
        {
            if (ModelState.IsValid)
            {
                _context.Add(evidencia);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCasos"] = new SelectList(_context.Casos, "Id", "Id", evidencia.IdCasos);
            return View(evidencia);
        }

        // GET: Evidencias/Edit/5
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Evidencia == null)
            {
                return NotFound();
            }

            var evidencia = await _context.Evidencia.FindAsync(id);
            if (evidencia == null)
            {
                return NotFound();
            }
            ViewData["IdCasos"] = new SelectList(_context.Casos, "Id", "Id", evidencia.IdCasos);
            return View(evidencia);
        }

        // POST: Evidencias/Edit/5
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,FechaEvidencia,Descripcion,IdCasos")] Evidencia evidencia)
        {
            if (id != evidencia.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(evidencia);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EvidenciaExists(evidencia.Id))
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
            ViewData["IdCasos"] = new SelectList(_context.Casos, "Id", "Id", evidencia.IdCasos);
            return View(evidencia);
        }

        // GET: Evidencias/Delete/5
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Evidencia == null)
            {
                return NotFound();
            }

            var evidencia = await _context.Evidencia
                .Include(e => e.IdCasosNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (evidencia == null)
            {
                return NotFound();
            }

            return View(evidencia);
        }

        // POST: Evidencias/Delete/5
        [Authorize(Roles = "Administrador")]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Evidencia == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Evidencia'  is null.");
            }
            var evidencia = await _context.Evidencia.FindAsync(id);
            if (evidencia != null)
            {
                _context.Evidencia.Remove(evidencia);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool EvidenciaExists(int id)
        {
            return (_context.Evidencia?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private int GetCurrentUserId()
        {
            // Obtiene el ID del usuario actual desde la identidad
            // Suponiendo que el ID del usuario está en la identidad del usuario
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        }
    }
}
