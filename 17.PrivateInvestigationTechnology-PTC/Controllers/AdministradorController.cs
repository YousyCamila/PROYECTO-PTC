using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    [Authorize(Roles = "Superusuario")]
    public class AdministradorController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AdministradorController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Administrador
        public async Task<IActionResult> Index()
        {
            var administradores = await _context.Administradores.Include(a => a.IdentityUser).ToListAsync();
            return View(administradores);
        }

        // GET: Administrador/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var administrador = await _context.Administradores
                .Include(a => a.IdentityUser)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (administrador == null)
            {
                return NotFound();
            }

            return View(administrador);
        }

        // GET: Administrador/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Administrador/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("NumeroIdentidad")] Administrador administrador, IFormFile HojaDeVidaFile, IFormFile FotoPerfilFile)
        {
            if (ModelState.IsValid)
            {
                // Subir Hoja de Vida
                if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await HojaDeVidaFile.CopyToAsync(memoryStream);
                        administrador.HojaDeVida = memoryStream.ToArray();
                    }
                }

                // Subir Foto de Perfil
                if (FotoPerfilFile != null && FotoPerfilFile.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await FotoPerfilFile.CopyToAsync(memoryStream);
                        administrador.FotoPerfil = memoryStream.ToArray();
                    }
                }

                _context.Add(administrador);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            return View(administrador);
        }

        // GET: Administrador/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var administrador = await _context.Administradores
                                              .Include(a => a.IdentityUser) // Incluye IdentityUser
                                              .FirstOrDefaultAsync(a => a.Id == id);

            if (administrador == null)
            {
                return NotFound();
            }

            return View(administrador);
        }

        // POST: Administrador/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,NumeroIdentidad")] Administrador administrador, IFormFile HojaDeVidaFile, IFormFile FotoPerfilFile)
        {
            if (id != administrador.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // Subir Hoja de Vida si se proporciona una nueva
                    if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await HojaDeVidaFile.CopyToAsync(memoryStream);
                            administrador.HojaDeVida = memoryStream.ToArray();
                        }
                    }

                    // Subir Foto de Perfil si se proporciona una nueva
                    if (FotoPerfilFile != null && FotoPerfilFile.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await FotoPerfilFile.CopyToAsync(memoryStream);
                            administrador.FotoPerfil = memoryStream.ToArray();
                        }
                    }

                    _context.Update(administrador);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AdministradorExists(administrador.Id))
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

            return View(administrador);
        }

        // GET: Administrador/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var administrador = await _context.Administradores
                                              .Include(a => a.IdentityUser) // Incluye IdentityUser
                                              .FirstOrDefaultAsync(a => a.Id == id);

            if (administrador == null)
            {
                return NotFound();
            }

            return View(administrador);
        }

        // POST: Administrador/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var administrador = await _context.Administradores.FindAsync(id);
            if (administrador != null)
            {
                _context.Administradores.Remove(administrador);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        // Acción para previsualizar la Hoja de Vida
        public async Task<IActionResult> PreviewHojaDeVida(int id)
        {
            var administrador = await _context.Administradores.FindAsync(id);
            if (administrador == null || administrador.HojaDeVida == null)
            {
                return NotFound();
            }

            string contentType = "application/pdf"; // Asume que la Hoja de Vida es un PDF
            return File(administrador.HojaDeVida, contentType);
        }

        // Acción para descargar la Hoja de Vida
        public async Task<IActionResult> DownloadHojaDeVida(int id)
        {
            var administrador = await _context.Administradores.FindAsync(id);
            if (administrador == null || administrador.HojaDeVida == null)
            {
                return NotFound();
            }

            return File(administrador.HojaDeVida, "application/octet-stream", "HojaDeVida.pdf");
        }

        // Método auxiliar para comprobar si existe el Administrador
        private bool AdministradorExists(int id)
        {
            return _context.Administradores.Any(e => e.Id == id);
        }
    }
}
