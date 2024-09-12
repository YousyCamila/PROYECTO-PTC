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
    public class TipoEvidenciaController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TipoEvidenciaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TipoEvidencia
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.TipoEvidencia.Include(t => t.IdEvidenciaNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: TipoEvidencia/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TipoEvidencia == null)
            {
                return NotFound();
            }

            var tipoEvidencium = await _context.TipoEvidencia
                .Include(t => t.IdEvidenciaNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (tipoEvidencium == null)
            {
                return NotFound();
            }

            return View(tipoEvidencium);
        }

        // GET: TipoEvidencia/Create
        public IActionResult Create()
        {
            ViewData["IdEvidencia"] = new SelectList(_context.Evidencia, "Id", "Id");
            return View();
        }

        // POST: TipoEvidencia/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdEvidencia,Descripcion")] TipoEvidencium tipoEvidencium)
        {
            if (ModelState.IsValid)
            {
                _context.Add(tipoEvidencium);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdEvidencia"] = new SelectList(_context.Evidencia, "Id", "Id", tipoEvidencium.IdEvidencia);
            return View(tipoEvidencium);
        }

        // GET: TipoEvidencia/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TipoEvidencia == null)
            {
                return NotFound();
            }

            var tipoEvidencium = await _context.TipoEvidencia.FindAsync(id);
            if (tipoEvidencium == null)
            {
                return NotFound();
            }
            ViewData["IdEvidencia"] = new SelectList(_context.Evidencia, "Id", "Id", tipoEvidencium.IdEvidencia);
            return View(tipoEvidencium);
        }

        // POST: TipoEvidencia/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IdEvidencia,Descripcion")] TipoEvidencium tipoEvidencium)
        {
            if (id != tipoEvidencium.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tipoEvidencium);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TipoEvidenciumExists(tipoEvidencium.Id))
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
            ViewData["IdEvidencia"] = new SelectList(_context.Evidencia, "Id", "Id", tipoEvidencium.IdEvidencia);
            return View(tipoEvidencium);
        }

        // GET: TipoEvidencia/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TipoEvidencia == null)
            {
                return NotFound();
            }

            var tipoEvidencium = await _context.TipoEvidencia
                .Include(t => t.IdEvidenciaNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (tipoEvidencium == null)
            {
                return NotFound();
            }

            return View(tipoEvidencium);
        }

        // POST: TipoEvidencia/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TipoEvidencia == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TipoEvidencia'  is null.");
            }
            var tipoEvidencium = await _context.TipoEvidencia.FindAsync(id);
            if (tipoEvidencium != null)
            {
                _context.TipoEvidencia.Remove(tipoEvidencium);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TipoEvidenciumExists(int id)
        {
          return (_context.TipoEvidencia?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
