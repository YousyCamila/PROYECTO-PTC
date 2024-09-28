using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Models;
using _17.PrivateInvestigationTechnology_PTC.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    public class AuditoriaController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;  // UserManager para manejar los usuarios de Identity

        public AuditoriaController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Auditoria
        public async Task<IActionResult> Index()
        {
            var auditoria = _context.Auditoria.Include(a => a.IdentityUser);
            return View(await auditoria.ToListAsync());
        }

        // GET: Auditoria/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Auditoria == null)
            {
                return NotFound();
            }

            var auditorium = await _context.Auditoria
                .Include(a => a.IdentityUser)  // Relacionar con IdentityUser
                .FirstOrDefaultAsync(m => m.Id == id);
            if (auditorium == null)
            {
                return NotFound();
            }

            return View(auditorium);
        }

        // GET: Auditoria/Create
        public IActionResult Create()
        {
            ViewData["IdentityUserId"] = new SelectList(_userManager.Users, "Id", "UserName");  // Utilizar UserManager para obtener usuarios
            return View();
        }

        // POST: Auditoria/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdentityUserId,Descripcion")] Auditorium auditorium)
        {
            if (ModelState.IsValid)
            {
                _context.Add(auditorium);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdentityUserId"] = new SelectList(_userManager.Users, "Id", "UserName", auditorium.IdentityUserId);
            return View(auditorium);
        }

        // GET: Auditoria/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Auditoria == null)
            {
                return NotFound();
            }

            var auditorium = await _context.Auditoria.FindAsync(id);
            if (auditorium == null)
            {
                return NotFound();
            }
            ViewData["IdentityUserId"] = new SelectList(_userManager.Users, "Id", "UserName", auditorium.IdentityUserId);
            return View(auditorium);
        }

        // POST: Auditoria/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IdentityUserId,Descripcion")] Auditorium auditorium)
        {
            if (id != auditorium.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(auditorium);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AuditoriumExists(auditorium.Id))
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
            ViewData["IdentityUserId"] = new SelectList(_userManager.Users, "Id", "UserName", auditorium.IdentityUserId);
            return View(auditorium);
        }

        // GET: Auditoria/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Auditoria == null)
            {
                return NotFound();
            }

            var auditorium = await _context.Auditoria
                .Include(a => a.IdentityUser)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (auditorium == null)
            {
                return NotFound();
            }

            return View(auditorium);
        }

        // POST: Auditoria/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Auditoria == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Auditoria'  is null.");
            }
            var auditorium = await _context.Auditoria.FindAsync(id);
            if (auditorium != null)
            {
                _context.Auditoria.Remove(auditorium);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AuditoriumExists(int id)
        {
            return _context.Auditoria?.Any(e => e.Id == id) ?? false;
        }
    }
}
