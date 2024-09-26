using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _17.PrivateInvestigationTechnology_PTC.Migrations
{
    /// <inheritdoc />
    public partial class PTC_DB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Administrador",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Administ__3214EC07DD24900F", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cliente",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Cliente__3214EC075361933A", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Detective",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Detectiv__3214EC07FA53F2E0", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Role__3214EC07D3CA7512", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RegistroMantenimiento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime", nullable: false),
                    FechaFinal = table.Column<DateTime>(type: "datetime", nullable: true),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    IdAdministrador = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Registro__3214EC070A3023DE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistroMantenimiento_Administrador",
                        column: x => x.IdAdministrador,
                        principalTable: "Administrador",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Factura",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdCliente = table.Column<int>(type: "int", nullable: false),
                    Monto = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Factura__3214EC07423EC717", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Factura_Cliente",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Formulario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdCliente = table.Column<int>(type: "int", nullable: false),
                    Detalles = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Formular__3214EC074C3444E2", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Formulario_Cliente",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Historial",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdCliente = table.Column<int>(type: "int", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Historia__3214EC075A9340F3", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Historial_Cliente",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Caso",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdCliente = table.Column<int>(type: "int", nullable: false),
                    IdDetective = table.Column<int>(type: "int", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Caso__3214EC0733CC1955", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Caso_Cliente",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Caso_Detective",
                        column: x => x.IdDetective,
                        principalTable: "Detective",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Contrato",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdCliente = table.Column<int>(type: "int", nullable: false),
                    IdDetective = table.Column<int>(type: "int", nullable: false),
                    Detalles = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Contrato__3214EC07B43553BC", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contrato_Cliente",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Contrato_Detective",
                        column: x => x.IdDetective,
                        principalTable: "Detective",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    RolId = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Usuario__3214EC07FFA5209D", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usuario_Role",
                        column: x => x.RolId,
                        principalTable: "Role",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Evidencia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdCaso = table.Column<int>(type: "int", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Evidenci__3214EC0782111570", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Evidencia_Caso",
                        column: x => x.IdCaso,
                        principalTable: "Caso",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RegistroCaso",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdCaso = table.Column<int>(type: "int", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Registro__3214EC07897CCA72", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistroCaso_Caso",
                        column: x => x.IdCaso,
                        principalTable: "Caso",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Auditoria",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Auditori__3214EC072E59CF31", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Auditoria_Usuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Persona",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IdAdministrador = table.Column<int>(type: "int", nullable: true),
                    IdDetective = table.Column<int>(type: "int", nullable: true),
                    IdCliente = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Persona__3214EC07729008E3", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Persona_Administrador",
                        column: x => x.IdAdministrador,
                        principalTable: "Administrador",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Persona_Cliente",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Persona_Detective",
                        column: x => x.IdDetective,
                        principalTable: "Detective",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Persona_Usuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TipoEvidencia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IdEvidencia = table.Column<int>(type: "int", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TipoEvid__3214EC07B4945479", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TipoEvidencia_Evidencia",
                        column: x => x.IdEvidencia,
                        principalTable: "Evidencia",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Auditoria_IdUsuario",
                table: "Auditoria",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Caso_IdCliente",
                table: "Caso",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Caso_IdDetective",
                table: "Caso",
                column: "IdDetective");

            migrationBuilder.CreateIndex(
                name: "IX_Contrato_IdCliente",
                table: "Contrato",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Contrato_IdDetective",
                table: "Contrato",
                column: "IdDetective");

            migrationBuilder.CreateIndex(
                name: "IX_Evidencia_IdCaso",
                table: "Evidencia",
                column: "IdCaso");

            migrationBuilder.CreateIndex(
                name: "IX_Factura_IdCliente",
                table: "Factura",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Formulario_IdCliente",
                table: "Formulario",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Historial_IdCliente",
                table: "Historial",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Persona_IdAdministrador",
                table: "Persona",
                column: "IdAdministrador");

            migrationBuilder.CreateIndex(
                name: "IX_Persona_IdCliente",
                table: "Persona",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Persona_IdDetective",
                table: "Persona",
                column: "IdDetective");

            migrationBuilder.CreateIndex(
                name: "IX_Persona_IdUsuario",
                table: "Persona",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_RegistroCaso_IdCaso",
                table: "RegistroCaso",
                column: "IdCaso");

            migrationBuilder.CreateIndex(
                name: "IX_REGISTRO_MANTENIMIENTO_ID_Administrador",
                table: "RegistroMantenimiento",
                column: "IdAdministrador");

            migrationBuilder.CreateIndex(
                name: "IX_TipoEvidencia_IdEvidencia",
                table: "TipoEvidencia",
                column: "IdEvidencia");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_RolId",
                table: "Usuario",
                column: "RolId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Auditoria");

            migrationBuilder.DropTable(
                name: "Contrato");

            migrationBuilder.DropTable(
                name: "Factura");

            migrationBuilder.DropTable(
                name: "Formulario");

            migrationBuilder.DropTable(
                name: "Historial");

            migrationBuilder.DropTable(
                name: "Persona");

            migrationBuilder.DropTable(
                name: "RegistroCaso");

            migrationBuilder.DropTable(
                name: "RegistroMantenimiento");

            migrationBuilder.DropTable(
                name: "TipoEvidencia");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Administrador");

            migrationBuilder.DropTable(
                name: "Evidencia");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Caso");

            migrationBuilder.DropTable(
                name: "Cliente");

            migrationBuilder.DropTable(
                name: "Detective");
        }
    }
}
