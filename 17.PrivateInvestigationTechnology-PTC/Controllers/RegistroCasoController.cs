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
    public class RegistroCasoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RegistroCasoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: RegistroCaso
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.RegistroCasos.Include(r => r.IdCasoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: RegistroCaso/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.RegistroCasos == null)
            {
                return NotFound();
            }

            var registroCaso = await _context.RegistroCasos
                .Include(r => r.IdCasoNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (registroCaso == null)
            {
                return NotFound();
            }

            return View(registroCaso);
        }

        // GET: RegistroCaso/Create
        public IActionResult Create()
        {
            ViewData["IdCaso"] = new SelectList(_context.Casos, "Id", "Id");
            return View();
        }

        // POST: RegistroCaso/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdCaso,Descripcion")] RegistroCaso registroCaso)
        {
            if (ModelState.IsValid)
            {
                _context.Add(registroCaso);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCaso"] = new SelectList(_context.Casos, "Id", "Id", registroCaso.IdCaso);
            return View(registroCaso);
        }

        // GET: RegistroCaso/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.RegistroCasos == null)
            {
                return NotFound();
            }

            var registroCaso = await _context.RegistroCasos.FindAsync(id);
            if (registroCaso == null)
            {
                return NotFound();
            }
            ViewData["IdCaso"] = new SelectList(_context.Casos, "Id", "Id", registroCaso.IdCaso);
            return View(registroCaso);
        }

        // POST: RegistroCaso/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IdCaso,Descripcion")] RegistroCaso registroCaso)
        {
            if (id != registroCaso.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(registroCaso);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RegistroCasoExists(registroCaso.Id))
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
            ViewData["IdCaso"] = new SelectList(_context.Casos, "Id", "Id", registroCaso.IdCaso);
            return View(registroCaso);
        }

        // GET: RegistroCaso/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.RegistroCasos == null)
            {
                return NotFound();
            }

            var registroCaso = await _context.RegistroCasos
                .Include(r => r.IdCasoNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (registroCaso == null)
            {
                return NotFound();
            }

            return View(registroCaso);
        }

        // POST: RegistroCaso/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.RegistroCasos == null)
            {
                return Problem("Entity set 'ApplicationDbContext.RegistroCasos'  is null.");
            }
            var registroCaso = await _context.RegistroCasos.FindAsync(id);
            if (registroCaso != null)
            {
                _context.RegistroCasos.Remove(registroCaso);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RegistroCasoExists(int id)
        {
          return (_context.RegistroCasos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
