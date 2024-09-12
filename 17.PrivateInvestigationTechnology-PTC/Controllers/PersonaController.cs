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
    public class PersonaController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PersonaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Persona
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Personas.Include(p => p.IdAdministradorNavigation).Include(p => p.IdClienteNavigation).Include(p => p.IdDetectiveNavigation).Include(p => p.IdUsuarioNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Persona/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Personas == null)
            {
                return NotFound();
            }

            var persona = await _context.Personas
                .Include(p => p.IdAdministradorNavigation)
                .Include(p => p.IdClienteNavigation)
                .Include(p => p.IdDetectiveNavigation)
                .Include(p => p.IdUsuarioNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (persona == null)
            {
                return NotFound();
            }

            return View(persona);
        }

        // GET: Persona/Create
        public IActionResult Create()
        {
            ViewData["IdAdministrador"] = new SelectList(_context.Administradors, "Id", "Id");
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id");
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id");
            ViewData["IdUsuario"] = new SelectList(_context.Usuarios, "Id", "Id");
            return View();
        }

        // POST: Persona/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdUsuario,Nombre,IdAdministrador,IdDetective,IdCliente")] Persona persona)
        {
            if (ModelState.IsValid)
            {
                _context.Add(persona);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdAdministrador"] = new SelectList(_context.Administradors, "Id", "Id", persona.IdAdministrador);
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", persona.IdCliente);
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id", persona.IdDetective);
            ViewData["IdUsuario"] = new SelectList(_context.Usuarios, "Id", "Id", persona.IdUsuario);
            return View(persona);
        }

        // GET: Persona/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Personas == null)
            {
                return NotFound();
            }

            var persona = await _context.Personas.FindAsync(id);
            if (persona == null)
            {
                return NotFound();
            }
            ViewData["IdAdministrador"] = new SelectList(_context.Administradors, "Id", "Id", persona.IdAdministrador);
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", persona.IdCliente);
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id", persona.IdDetective);
            ViewData["IdUsuario"] = new SelectList(_context.Usuarios, "Id", "Id", persona.IdUsuario);
            return View(persona);
        }

        // POST: Persona/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IdUsuario,Nombre,IdAdministrador,IdDetective,IdCliente")] Persona persona)
        {
            if (id != persona.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(persona);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PersonaExists(persona.Id))
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
            ViewData["IdAdministrador"] = new SelectList(_context.Administradors, "Id", "Id", persona.IdAdministrador);
            ViewData["IdCliente"] = new SelectList(_context.Clientes, "Id", "Id", persona.IdCliente);
            ViewData["IdDetective"] = new SelectList(_context.Detectives, "Id", "Id", persona.IdDetective);
            ViewData["IdUsuario"] = new SelectList(_context.Usuarios, "Id", "Id", persona.IdUsuario);
            return View(persona);
        }

        // GET: Persona/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Personas == null)
            {
                return NotFound();
            }

            var persona = await _context.Personas
                .Include(p => p.IdAdministradorNavigation)
                .Include(p => p.IdClienteNavigation)
                .Include(p => p.IdDetectiveNavigation)
                .Include(p => p.IdUsuarioNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (persona == null)
            {
                return NotFound();
            }

            return View(persona);
        }

        // POST: Persona/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Personas == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Personas'  is null.");
            }
            var persona = await _context.Personas.FindAsync(id);
            if (persona != null)
            {
                _context.Personas.Remove(persona);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PersonaExists(int id)
        {
          return (_context.Personas?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
