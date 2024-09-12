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
    public class HistorialController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HistorialController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Historial
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Historials.Include(h => h.IdClienteNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Historial/Details/5
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

            return View(historial);
        }

        // GET: Historial/Create
        public IActionResult Create()
        {
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id");
            return View();
        }

        // POST: Historial/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdCliente,Descripcion")] Historial historial)
        {
            if (ModelState.IsValid)
            {
                _context.Add(historial);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", historial.IdCliente);
            return View(historial);
        }

        // GET: Historial/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Historials == null)
            {
                return NotFound();
            }

            var historial = await _context.Historials.FindAsync(id);
            if (historial == null)
            {
                return NotFound();
            }
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", historial.IdCliente);
            return View(historial);
        }

        // POST: Historial/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IdCliente,Descripcion")] Historial historial)
        {
            if (id != historial.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(historial);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!HistorialExists(historial.Id))
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
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", historial.IdCliente);
            return View(historial);
        }

        // GET: Historial/Delete/5
        public async Task<IActionResult> Delete(int? id)
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

            return View(historial);
        }

        // POST: Historial/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Historials == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Historials'  is null.");
            }
            var historial = await _context.Historials.FindAsync(id);
            if (historial != null)
            {
                _context.Historials.Remove(historial);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool HistorialExists(int id)
        {
          return (_context.Historials?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
