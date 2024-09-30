using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    [Authorize(Roles = "SuperUsuario")]
    public class AdministradorController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdministradorController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Administrador
        public async Task<IActionResult> Index()
        {
            var administradores = await _context.Administradores.Include(a => a.IdentityUser).ToListAsync();
            return View(administradores);
        }

        // GET: Administrador/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Administrador/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Nombre,NumeroIdentidad,PhoneNumber")] Administrador administrador, IFormFile HojaDeVidaFile, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                ModelState.AddModelError("", "Usuario no encontrado.");
                return View(administrador);
            }

            if (ModelState.IsValid)
            {
                if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await HojaDeVidaFile.CopyToAsync(memoryStream);
                        administrador.HojaDeVida = memoryStream.ToArray(); // Convertir el archivo a byte[]
                    }
                }

                administrador.IdentityUserId = user.Id; // Relacionar con ApplicationUser

                _context.Add(administrador);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(administrador);
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

        // GET: Administrador/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var administrador = await _context.Administradores.Include(a => a.IdentityUser).FirstOrDefaultAsync(a => a.Id == id);
            if (administrador == null)
            {
                return NotFound();
            }
            return View(administrador);
        }

        // POST: Administrador/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nombre,NumeroIdentidad,PhoneNumber")] Administrador administrador, IFormFile HojaDeVidaFile)
        {
            if (id != administrador.Id)
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
                            administrador.HojaDeVida = memoryStream.ToArray(); // Convertir el archivo a byte[]
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
                .FirstOrDefaultAsync(m => m.Id == id);
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

        private bool AdministradorExists(int id)
        {
            return _context.Administradores.Any(e => e.Id == id);
        }
    }
}
