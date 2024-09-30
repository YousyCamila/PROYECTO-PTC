﻿using System;
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
    public class RegistroMantenimientoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RegistroMantenimientoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: RegistroMantenimiento
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.RegistroMantenimientos.Include(r => r.IdAdministradorNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: RegistroMantenimiento/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.RegistroMantenimientos == null)
            {
                return NotFound();
            }

            var registroMantenimiento = await _context.RegistroMantenimientos
                .Include(r => r.IdAdministradorNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (registroMantenimiento == null)
            {
                return NotFound();
            }

            return View(registroMantenimiento);
        }

        // GET: RegistroMantenimiento/Create
        public IActionResult Create()
        {
            ViewData["IdAdministrador"] = new SelectList(_context.Administradors, "Id", "Id");
            return View();
        }

        // POST: RegistroMantenimiento/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Descripcion,FechaInicio,FechaFinal,Estado,IdAdministrador")] RegistroMantenimiento registroMantenimiento)
        {
            if (ModelState.IsValid)
            {
                _context.Add(registroMantenimiento);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdAdministrador"] = new SelectList(_context.Administradors, "Id", "Id", registroMantenimiento.IdAdministrador);
            return View(registroMantenimiento);
        }

        // GET: RegistroMantenimiento/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.RegistroMantenimientos == null)
            {
                return NotFound();
            }

            var registroMantenimiento = await _context.RegistroMantenimientos.FindAsync(id);
            if (registroMantenimiento == null)
            {
                return NotFound();
            }
            ViewData["IdAdministrador"] = new SelectList(_context.Administradors, "Id", "Id", registroMantenimiento.IdAdministrador);
            return View(registroMantenimiento);
        }

        // POST: RegistroMantenimiento/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Descripcion,FechaInicio,FechaFinal,Estado,IdAdministrador")] RegistroMantenimiento registroMantenimiento)
        {
            if (id != registroMantenimiento.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(registroMantenimiento);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RegistroMantenimientoExists(registroMantenimiento.Id))
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
            ViewData["IdAdministrador"] = new SelectList(_context.Administradors, "Id", "Id", registroMantenimiento.IdAdministrador);
            return View(registroMantenimiento);
        }

        // GET: RegistroMantenimiento/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.RegistroMantenimientos == null)
            {
                return NotFound();
            }

            var registroMantenimiento = await _context.RegistroMantenimientos
                .Include(r => r.IdAdministradorNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (registroMantenimiento == null)
            {
                return NotFound();
            }

            return View(registroMantenimiento);
        }

        // POST: RegistroMantenimiento/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.RegistroMantenimientos == null)
            {
                return Problem("Entity set 'ApplicationDbContext.RegistroMantenimientos'  is null.");
            }
            var registroMantenimiento = await _context.RegistroMantenimientos.FindAsync(id);
            if (registroMantenimiento != null)
            {
                _context.RegistroMantenimientos.Remove(registroMantenimiento);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RegistroMantenimientoExists(int id)
        {
          return (_context.RegistroMantenimientos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}