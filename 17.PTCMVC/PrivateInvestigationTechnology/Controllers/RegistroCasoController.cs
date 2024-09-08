using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PrivateInvestigationTechnology.Datos;
using PrivateInvestigationTechnology.Models;

namespace PrivateInvestigationTechnology.Controllers
{
    public class RegistroCasosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RegistroCasosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: RegistroCasos
        public async Task<IActionResult> Index()
        {
            var registros = await _context.RegistroCasos
                .Include(r => r.IdCasosNavigation)
                .ToListAsync();
            return View(registros);
        }

        // GET: RegistroCasos/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.RegistroCasos == null)
            {
                return NotFound();
            }

            var registroCaso = await _context.RegistroCasos
                .Include(r => r.IdCasosNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (registroCaso == null)
            {
                return NotFound();
            }

            return View(registroCaso);
        }

        // GET: RegistroCasos/Create
        public IActionResult Create()
        {
            ViewData["IdCasos"] = new SelectList(_context.Casos, "Id", "Id");
            return View();
        }

        // POST: RegistroCasos/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Descripcion,FechaInicio,FechaFinalizacion,EstadoRegistro,SeguimientoPorcentaje,IdCasos")] RegistroCaso registroCaso)
        {
            if (ModelState.IsValid)
            {
                _context.Add(registroCaso);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCasos"] = new SelectList(_context.Casos, "Id", "Id", registroCaso.IdCasos);
            return View(registroCaso);
        }

        // GET: RegistroCasos/Edit/5
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
            ViewData["IdCasos"] = new SelectList(_context.Casos, "Id", "Id", registroCaso.IdCasos);
            return View(registroCaso);
        }

        // POST: RegistroCasos/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Descripcion,FechaInicio,FechaFinalizacion,EstadoRegistro,SeguimientoPorcentaje,IdCasos")] RegistroCaso registroCaso)
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
            ViewData["IdCasos"] = new SelectList(_context.Casos, "Id", "Id", registroCaso.IdCasos);
            return View(registroCaso);
        }

        // Barra de progreso del caso
        public async Task<IActionResult> Progreso(int id)
        {
            var registroCaso = await _context.RegistroCasos
                .Where(r => r.Id == id)
                .Select(r => new { r.SeguimientoPorcentaje })
                .FirstOrDefaultAsync();

            if (registroCaso == null)
            {
                return NotFound();
            }

            // Enviar el porcentaje de progreso a la vista
            return Json(registroCaso);
        }

        private bool RegistroCasoExists(int id)
        {
            return (_context.RegistroCasos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
