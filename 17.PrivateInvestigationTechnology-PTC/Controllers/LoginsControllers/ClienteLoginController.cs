using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    public class CasosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CasosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Acción para mostrar el listado de todos los casos
        public async Task<IActionResult> Index()
        {
            var casos = await _context.Casos
                .Include(c => c.IdCliente) // Incluimos al cliente si es necesario mostrar esa información
                .ToListAsync(); // Obtén todos los casos de la base de datos

            return View(casos); // Pasa la lista de casos a la vista
        }

        // Acción para ver el estado del caso
        public async Task<IActionResult> EstadoDelCaso(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var caso = await _context.Casos
                .Include(c => c.IdCliente) // Incluimos al cliente en caso de que necesitemos información adicional
                .Include(c => c.Evidencia) // Incluimos la relación con Evidencias
                .FirstOrDefaultAsync(m => m.Id == id);

            if (caso == null)
            {
                return NotFound();
            }

            return View(caso);
        }

        // Acción para ver el historial de casos
        public async Task<IActionResult> HistorialDelCaso(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var historial = await _context.Historiales
                .Where(h => h.Id == id)
                .OrderBy(h => h.Descripcion) // Ordena por una propiedad que tenga sentido
                .ToListAsync();

            if (historial == null)
            {
                return NotFound();
            }

            ViewBag.CasoId = id;
            return View(historial);
        }

        // Acción para mostrar la vista de subir evidencia
        public IActionResult SubirEvidencium(int? Idcaso)
        {
            if (Idcaso == null)
            {
                return NotFound();
            }

            // Pasamos el casoId a la vista
            return View(new Evidencium { IdCaso = Idcaso.Value });
        }

        // Acción para manejar la subida de archivos
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SubirEvidencium(Evidencium evidencium, IFormFile archivo, int nombreArchivo)
        {
            if (archivo != null && archivo.Length > 0)
            {
                var extension = Path.GetExtension(archivo.FileName).ToLower();
                var Archivo = Path.GetFileNameWithoutExtension(archivo.FileName) + "_" + DateTime.Now.Ticks + extension;
                var rutaArchivo = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/evidencias", Archivo);

                // Validamos que el archivo sea un formato válido
                var formatosPermitidos = new[] { ".jpg", ".jpeg", ".png", ".mp4", ".mp3", ".wav", ".avi" };

                if (!formatosPermitidos.Contains(extension))
                {
                    ModelState.AddModelError(string.Empty, "Formato de archivo no permitido.");
                    return View(evidencium);
                }

                // Guardar archivo en la ruta especificada
                using (var stream = new FileStream(rutaArchivo, FileMode.Create))
                {
                    await archivo.CopyToAsync(stream);
                }

                // Guardar los datos de la evidencia en la base de datos
                evidencium.Id = nombreArchivo;
                evidencium.IdCaso = 123; // Asigna el ID del caso correctamente
                evidencium.RutaArchivo = $"/evidencias/{Archivo}"; // Usamos la variable 'Archivo' para guardar el nombre correcto

                _context.Evidencias.Add(evidencium);
                await _context.SaveChangesAsync();

                // Redirigimos a los detalles del caso
                return RedirectToAction("EstadoDelCaso", new { id = evidencium.IdCaso });
            }

            ModelState.AddModelError(string.Empty, "Por favor seleccione un archivo para subir.");
            return View(evidencium);
        }
    }
}
