using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using System.Linq;
using System.Threading.Tasks;

namespace _17.PrivateInvestigationTechnology_PTC.Controllers
{
    public class CasoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CasoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Caso
        public async Task<IActionResult> Index()
        {
            // Incluir Cliente y Detective (ApplicationUser) en la consulta
            var casos = await _context.Casos
                .Include(c => c.IdClienteNavigation).ThenInclude(c => c.IdentityUser)
                .Include(c => c.IdDetectiveNavigation).ThenInclude(d => d.IdentityUser)
                .ToListAsync();

            return View(casos);
        }

        // GET: Caso/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var caso = await _context.Casos
                .Include(c => c.IdClienteNavigation).ThenInclude(c => c.IdentityUser)
                .Include(c => c.IdDetectiveNavigation).ThenInclude(d => d.IdentityUser)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (caso == null)
            {
                return NotFound();
            }

            return View(caso);
        }

        // GET: Caso/Create
        public IActionResult Create()
        {
            // Cargar las listas de clientes y detectives (ApplicationUser)
            ViewData["Clientes"] = _context.Clientes.Include(c => c.IdentityUser).ToList();
            ViewData["Detectives"] = _context.Detectives.Include(d => d.IdentityUser).ToList();
            return View();
        }

        // POST: Caso/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Descripcion,IdCliente,IdDetective")] Caso caso)
        {
            if (ModelState.IsValid)
            {
                _context.Add(caso);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            // Si ocurre un error, cargar nuevamente las listas de clientes y detectives
            ViewData["Clientes"] = _context.Clientes.Include(c => c.IdentityUser).ToList();
            ViewData["Detectives"] = _context.Detectives.Include(d => d.IdentityUser).ToList();
            return View(caso);
        }

        // GET: Caso/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var caso = await _context.Casos.FindAsync(id);
            if (caso == null)
            {
                return NotFound();
            }

            // Cargar las listas de clientes y detectives (ApplicationUser)
            ViewData["Clientes"] = _context.Clientes.Include(c => c.IdentityUser).ToList();
            ViewData["Detectives"] = _context.Detectives.Include(d => d.IdentityUser).ToList();

            return View(caso);
        }

        // POST: Caso/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Descripcion,IdCliente,IdDetective")] Caso caso)
        {
            if (id != caso.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(caso);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CasoExists(caso.Id))
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

            // Si ocurre un error, cargar nuevamente las listas de clientes y detectives
            ViewData["Clientes"] = _context.Clientes.Include(c => c.IdentityUser).ToList();
            ViewData["Detectives"] = _context.Detectives.Include(d => d.IdentityUser).ToList();
            return View(caso);
        }

        // GET: Caso/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var caso = await _context.Casos
                .Include(c => c.IdClienteNavigation).ThenInclude(c => c.IdentityUser)
                .Include(c => c.IdDetectiveNavigation).ThenInclude(d => d.IdentityUser)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (caso == null)
            {
                return NotFound();
            }

            return View(caso);
        }

        // POST: Caso/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var caso = await _context.Casos.FindAsync(id);
            if (caso != null)
            {
                _context.Casos.Remove(caso);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool CasoExists(int id)
        {
            return _context.Casos.Any(e => e.Id == id);
        }
    }
}
