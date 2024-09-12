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
    public class CasoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CasoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Caso
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Casos.Include(c => c.IdClienteNavigation).Include(c => c.IdDetectiveNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Caso/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Casos == null)
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

        // GET: Caso/Create
        public IActionResult Create()
        {
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id");
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id");
            return View();
        }

        // POST: Caso/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdCliente,IdDetective,Descripcion")] Caso caso)
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
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Casos == null)
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
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IdCliente,IdDetective,Descripcion")] Caso caso)
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
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Casos == null)
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
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Casos == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Casos'  is null.");
            }
            var caso = await _context.Casos.FindAsync(id);
            if (caso != null)
            {
                _context.Casos.Remove(caso);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CasoExists(int id)
        {
          return (_context.Casos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
