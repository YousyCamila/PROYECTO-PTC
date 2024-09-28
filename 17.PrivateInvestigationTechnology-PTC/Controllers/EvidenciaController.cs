using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    public class EvidenciaController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EvidenciaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Evidencia
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Evidencias.Include(e => e.IdCasoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Evidencia/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Evidencias == null)
            {
                return NotFound();
            }

            var evidencium = await _context.Evidencias
                .Include(e => e.IdCasoNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (evidencium == null)
            {
                return NotFound();
            }

            return View(evidencium);
        }

        // GET: Evidencia/Create
        public IActionResult Create()
        {
            ViewData["IdCaso"] = new SelectList(_context.Casos, "Id", "Id");
            return View();
        }

        // POST: Evidencia/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdCaso,Descripcion")] Evidencium evidencium)
        {
            if (ModelState.IsValid)
            {
                _context.Add(evidencium);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCaso"] = new SelectList(_context.Casos, "Id", "Id", evidencium.IdCaso);
            return View(evidencium);
        }

        // GET: Evidencia/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Evidencias == null)
            {
                return NotFound();
            }

            var evidencium = await _context.Evidencias.FindAsync(id);
            if (evidencium == null)
            {
                return NotFound();
            }
            ViewData["IdCaso"] = new SelectList(_context.Casos, "Id", "Id", evidencium.IdCaso);
            return View(evidencium);
        }

        // POST: Evidencia/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IdCaso,Descripcion")] Evidencium evidencium)
        {
            if (id != evidencium.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(evidencium);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EvidenciumExists(evidencium.Id))
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
            ViewData["IdCaso"] = new SelectList(_context.Casos, "Id", "Id", evidencium.IdCaso);
            return View(evidencium);
        }

        // GET: Evidencia/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Evidencias == null)
            {
                return NotFound();
            }

            var evidencium = await _context.Evidencias
                .Include(e => e.IdCasoNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (evidencium == null)
            {
                return NotFound();
            }

            return View(evidencium);
        }

        // POST: Evidencia/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Evidencias == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Evidencia'  is null.");
            }
            var evidencium = await _context.Evidencias.FindAsync(id);
            if (evidencium != null)
            {
                _context.Evidencias.Remove(evidencium);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool EvidenciumExists(int id)
        {
          return (_context.Evidencias?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
