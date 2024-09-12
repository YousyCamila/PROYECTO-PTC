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
    public class DetectiveController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DetectiveController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Detective
        public async Task<IActionResult> Index()
        {
              return _context.Detectives != null ? 
                          View(await _context.Detectives.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Detectives'  is null.");
        }

        // GET: Detective/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Detectives == null)
            {
                return NotFound();
            }

            var detective = await _context.Detectives
                .FirstOrDefaultAsync(m => m.Id == id);
            if (detective == null)
            {
                return NotFound();
            }

            return View(detective);
        }

        // GET: Detective/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Detective/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nombre")] Detective detective)
        {
            if (ModelState.IsValid)
            {
                _context.Add(detective);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(detective);
        }

        // GET: Detective/Edit/5
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
            return View(detective);
        }

        // POST: Detective/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nombre")] Detective detective)
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
            return View(detective);
        }

        // GET: Detective/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Detectives == null)
            {
                return NotFound();
            }

            var detective = await _context.Detectives
                .FirstOrDefaultAsync(m => m.Id == id);
            if (detective == null)
            {
                return NotFound();
            }

            return View(detective);
        }

        // POST: Detective/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Detectives == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Detectives'  is null.");
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
