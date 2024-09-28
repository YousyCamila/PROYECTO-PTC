using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    [Authorize(Roles = "Administrador, SuperUsuario")]
    public class DetectiveController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public DetectiveController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Detective
        public async Task<IActionResult> Index()
        {
            var detectives = await _context.Detectives.Include(d => d.IdentityUser).ToListAsync();
            return View(detectives);
        }

        // GET: Detective/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var detective = await _context.Detectives
                .Include(d => d.IdentityUser)
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
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Nombre,NumeroIdentidad,NumeroCelular,FechaNacimiento")] Detective detective, IFormFile HojaDeVidaFile)
        {
            if (ModelState.IsValid)
            {
                if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await HojaDeVidaFile.CopyToAsync(memoryStream);
                        detective.HojaDeVida = memoryStream.ToArray(); // Convertir el archivo a byte[]
                    }
                }

                _context.Add(detective);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(detective);
        }

        // GET: Detective/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
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
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nombre,NumeroIdentidad,NumeroCelular,FechaNacimiento")] Detective detective, IFormFile HojaDeVidaFile)
        {
            if (id != detective.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await HojaDeVidaFile.CopyToAsync(memoryStream);
                            detective.HojaDeVida = memoryStream.ToArray(); // Convertir el archivo a byte[]
                        }
                    }

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
            if (id == null)
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
            var detective = await _context.Detectives.FindAsync(id);
            if (detective != null)
            {
                _context.Detectives.Remove(detective);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        // Método para descargar la hoja de vida
        [HttpGet]
        public IActionResult DownloadCV(int id)
        {
            var detective = _context.Detectives.Find(id);

            if (detective == null || detective.HojaDeVida == null)
            {
                return NotFound();
            }

            // Devuelve el archivo de hoja de vida como una descarga
            return File(detective.HojaDeVida, "application/pdf", $"{detective.Nombre}_CV.pdf");
        }

        private bool DetectiveExists(int id)
        {
            return _context.Detectives.Any(e => e.Id == id);
        }
    }
}
