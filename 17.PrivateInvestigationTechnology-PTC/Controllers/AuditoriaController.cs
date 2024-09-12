using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Models;
using _17.PrivateInvestigationTechnology_PTC.Data;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
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
            var applicationDbContext = _context.Auditoria.Include(a => a.IdUsuarioNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Auditoria/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Auditoria == null)
            {
                return NotFound();
            }

            var auditorium = await _context.Auditoria
                .Include(a => a.IdUsuarioNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (auditorium == null)
            {
                return NotFound();
            }

            return View(auditorium);
        }

        // GET: Auditoria/Create
        public IActionResult Create()
        {
            ViewData["IdUsuario"] = new SelectList(_context.Usuarios, "Id", "Id");
            return View();
        }

        // POST: Auditoria/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdUsuario,Descripcion")] Auditorium auditorium)
        {
            if (ModelState.IsValid)
            {
                _context.Add(auditorium);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdUsuario"] = new SelectList(_context.Usuarios, "Id", "Id", auditorium.IdUsuario);
            return View(auditorium);
        }

        // GET: Auditoria/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Auditoria == null)
            {
                return NotFound();
            }

            var auditorium = await _context.Auditoria.FindAsync(id);
            if (auditorium == null)
            {
                return NotFound();
            }
            ViewData["IdUsuario"] = new SelectList(_context.Usuarios, "Id", "Id", auditorium.IdUsuario);
            return View(auditorium);
        }

        // POST: Auditoria/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IdUsuario,Descripcion")] Auditorium auditorium)
        {
            if (id != auditorium.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(auditorium);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AuditoriumExists(auditorium.Id))
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
            ViewData["IdUsuario"] = new SelectList(_context.Usuarios, "Id", "Id", auditorium.IdUsuario);
            return View(auditorium);
        }

        // GET: Auditoria/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Auditoria == null)
            {
                return NotFound();
            }

            var auditorium = await _context.Auditoria
                .Include(a => a.IdUsuarioNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (auditorium == null)
            {
                return NotFound();
            }

            return View(auditorium);
        }

        // POST: Auditoria/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Auditoria == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Auditoria'  is null.");
            }
            var auditorium = await _context.Auditoria.FindAsync(id);
            if (auditorium != null)
            {
                _context.Auditoria.Remove(auditorium);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AuditoriumExists(int id)
        {
          return (_context.Auditoria?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
