using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateInvestigationTechnology.Datos;
using PrivateInvestigationTechnology.Models;

namespace PrivateInvestigationTechnology.Controllers

{
    [Authorize(Roles = "Administrador")] // Solo permite acceso a usuarios con el rol de Administrador
    public class AuditoriaController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AuditoriaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Auditoria
        public async Task<IActionResult> Index()
        {
            var auditoria = await _context.Auditoria
                .Include(a => a.IdUsuarioNavigation)
                .ToListAsync();
            return View(auditoria);
        }

        // GET: Auditoria/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var auditoria = await _context.Auditoria
                .Include(a => a.IdUsuarioNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (auditoria == null)
            {
                return NotFound();
            }

            return View(auditoria);
        }

        // GET: Auditoria/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Auditoria/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,FechaActividad,DescripcionActividad,Estado,HoraActividad,DetallesAdicionales,IdUsuario")] Auditoria auditoria)
        {
            if (ModelState.IsValid)
            {
                _context.Add(auditoria);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(auditoria);
        }

        // GET: Auditoria/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var auditoria = await _context.Auditoria.FindAsync(id);
            if (auditoria == null)
            {
                return NotFound();
            }
            return View(auditoria);
        }

        // POST: Auditoria/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,FechaActividad,DescripcionActividad,Estado,HoraActividad,DetallesAdicionales,IdUsuario")] Auditoria auditoria)
        {
            if (id != auditoria.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(auditoria);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AuditoriaExists(auditoria.Id))
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
            return View(auditoria);
        }

        // GET: Auditoria/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var auditoria = await _context.Auditoria
                .Include(a => a.IdUsuarioNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (auditoria == null)
            {
                return NotFound();
            }

            return View(auditoria);
        }

        // POST: Auditoria/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id, string password)
        {
            if (password != "123456") // Verificación de contraseña
            {
                ModelState.AddModelError(string.Empty, "Contraseña incorrecta.");
                return View(await _context.Auditoria.FirstOrDefaultAsync(m => m.Id == id));
            }

            var auditoria = await _context.Auditoria.FindAsync(id);
            if (auditoria != null)
            {
                _context.Auditoria.Remove(auditoria);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool AuditoriaExists(int id)
        {
            return _context.Auditoria.Any(e => e.Id == id);
        }
    }
}
