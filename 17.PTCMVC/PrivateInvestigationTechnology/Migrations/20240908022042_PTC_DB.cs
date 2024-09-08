using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PrivateInvestigationTechnology.Migrations
{
    /// <inheritdoc />
    public partial class PTC_DB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ROLES__F92302F1CF88DF30", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    RolId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__USUARIO__DE4431C517669D5D", x => x.Id);
                    table.ForeignKey(
                        name: "FK__USUARIO__RolId__3B75D760",
                        column: x => x.RolId,
                        principalTable: "Roles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Auditoria",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FechaActividad = table.Column<DateTime>(type: "datetime", nullable: false),
                    DescripcionActividad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    HoraActividad = table.Column<DateTime>(type: "datetime", nullable: false),
                    DetallesAdicionales = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AUDITORI__2C0A46DB57C0C4C3", x => x.Id);
                    table.ForeignKey(
                        name: "FK__AUDITORIA__ID_Us__656C112C",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Persona",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DNI = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Nombres = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Apellidos = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Correo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FechaNacimiento = table.Column<DateTime>(type: "datetime", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PERSONA__E9916EC1AEFC8FCB", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PERSONA_USUARIO",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Administrador",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Especialidad = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ADMINIST__2D89616FD06B269C", x => x.Id);
                    table.ForeignKey(
                        name: "FK__ADMINISTR__ID_Ad__3E52440B",
                        column: x => x.Id,
                        principalTable: "Persona",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Cliente",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Direccion = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CLIENTE__E005FBFFD9D25160", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CLIENTE__ID_Clie__440B1D61",
                        column: x => x.Id,
                        principalTable: "Persona",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Detective",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Especialidad = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__DETECTIV__8B0EE69682BC2615", x => x.Id);
                    table.ForeignKey(
                        name: "FK__DETECTIVE__ID_De__412EB0B6",
                        column: x => x.Id,
                        principalTable: "Persona",
                        principalColumn: "Id");
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
                    table.PrimaryKey("PK__REGISTRO__BD4C405AD6E7EB8F", x => x.Id);
                    table.ForeignKey(
                        name: "FK__REGISTRO___ID_Ad__46E78A0C",
                        column: x => x.IdAdministrador,
                        principalTable: "Administrador",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Factura",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FechaEmision = table.Column<DateTime>(type: "datetime", nullable: false),
                    EstadoPago = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DescripcionServicio = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    TotalPagar = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    IdCliente = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__FACTURA__E9D586A8C548166A", x => x.Id);
                    table.ForeignKey(
                        name: "FK__FACTURA__ID_Clie__4F7CD00D",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Formulario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NumeroCelular = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaEnvio = table.Column<DateTime>(type: "datetime", nullable: false),
                    IdCliente = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__FORMULAR__5E51A260A355C47A", x => x.Id);
                    table.ForeignKey(
                        name: "FK__FORMULARI__ID_Cl__49C3F6B7",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Historial",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime", nullable: false),
                    FechaFinal = table.Column<DateTime>(type: "datetime", nullable: true),
                    IdCliente = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__HISTORIA__ECA894541749A391", x => x.Id);
                    table.ForeignKey(
                        name: "FK__HISTORIAL__ID_Cl__4CA06362",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Casos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CadenaCustodia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvestigacionExtorsion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstudiosSeguridad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvestigacionInfidelidades = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvestigacionRobosEmpresariales = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Antecedentes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecuperacionVehiculos = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdCliente = table.Column<int>(type: "int", nullable: false),
                    IdDetective = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CASOS__8D2EE0F8198FF510", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CASOS__ID_Client__5535A963",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__CASOS__ID_Detective__5535A963",
                        column: x => x.IdDetective,
                        principalTable: "Detective",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Contrato",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DescripcionServicio = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime", nullable: false),
                    FechaCierre = table.Column<DateTime>(type: "datetime", nullable: false),
                    Clausulas = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tarifa = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    IdCliente = table.Column<int>(type: "int", nullable: false),
                    IdDetective = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CONTRATO__B16B9C193079E2D4", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CONTRATO__ID_Cli__52593CB8",
                        column: x => x.IdCliente,
                        principalTable: "Cliente",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__CONTRATO__ID_Detective__52593CB8",
                        column: x => x.IdDetective,
                        principalTable: "Detective",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Evidencia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FechaEvidencia = table.Column<DateTime>(type: "datetime", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdCasos = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__EVIDENCI__7E4E2469BB4D9A36", x => x.Id);
                    table.ForeignKey(
                        name: "FK__EVIDENCIA__ID_Ca__5AEE82B9",
                        column: x => x.IdCasos,
                        principalTable: "Casos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RegistroCasos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime", nullable: false),
                    FechaFinalizacion = table.Column<DateTime>(type: "datetime", nullable: true),
                    EstadoRegistro = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SeguimientoPorcentaje = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    IdCasos = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__REGISTRO__02C63DCF336C0A9B", x => x.Id);
                    table.ForeignKey(
                        name: "FK__REGISTRO___ID_Ca__5812160E",
                        column: x => x.IdCasos,
                        principalTable: "Casos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TipoEvidencia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoDocumento = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TipoFotografia = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TipoVideo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TipoAudio = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ArchivosDigitales = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IdEvidencia = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TIPO_EVI__EA1B819E989F9A41", x => x.Id);
                    table.ForeignKey(
                        name: "FK__TIPO_EVID__ID_Ev__628FA481",
                        column: x => x.IdEvidencia,
                        principalTable: "Evidencia",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AUDITORIA_ID_Usuario",
                table: "Auditoria",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_CASOS_ID_Cliente",
                table: "Casos",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_CASOS_ID_Detective",
                table: "Casos",
                column: "IdDetective");

            migrationBuilder.CreateIndex(
                name: "IX_CONTRATO_ID_Cliente",
                table: "Contrato",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_CONTRATO_ID_Detective",
                table: "Contrato",
                column: "IdDetective");

            migrationBuilder.CreateIndex(
                name: "IX_EVIDENCIA_ID_Casos",
                table: "Evidencia",
                column: "IdCasos");

            migrationBuilder.CreateIndex(
                name: "IX_FACTURA_ID_Cliente",
                table: "Factura",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_FORMULARIO_ID_Cliente",
                table: "Formulario",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_HISTORIAL_ID_Cliente",
                table: "Historial",
                column: "IdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Persona_IdUsuario",
                table: "Persona",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_REGISTRO_CASOS_ID_Casos",
                table: "RegistroCasos",
                column: "IdCasos");

            migrationBuilder.CreateIndex(
                name: "IX_REGISTRO_MANTENIMIENTO_ID_Administrador",
                table: "RegistroMantenimiento",
                column: "IdAdministrador");

            migrationBuilder.CreateIndex(
                name: "IX_TIPO_EVIDENCIA_ID_Evidencia",
                table: "TipoEvidencia",
                column: "IdEvidencia");

            migrationBuilder.CreateIndex(
                name: "IX_USUARIO_RolId",
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
                name: "RegistroCasos");

            migrationBuilder.DropTable(
                name: "RegistroMantenimiento");

            migrationBuilder.DropTable(
                name: "TipoEvidencia");

            migrationBuilder.DropTable(
                name: "Administrador");

            migrationBuilder.DropTable(
                name: "Evidencia");

            migrationBuilder.DropTable(
                name: "Casos");

            migrationBuilder.DropTable(
                name: "Cliente");

            migrationBuilder.DropTable(
                name: "Detective");

            migrationBuilder.DropTable(
                name: "Persona");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
