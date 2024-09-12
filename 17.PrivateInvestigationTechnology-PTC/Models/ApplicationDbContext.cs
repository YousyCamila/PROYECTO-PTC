using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace _17.PrivateInvestigationTechnology_PTC.Models;

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

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Data Source=NANOYOKI-06\\SQLEXPRESS;Initial Catalog=PrivateInvestigationTechnology;Persist Security Info=False;User ID=sa;Password=shadamy159;Pooling=False;Multiple Active Result Sets=False;Encrypt=True;Trust Server Certificate=True;Command Timeout=0");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Administrador>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Administ__3214EC07DD24900F");

            entity.ToTable("Administrador");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Auditorium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Auditori__3214EC072E59CF31");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Descripcion).HasMaxLength(255);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Auditoria)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Auditoria_Usuario");
        });

        modelBuilder.Entity<Caso>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Caso__3214EC0733CC1955");

            entity.ToTable("Caso");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Descripcion).HasMaxLength(255);

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Casos)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Caso_Cliente");

            entity.HasOne(d => d.IdDetectiveNavigation).WithMany(p => p.Casos)
                .HasForeignKey(d => d.IdDetective)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Caso_Detective");
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cliente__3214EC075361933A");

            entity.ToTable("Cliente");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Contrato>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Contrato__3214EC07B43553BC");

            entity.ToTable("Contrato");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Detalles).HasMaxLength(255);

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Contratos)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contrato_Cliente");

            entity.HasOne(d => d.IdDetectiveNavigation).WithMany(p => p.Contratos)
                .HasForeignKey(d => d.IdDetective)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contrato_Detective");
        });

        modelBuilder.Entity<Detective>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Detectiv__3214EC07FA53F2E0");

            entity.ToTable("Detective");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Evidencium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Evidenci__3214EC0782111570");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Descripcion).HasMaxLength(255);

            entity.HasOne(d => d.IdCasoNavigation).WithMany(p => p.Evidencia)
                .HasForeignKey(d => d.IdCaso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Evidencia_Caso");
        });

        modelBuilder.Entity<Factura>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Factura__3214EC07423EC717");

            entity.ToTable("Factura");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Monto).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Facturas)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Factura_Cliente");
        });

        modelBuilder.Entity<Formulario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Formular__3214EC074C3444E2");

            entity.ToTable("Formulario");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Detalles).HasMaxLength(255);

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Formularios)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Formulario_Cliente");
        });

        modelBuilder.Entity<Historial>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Historia__3214EC075A9340F3");

            entity.ToTable("Historial");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Descripcion).HasMaxLength(255);

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Historials)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Historial_Cliente");
        });

        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Persona__3214EC07729008E3");

            entity.ToTable("Persona");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(100);

            entity.HasOne(d => d.IdAdministradorNavigation).WithMany(p => p.Personas)
                .HasForeignKey(d => d.IdAdministrador)
                .HasConstraintName("FK_Persona_Administrador");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Personas)
                .HasForeignKey(d => d.IdCliente)
                .HasConstraintName("FK_Persona_Cliente");

            entity.HasOne(d => d.IdDetectiveNavigation).WithMany(p => p.Personas)
                .HasForeignKey(d => d.IdDetective)
                .HasConstraintName("FK_Persona_Detective");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Personas)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Persona_Usuario");
        });

        modelBuilder.Entity<RegistroCaso>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Registro__3214EC07897CCA72");

            entity.ToTable("RegistroCaso");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Descripcion).HasMaxLength(255);

            entity.HasOne(d => d.IdCasoNavigation).WithMany(p => p.RegistroCasos)
                .HasForeignKey(d => d.IdCaso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistroCaso_Caso");
        });

        modelBuilder.Entity<RegistroMantenimiento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Registro__3214EC070A3023DE");

            entity.ToTable("RegistroMantenimiento");

            entity.HasIndex(e => e.IdAdministrador, "IX_REGISTRO_MANTENIMIENTO_ID_Administrador");

            entity.Property(e => e.FechaFinal).HasColumnType("datetime");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");

            entity.HasOne(d => d.IdAdministradorNavigation).WithMany(p => p.RegistroMantenimientos)
                .HasForeignKey(d => d.IdAdministrador)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistroMantenimiento_Administrador");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3214EC07D3CA7512");

            entity.ToTable("Role");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(50);
        });

        modelBuilder.Entity<TipoEvidencium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TipoEvid__3214EC07B4945479");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Descripcion).HasMaxLength(255);

            entity.HasOne(d => d.IdEvidenciaNavigation).WithMany(p => p.TipoEvidencia)
                .HasForeignKey(d => d.IdEvidencia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TipoEvidencia_Evidencia");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3214EC07FFA5209D");

            entity.ToTable("Usuario");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(100);

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.RolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Usuario_Role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
