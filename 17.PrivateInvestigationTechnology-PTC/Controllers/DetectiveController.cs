using _17.PrivateInvestigationTechnology_PTC.Logic;
using _17.PrivateInvestigationTechnology_PTC.Models;
using Microsoft.AspNetCore.Mvc;

public class DetectiveController : Controller
{
    private readonly EntityManagementService _entityService;

    public DetectiveController(EntityManagementService entityService)
    {
        _entityService = entityService;
    }

    public async Task<IActionResult> Index()
    {
        var detectives = await _entityService.GetAllDetectivesAsync();
        return View(detectives);
    }

    public async Task<IActionResult> Edit(int id)
    {
        var detective = await _entityService.GetDetectiveByIdAsync(id);
        if (detective == null)
        {
            return NotFound();
        }
        return View(detective);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("Id,NumeroIdentidad,HojaDeVida")] Detective detective, IFormFile HojaDeVidaFile)
    {
        if (id != detective.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            if (HojaDeVidaFile != null && HojaDeVidaFile.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await HojaDeVidaFile.CopyToAsync(memoryStream);
                    detective.HojaDeVida = memoryStream.ToArray();  // Asigna el archivo de la hoja de vida
                }
            }

            var result = await _entityService.UpdateDetectiveAsync(detective);
            if (!result)
            {
                return NotFound();
            }

            return RedirectToAction(nameof(Index));
        }
        return View(detective);
    }
}
