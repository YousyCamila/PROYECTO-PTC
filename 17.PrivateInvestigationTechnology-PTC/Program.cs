using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using _17.PrivateInvestigationTechnology_PTC.Services;
using _17.PrivateInvestigationTechnology_PTC.Logic; // Asegúrate de incluir el espacio de nombres donde esté la clase
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Configuración de la cadena de conexión
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// Agregar el contexto de base de datos de la aplicación
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Configurar Identity con ApplicationUser y IdentityRole
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Configurar el servicio de envío de correos electrónicos
builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration.GetSection("AuthMessageSenderOptions"));

// Agregar el servicio EntityManagementService
builder.Services.AddScoped<EntityManagementService>(); // Aquí se agrega el servicio

// Agregar soporte para Razor Pages y MVC
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

// Construir la aplicación
var app = builder.Build();

// Sembrar los datos iniciales (roles y usuarios)
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        await IdentityDataInitializer.SeedData(services); // Llamada a SeedData para crear roles y usuarios iniciales
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred seeding the database.");
    }
}

// Configuración del pipeline de manejo de solicitudes HTTP
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Asegurarse de que Razor Pages y las rutas de los controladores estén mapeadas correctamente
app.MapRazorPages();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "admin",
    pattern: "{controller=AdministradorLogin}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "detective",
    pattern: "{controller=DetectiveLogin}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "client",
    pattern: "{controller=ClienteLogin}/{action=Index}/{id?}");

app.Run();
