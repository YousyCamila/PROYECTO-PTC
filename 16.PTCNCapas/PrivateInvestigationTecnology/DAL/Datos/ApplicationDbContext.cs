using System;
using System.Collections.Generic;
using System.Security.Policy;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Datos
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ADMINISTRADOR> ADMINISTRADORES { get; set; }
        public virtual DbSet<AUDITORIA> AUDITORIAS { get; set; }
        public virtual DbSet<CASO> CASOS { get; set; }
        public virtual DbSet<CLIENTE> CLIENTES { get; set; }
        public virtual DbSet<CONTRATO> CONTRATOS { get; set; }
        public virtual DbSet<DETECTIVE> DETECTIVES { get; set; }
        public virtual DbSet<EVIDENCIA> EVIDENCIAS { get; set; }
        public virtual DbSet<FACTURA> FACTURAS { get; set; }
        public virtual DbSet<FORMULARIO> FORMULARIOS { get; set; }
        public virtual DbSet<HISTORIAL> HISTORIALES { get; set; }
        public virtual DbSet<PERSONA> PERSONAS { get; set; }
        public virtual DbSet<REGISTRO_CASO> REGISTRO_CASOS { get; set; }
        public virtual DbSet<REGISTRO_MANTENIMIENTO> REGISTRO_MANTENIMIENTOS { get; set; }
        public virtual DbSet<ROLE> ROLES { get; set; }
        public virtual DbSet<TIPO_EVIDENCIA> TIPO_EVIDENCIAS { get; set; }
        public virtual DbSet<USUARIO> USUARIOS { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-MVC3TKQ\\SQLEXPRESS;Database=PTC_DB_M;User ID=JuanSebastian;Password=MyProyect2024; TrustServerCertificate=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ADMINISTRADOR>(entity =>
            {
                entity.HasKey(e => e.ID_Administrador).HasName("PK__ADMINIST__2D89616FD06B269C");

                entity.Property(e => e.ID_Administrador).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.Persona)
                    .WithOne(p => p.ADMINISTRADOR)
                    .HasForeignKey<ADMINISTRADOR>(d => d.ID_Administrador)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ADMINISTR__ID_Ad__3E52440B");
            });

            modelBuilder.Entity<AUDITORIA>(entity =>
            {
                entity.HasKey(e => e.ID_Auditoria).HasName("PK__AUDITORI__2C0A46DB57C0C4C3");

                entity.Property(e => e.ID_Auditoria).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_UsuarioNavigation)
                    .WithMany(p => p.AUDITORIAS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AUDITORIA__ID_Us__656C112C");
            });

            modelBuilder.Entity<CASO>(entity =>
            {
                entity.HasKey(e => e.ID_Casos).HasName("PK__CASOS__8D2EE0F8198FF510");

                entity.Property(e => e.ID_Casos).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_ClienteNavigation)
                    .WithMany(p => p.CASOS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CASOS__ID_Client__5535A963");

                entity.HasMany(d => d.EVIDENCIAS)
                    .WithOne(p => p.ID_CasosNavigation)
                    .HasForeignKey(d => d.ID_Casos)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<CLIENTE>(entity =>
            {
                entity.HasKey(e => e.ID_Cliente).HasName("PK__CLIENTE__E005FBFFD9D25160");

                entity.Property(e => e.ID_Cliente).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.Persona)
                    .WithOne(p => p.CLIENTE)
                    .HasForeignKey<CLIENTE>(d => d.ID_Cliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CLIENTE__ID_Clie__440B1D61");
            });

            modelBuilder.Entity<CONTRATO>(entity =>
            {
                entity.HasKey(e => e.ID_Contrato).HasName("PK__CONTRATO__B16B9C193079E2D4");

                entity.Property(e => e.ID_Contrato).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_ClienteNavigation)
                    .WithMany(p => p.CONTRATOS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CONTRATO__ID_Cli__52593CB8");
            });

            modelBuilder.Entity<DETECTIVE>(entity =>
            {
                entity.HasKey(e => e.ID_Detective).HasName("PK__DETECTIV__8B0EE69682BC2615");

                entity.Property(e => e.ID_Detective).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.Persona)
                    .WithOne(p => p.DETECTIVE)
                    .HasForeignKey<DETECTIVE>(d => d.ID_Detective)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__DETECTIVE__ID_De__412EB0B6");
            });

            modelBuilder.Entity<EVIDENCIA>(entity =>
            {
                entity.HasKey(e => e.ID_Evidencia).HasName("PK__EVIDENCI__7E4E2469BB4D9A36");

                entity.Property(e => e.ID_Evidencia).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_CasosNavigation)
                    .WithMany(p => p.EVIDENCIAS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EVIDENCIA__ID_Ca__5AEE82B9");

                entity.HasMany(d => d.TIPO_EVIDENCIAS)
                    .WithOne(p => p.ID_EvidenciaNavigation)
                    .HasForeignKey(d => d.ID_Evidencia)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<FACTURA>(entity =>
            {
                entity.HasKey(e => e.ID_Factura).HasName("PK__FACTURA__E9D586A8C548166A");

                entity.Property(e => e.ID_Factura).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_ClienteNavigation)
                    .WithMany(p => p.FACTURAS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FACTURA__ID_Clie__4F7CD00D");
            });

            modelBuilder.Entity<FORMULARIO>(entity =>
            {
                entity.HasKey(e => e.ID_Formulario).HasName("PK__FORMULAR__5E51A260A355C47A");

                entity.Property(e => e.ID_Formulario).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_ClienteNavigation)
                    .WithMany(p => p.FORMULARIOS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FORMULARI__ID_Cl__49C3F6B7");
            });

            modelBuilder.Entity<HISTORIAL>(entity =>
            {
                entity.HasKey(e => e.ID_Historial).HasName("PK__HISTORIA__ECA894541749A391");

                entity.Property(e => e.ID_Historial).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_ClienteNavigation)
                    .WithMany(p => p.HISTORIALES)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__HISTORIAL__ID_Cl__4CA06362");
            });

            modelBuilder.Entity<PERSONA>(entity =>
            {
                entity.HasKey(e => e.ID_Persona).HasName("PK__PERSONA__E9916EC1AEFC8FCB");

                entity.Property(e => e.ID_Persona).ValueGeneratedOnAdd(); // Auto incrementable

                // Definición de las relaciones uno a uno
                entity.HasOne(d => d.ADMINISTRADOR)
                    .WithOne(p => p.Persona)
                    .HasForeignKey<ADMINISTRADOR>(d => d.ID_Administrador)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.CLIENTE)
                    .WithOne(p => p.Persona)
                    .HasForeignKey<CLIENTE>(d => d.ID_Cliente)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.DETECTIVE)
                    .WithOne(p => p.Persona)
                    .HasForeignKey<DETECTIVE>(d => d.ID_Detective)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<REGISTRO_CASO>(entity =>
            {
                entity.HasKey(e => e.ID_Registro_Casos).HasName("PK__REGISTRO__02C63DCF336C0A9B");

                entity.Property(e => e.ID_Registro_Casos).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_CasosNavigation)
                    .WithMany(p => p.REGISTRO_CASOS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__REGISTRO___ID_Ca__5812160E");
            });

            modelBuilder.Entity<REGISTRO_MANTENIMIENTO>(entity =>
            {
                entity.HasKey(e => e.ID_Mantenimiento).HasName("PK__REGISTRO__BD4C405AD6E7EB8F");

                entity.Property(e => e.ID_Mantenimiento).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_AdministradorNavigation)
                    .WithMany(p => p.REGISTRO_MANTENIMIENTOS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__REGISTRO___ID_Ad__46E78A0C");
            });

            modelBuilder.Entity<ROLE>(entity =>
            {
                entity.HasKey(e => e.RolId).HasName("PK__ROLES__F92302F1CF88DF30");

                entity.Property(e => e.RolId).ValueGeneratedOnAdd(); // Auto incrementable
            });

            modelBuilder.Entity<TIPO_EVIDENCIA>(entity =>
            {
                entity.HasKey(e => e.ID_Tipo_Evidencia).HasName("PK__TIPO_EVI__EA1B819E989F9A41");

                entity.Property(e => e.ID_Tipo_Evidencia).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.ID_EvidenciaNavigation)
                    .WithMany(p => p.TIPO_EVIDENCIAS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TIPO_EVID__ID_Ev__628FA481");
            });

            modelBuilder.Entity<USUARIO>(entity =>
            {
                entity.HasKey(e => e.ID_Usuario).HasName("PK__USUARIO__DE4431C517669D5D");

                entity.Property(e => e.ID_Usuario).ValueGeneratedOnAdd(); // Auto incrementable

                entity.HasOne(d => d.Rol)
                    .WithMany(p => p.USUARIOS)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__USUARIO__RolId__3B75D760");

                entity.HasMany(d => d.AUDITORIAS)
                    .WithOne(p => p.ID_UsuarioNavigation)
                    .HasForeignKey(d => d.ID_Usuario)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
