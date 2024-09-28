using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Models;
using _17.PrivateInvestigationTechnology_PTC.Models.ViewModels;

namespace _17.PrivateInvestigationTechnology_PTC.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets para las entidades personalizadas
        public DbSet<Administrador> Administradores { get; set; }
        public DbSet<Auditorium> Auditoria { get; set; }
        public DbSet<Caso> Casos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Contrato> Contratos { get; set; }
        public DbSet<Detective> Detectives { get; set; }
        public DbSet<Evidencium> Evidencias { get; set; }
        public DbSet<Factura> Facturas { get; set; }
        public DbSet<Formulario> Formularios { get; set; }
        public DbSet<Historial> Historiales { get; set; }
        public DbSet<RegistroCaso> RegistroCasos { get; set; }
        public DbSet<RegistroMantenimiento> RegistroMantenimientos { get; set; }
        public DbSet<TipoEvidencium> TipoEvidencias { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Llamar al OnModelCreating de IdentityDbContext para configurar las tablas de ASP.NET Identity
            base.OnModelCreating(builder);

            // Configuración para la entidad Auditorium, relacionada con IdentityUser
            builder.Entity<Auditorium>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Auditorium");
                entity.Property(e => e.Descripcion).HasMaxLength(255);

                // Relacionar Auditorium con IdentityUser
                entity.HasOne(a => a.IdentityUser) // Propiedad de navegación
                    .WithMany() // No definimos relación inversa en IdentityUser
                    .HasForeignKey(a => a.IdentityUserId) // Clave foránea
                    .OnDelete(DeleteBehavior.ClientSetNull) // Restricción de eliminación
                    .HasConstraintName("FK_Auditorium_IdentityUser");
            });

            // Configuración para la entidad Administrador
            builder.Entity<Administrador>(entity =>
            {
                entity.Property(e => e.Nombre).HasMaxLength(100);
            });

            // Configuración para la entidad Cliente
            builder.Entity<Cliente>(entity =>
            {
                entity.Property(e => e.Nombre).HasMaxLength(100);
            });

            // Configuración para la entidad Detective
            builder.Entity<Detective>(entity =>
            {
                entity.Property(e => e.Nombre).HasMaxLength(100);
            });

            // Configuración para Caso
            builder.Entity<Caso>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Caso");
                entity.Property(e => e.Descripcion).HasMaxLength(255);
                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Casos)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Caso_Cliente");
                entity.HasOne(d => d.IdDetectiveNavigation)
                    .WithMany(p => p.Casos)
                    .HasForeignKey(d => d.IdDetective)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Caso_Detective");
            });

            // Configuración para Contrato
            builder.Entity<Contrato>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Contrato");
                entity.Property(e => e.Detalles).HasMaxLength(255);
                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Contratos)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Contrato_Cliente");
                entity.HasOne(d => d.IdDetectiveNavigation)
                    .WithMany(p => p.Contratos)
                    .HasForeignKey(d => d.IdDetective)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Contrato_Detective");
            });

            // Configuración para Evidencia
            builder.Entity<Evidencium>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Evidencium");
                entity.Property(e => e.Descripcion).HasMaxLength(255);
                entity.HasOne(d => d.IdCasoNavigation)
                    .WithMany(p => p.Evidencia)
                    .HasForeignKey(d => d.IdCaso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Evidencia_Caso");
            });

            // Configuración para Factura
            builder.Entity<Factura>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Factura");
                entity.Property(e => e.Monto).HasColumnType("decimal(18, 2)");
                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Factura_Cliente");
            });

            // Configuración para Formulario
            builder.Entity<Formulario>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Formulario");
                entity.Property(e => e.Detalles).HasMaxLength(255);
                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Formularios)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Formulario_Cliente");
            });

            // Configuración para Historial
            builder.Entity<Historial>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_Historial");
                entity.Property(e => e.Descripcion).HasMaxLength(255);
                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Historials)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Historial_Cliente");
            });

            // Configuración para RegistroCaso
            builder.Entity<RegistroCaso>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_RegistroCaso");
                entity.Property(e => e.Descripcion).HasMaxLength(255);
                entity.HasOne(d => d.IdCasoNavigation)
                    .WithMany(p => p.RegistroCasos)
                    .HasForeignKey(d => d.IdCaso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RegistroCaso_Caso");
            });

            // Configuración para RegistroMantenimiento
            builder.Entity<RegistroMantenimiento>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_RegistroMantenimiento");
                entity.Property(e => e.FechaFinal).HasColumnType("datetime");
                entity.Property(e => e.FechaInicio).HasColumnType("datetime");
                entity.HasOne(d => d.IdAdministradorNavigation)
                    .WithMany(p => p.RegistroMantenimientos)
                    .HasForeignKey(d => d.IdAdministrador)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RegistroMantenimiento_Administrador");
            });

            // Configuración para TipoEvidencium
            builder.Entity<TipoEvidencium>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_TipoEvidencium");
                entity.Property(e => e.Descripcion).HasMaxLength(255);
                entity.HasOne(d => d.IdEvidenciaNavigation)
                    .WithMany(p => p.TipoEvidencia)
                    .HasForeignKey(d => d.IdEvidencia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TipoEvidencia_Evidencia");
            });
            // Eliminar cualquier rastro de la entidad Usuario que se eliminó
        }
    }
}
