using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
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
            var detectives = await _context.Detectives
                                           .Include(d => d.IdentityUser) // Incluir el IdentityUser relacionado
                                           .ToListAsync();
            return View(detectives);
        }

        // GET: Detective/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Detective/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("NumeroIdentidad")] Detective detective, string email, string phoneNumber, string fullName, string password, IFormFile HojaDeVidaFile, IFormFile FotoPerfilFile)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    PhoneNumber = phoneNumber,
                    FullName = fullName
                };

                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    // Asignar el nuevo IdentityUserId al detective
                    detective.IdentityUserId = user.Id;

                    // Guardar archivos, si los hay
                    if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await HojaDeVidaFile.CopyToAsync(memoryStream);
                            detective.HojaDeVida = memoryStream.ToArray();
                        }
                    }

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
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
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

            var detective = await _context.Detectives
                                          .Include(d => d.IdentityUser) // Incluir el IdentityUser relacionado
                                          .FirstOrDefaultAsync(m => m.Id == id);
            if (detective == null)
            {
                return NotFound();
            }

            return View(detective);
        }

        // POST: Detective/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,NumeroIdentidad")] Detective detective, string email, string phoneNumber, string fullName, IFormFile HojaDeVidaFile, IFormFile FotoPerfilFile)
        {
            if (id != detective.Id)
            {
                return NotFound();
            }

            var existingDetective = await _context.Detectives
                                                  .Include(d => d.IdentityUser) // Incluir el IdentityUser relacionado
                                                  .FirstOrDefaultAsync(d => d.Id == id);
            if (existingDetective == null)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // Actualizar los campos de IdentityUser
                    if (existingDetective.IdentityUser != null)
                    {
                        existingDetective.IdentityUser.Email = email;
                        existingDetective.IdentityUser.PhoneNumber = phoneNumber;
                        existingDetective.IdentityUser.FullName = fullName;

                        await _userManager.UpdateAsync(existingDetective.IdentityUser); // Actualizar ApplicationUser
                    }

                    // Mantener el IdentityUserId
                    detective.IdentityUserId = existingDetective.IdentityUserId;

                    // Actualizar archivos si se suben nuevos
                    if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await HojaDeVidaFile.CopyToAsync(memoryStream);
                            detective.HojaDeVida = memoryStream.ToArray();
                        }
                    }

                    if (FotoPerfilFile != null && FotoPerfilFile.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await FotoPerfilFile.CopyToAsync(memoryStream);
                            detective.FotoPerfil = memoryStream.ToArray();
                        }
                    }

                    _context.Entry(existingDetective).CurrentValues.SetValues(detective);
                    await _context.SaveChangesAsync();
                    TempData["SuccessMessage"] = "Detective actualizado con éxito.";
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
                                          .Include(d => d.IdentityUser) // Incluir el IdentityUser relacionado
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
            var detective = await _context.Detectives
                                          .Include(d => d.IdentityUser)
                                          .FirstOrDefaultAsync(d => d.Id == id);

            if (detective != null)
            {
                if (detective.IdentityUser != null)
                {
                    await _userManager.DeleteAsync(detective.IdentityUser); // Eliminar el usuario de Identity también
                }

                _context.Detectives.Remove(detective);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "Detective eliminado con éxito.";
            }

            return RedirectToAction(nameof(Index));
        }

        private bool DetectiveExists(int id)
        {
            return _context.Detectives.Any(e => e.Id == id);
        }
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var detective = await _context.Detectives
                .Include(d => d.IdentityUser) // Incluye el usuario relacionado
                .FirstOrDefaultAsync(d => d.Id == id);
            if (detective == null)
            {
                return NotFound();
            }

            return View(detective);
        }
        // Acción para previsualizar la Hoja de Vida
        public async Task<IActionResult> PreviewHojaDeVida(int id)
        {
            var detective = await _context.Detectives.FindAsync(id);
            if (detective == null || detective.HojaDeVida == null)
            {
                return NotFound();
            }

            // Verificar si el archivo es un PDF
            string contentType = "application/pdf";
            return File(detective.HojaDeVida, contentType);
        }

        // Acción para descargar la Hoja de Vida
        public async Task<IActionResult> DownloadHojaDeVida(int id)
        {
            var detective = await _context.Detectives.FindAsync(id);
            if (detective == null || detective.HojaDeVida == null)
            {
                return NotFound();
            }

            // Puedes establecer el nombre y el tipo del archivo aquí
            return File(detective.HojaDeVida, "application/octet-stream", "HojaDeVida.pdf");
        }
    }
}
