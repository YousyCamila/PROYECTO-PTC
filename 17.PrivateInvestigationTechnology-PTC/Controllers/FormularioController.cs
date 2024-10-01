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
    public class FormularioController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FormularioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Formulario
        public IActionResult Index()
        {
            return View();
        }

        // Acción para manejar la presentación del formulario
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(Formulario formulario)
        {
            if (ModelState.IsValid)
            {
                // Guardar el formulario en la base de datos
                _context.Formularios.Add(formulario);
                await _context.SaveChangesAsync();

				// Redirigir a una página de confirmación
				return RedirectToAction("Confirmacion");
			}

            // Si el modelo no es válido, volver a mostrar el formulario con los errores
            return View(formulario);
        }

		[HttpGet]
		public IActionResult Confirmacion()
		{
			return View();
		}



        public async Task<IActionResult> IndexAdministracion()
        {
            var formularios = await _context.Formularios.ToListAsync();
            return View(formularios);
        }

        // GET: Formulario/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var formulario = await _context.Formularios
                .FirstOrDefaultAsync(m => m.Id == id);
            if (formulario == null)
            {
                return NotFound();
            }

            return View(formulario);
        }

        // POST: Formulario/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var formulario = await _context.Formularios.FindAsync(id);
            if (formulario != null)
            {
                _context.Formularios.Remove(formulario);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(IndexAdministracion));
        }

        // GET: Formulario/Delete/5 (optional, if you want to show a confirmation page)
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var formulario = await _context.Formularios
                .FirstOrDefaultAsync(m => m.Id == id);
            if (formulario == null)
            {
                return NotFound();
            }

            return View(formulario);
        }
    }
}