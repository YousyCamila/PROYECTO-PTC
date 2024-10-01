using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization; // Necesario para [Authorize]
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PrivateInvestigationTechnology.Datos;
using PrivateInvestigationTechnology.Models;

namespace PrivateInvestigationTechnology.Controllers
{
    [Authorize(Roles = "Administrador")] // Solo los usuarios con el rol 'Administrador' tienen acceso
    public class DetectivesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DetectivesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Detectives
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Detectives.Include(d => d.IdNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Detectives/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Detectives == null)
            {
                return NotFound();
            }

            var detective = await _context.Detectives
                .Include(d => d.IdNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (detective == null)
            {
                return NotFound();
            }

            return View(detective);
        }

        // GET: Detectives/Create
        public IActionResult Create()
        {
            ViewData["Id"] = new SelectList(_context.Personas, "Id", "Id");
            return View();
        }

        // POST: Detectives/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Especialidad")] Detective detective)
        {
            if (ModelState.IsValid)
            {
                _context.Add(detective);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["Id"] = new SelectList(_context.Personas, "Id", "Id", detective.Id);
            return View(detective);
        }

        // GET: Detectives/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Detectives == null)
            {
                return NotFound();
            }

            var detective = await _context.Detectives.FindAsync(id);
            if (detective == null)
            {
                return NotFound();
            }
            ViewData["Id"] = new SelectList(_context.Personas, "Id", "Id", detective.Id);
            return View(detective);
        }

        // POST: Detectives/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Especialidad")] Detective detective)
        {
            if (id != detective.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(detective);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DetectiveExists(detective.Id))
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
            ViewData["Id"] = new SelectList(_context.Personas, "Id", "Id", detective.Id);
            return View(detective);
        }

        // GET: Detectives/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Detectives == null)
            {
                return NotFound();
            }

            var detective = await _context.Detectives
                .Include(d => d.IdNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (detective == null)
            {
                return NotFound();
            }

            return View(detective);
        }

        // POST: Detectives/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Detectives == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Detectives' is null.");
            }
            var detective = await _context.Detectives.FindAsync(id);
            if (detective != null)
            {
                _context.Detectives.Remove(detective);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DetectiveExists(int id)
        {
            return (_context.Detectives?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
