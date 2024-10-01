using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    [Authorize(Roles = "Administrador, SuperUsuario")]
    public class DetectiveController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public DetectiveController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
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
            if (id == null) return NotFound();

            var detective = await _context.Detectives
                .Include(d => d.IdentityUser)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (detective == null) return NotFound();

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
        public async Task<IActionResult> Create([Bind("NumeroIdentidad")] Detective detective, IFormFile HojaDeVidaFile, IFormFile FotoPerfilFile)
        {
            if (ModelState.IsValid)
            {
                // Procesar archivo de Hoja de Vida
                if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await HojaDeVidaFile.CopyToAsync(memoryStream);
                        detective.HojaDeVida = memoryStream.ToArray();
                    }
                }

                // Procesar archivo de Foto de Perfil
                if (FotoPerfilFile != null && FotoPerfilFile.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await FotoPerfilFile.CopyToAsync(memoryStream);
                        detective.FotoPerfil = memoryStream.ToArray();
                    }
                }

                _context.Add(detective);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "Detective creado con éxito.";
                return RedirectToAction(nameof(Index));
            }
            return View(detective);
        }

        // GET: Detective/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return NotFound();

            var detective = await _context.Detectives.Include(d => d.IdentityUser).FirstOrDefaultAsync(d => d.Id == id);
            if (detective == null) return NotFound();

            return View(detective);
        }

        // POST: Detective/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,NumeroIdentidad")] Detective detective, IFormFile HojaDeVidaFile, IFormFile FotoPerfilFile)
        {
            if (id != detective.Id) return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    // Procesar archivo de Hoja de Vida
                    if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await HojaDeVidaFile.CopyToAsync(memoryStream);
                            detective.HojaDeVida = memoryStream.ToArray();
                        }
                    }

                    // Procesar archivo de Foto de Perfil
                    if (FotoPerfilFile != null && FotoPerfilFile.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await FotoPerfilFile.CopyToAsync(memoryStream);
                            detective.FotoPerfil = memoryStream.ToArray();
                        }
                    }

                    _context.Update(detective);
                    await _context.SaveChangesAsync();
                    TempData["SuccessMessage"] = "Detective actualizado con éxito.";
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DetectiveExists(detective.Id)) return NotFound();
                    throw;
                }
                return RedirectToAction(nameof(Index));
            }
            return View(detective);
        }

        // GET: Detective/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();

            var detective = await _context.Detectives.Include(d => d.IdentityUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (detective == null) return NotFound();

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
                TempData["SuccessMessage"] = "Detective eliminado con éxito.";
            }
            else
            {
                TempData["ErrorMessage"] = "Error al eliminar el detective.";
            }
            return RedirectToAction(nameof(Index));
        }

        private bool DetectiveExists(int id)
        {
            return _context.Detectives.Any(e => e.Id == id);
        }
    }
}
