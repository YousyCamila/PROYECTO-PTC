using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PrivateInvestigationTechnology.Models;

namespace PrivateInvestigationTechnology.Datos;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Administrador> Administradors { get; set; }

    public virtual DbSet<Auditorium> Auditoria { get; set; }

    public virtual DbSet<Caso> Casos { get; set; }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Contrato> Contratos { get; set; }

    public virtual DbSet<Detective> Detectives { get; set; }

    public virtual DbSet<Evidencium> Evidencia { get; set; }

    public virtual DbSet<Factura> Facturas { get; set; }

    public virtual DbSet<Formulario> Formularios { get; set; }

    public virtual DbSet<Historial> Historials { get; set; }

    public virtual DbSet<Persona> Personas { get; set; }

    public virtual DbSet<RegistroCaso> RegistroCasos { get; set; }

    public virtual DbSet<RegistroMantenimiento> RegistroMantenimientos { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<TipoEvidencium> TipoEvidencia { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-MVC3TKQ\\SQLEXPRESS;Database=PTC_PRUEBA;User ID=JuanSebastian;Password=MyProyect2024; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Administrador>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ADMINIST__2D89616FD06B269C");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Administrador)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ADMINISTR__ID_Ad__3E52440B");
        });

        modelBuilder.Entity<Auditorium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AUDITORI__2C0A46DB57C0C4C3");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Auditoria)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AUDITORIA__ID_Us__656C112C");
        });

        modelBuilder.Entity<Caso>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CASOS__8D2EE0F8198FF510");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Casos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CASOS__ID_Client__5535A963");

            entity.HasOne(d => d.IdDetectiveNavigation).WithMany(p => p.Casos).HasConstraintName("FK__CASOS__ID_Detective__5535A963");
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CLIENTE__E005FBFFD9D25160");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Cliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CLIENTE__ID_Clie__440B1D61");
        });

        modelBuilder.Entity<Contrato>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CONTRATO__B16B9C193079E2D4");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Contratos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CONTRATO__ID_Cli__52593CB8");

            entity.HasOne(d => d.IdDetectiveNavigation).WithMany(p => p.Contratos).HasConstraintName("FK__CONTRATO__ID_Detective__52593CB8");
        });

        modelBuilder.Entity<Detective>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DETECTIV__8B0EE69682BC2615");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Detective)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DETECTIVE__ID_De__412EB0B6");
        });

        modelBuilder.Entity<Evidencium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__EVIDENCI__7E4E2469BB4D9A36");

            entity.HasOne(d => d.IdCasosNavigation).WithMany(p => p.Evidencia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EVIDENCIA__ID_Ca__5AEE82B9");
        });

        modelBuilder.Entity<Factura>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FACTURA__E9D586A8C548166A");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Facturas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FACTURA__ID_Clie__4F7CD00D");
        });

        modelBuilder.Entity<Formulario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FORMULAR__5E51A260A355C47A");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Formularios)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FORMULARI__ID_Cl__49C3F6B7");
        });

        modelBuilder.Entity<Historial>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__HISTORIA__ECA894541749A391");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Historials)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HISTORIAL__ID_Cl__4CA06362");
        });

        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PERSONA__E9916EC1AEFC8FCB");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Personas).HasConstraintName("FK_PERSONA_USUARIO");
        });

        modelBuilder.Entity<RegistroCaso>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__REGISTRO__02C63DCF336C0A9B");

            entity.HasOne(d => d.IdCasosNavigation).WithMany(p => p.RegistroCasos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__REGISTRO___ID_Ca__5812160E");
        });

        modelBuilder.Entity<RegistroMantenimiento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__REGISTRO__BD4C405AD6E7EB8F");

            entity.HasOne(d => d.IdAdministradorNavigation).WithMany(p => p.RegistroMantenimientos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__REGISTRO___ID_Ad__46E78A0C");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ROLES__F92302F1CF88DF30");
        });

        modelBuilder.Entity<TipoEvidencium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TIPO_EVI__EA1B819E989F9A41");

            entity.HasOne(d => d.IdEvidenciaNavigation).WithMany(p => p.TipoEvidencia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TIPO_EVID__ID_Ev__628FA481");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__USUARIO__DE4431C517669D5D");

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuarios)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__USUARIO__RolId__3B75D760");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
