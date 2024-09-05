using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class PTC_DB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PERSONA",
                columns: table => new
                {
                    ID_Persona = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DNI = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Nombres = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Apellidos = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Correo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Fecha_Nacimiento = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PERSONA__E9916EC1AEFC8FCB", x => x.ID_Persona);
                });

            migrationBuilder.CreateTable(
                name: "ROLES",
                columns: table => new
                {
                    RolId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ROLES__F92302F1CF88DF30", x => x.RolId);
                });

            migrationBuilder.CreateTable(
                name: "ADMINISTRADOR",
                columns: table => new
                {
                    ID_Administrador = table.Column<int>(type: "int", nullable: false),
                    Especialidad = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ADMINIST__2D89616FD06B269C", x => x.ID_Administrador);
                    table.ForeignKey(
                        name: "FK__ADMINISTR__ID_Ad__3E52440B",
                        column: x => x.ID_Administrador,
                        principalTable: "PERSONA",
                        principalColumn: "ID_Persona");
                });

            migrationBuilder.CreateTable(
                name: "CLIENTE",
                columns: table => new
                {
                    ID_Cliente = table.Column<int>(type: "int", nullable: false),
                    Direccion = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CLIENTE__E005FBFFD9D25160", x => x.ID_Cliente);
                    table.ForeignKey(
                        name: "FK__CLIENTE__ID_Clie__440B1D61",
                        column: x => x.ID_Cliente,
                        principalTable: "PERSONA",
                        principalColumn: "ID_Persona");
                });

            migrationBuilder.CreateTable(
                name: "DETECTIVE",
                columns: table => new
                {
                    ID_Detective = table.Column<int>(type: "int", nullable: false),
                    Especialidad = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__DETECTIV__8B0EE69682BC2615", x => x.ID_Detective);
                    table.ForeignKey(
                        name: "FK__DETECTIVE__ID_De__412EB0B6",
                        column: x => x.ID_Detective,
                        principalTable: "PERSONA",
                        principalColumn: "ID_Persona");
                });

            migrationBuilder.CreateTable(
                name: "USUARIO",
                columns: table => new
                {
                    ID_Usuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    RolId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__USUARIO__DE4431C517669D5D", x => x.ID_Usuario);
                    table.ForeignKey(
                        name: "FK__USUARIO__RolId__3B75D760",
                        column: x => x.RolId,
                        principalTable: "ROLES",
                        principalColumn: "RolId");
                });

            migrationBuilder.CreateTable(
                name: "REGISTRO_MANTENIMIENTO",
                columns: table => new
                {
                    ID_Mantenimiento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha_Inicio = table.Column<DateTime>(type: "datetime", nullable: false),
                    Fecha_Final = table.Column<DateTime>(type: "datetime", nullable: true),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    ID_Administrador = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__REGISTRO__BD4C405AD6E7EB8F", x => x.ID_Mantenimiento);
                    table.ForeignKey(
                        name: "FK__REGISTRO___ID_Ad__46E78A0C",
                        column: x => x.ID_Administrador,
                        principalTable: "ADMINISTRADOR",
                        principalColumn: "ID_Administrador");
                });

            migrationBuilder.CreateTable(
                name: "FACTURA",
                columns: table => new
                {
                    ID_Factura = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha_Emision = table.Column<DateTime>(type: "datetime", nullable: false),
                    Estado_Pago = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Descripcion_Serv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Total_Pagar = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    ID_Cliente = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__FACTURA__E9D586A8C548166A", x => x.ID_Factura);
                    table.ForeignKey(
                        name: "FK__FACTURA__ID_Clie__4F7CD00D",
                        column: x => x.ID_Cliente,
                        principalTable: "CLIENTE",
                        principalColumn: "ID_Cliente");
                });

            migrationBuilder.CreateTable(
                name: "FORMULARIO",
                columns: table => new
                {
                    ID_Formulario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Numero_Celular = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha_Envio = table.Column<DateTime>(type: "datetime", nullable: false),
                    ID_Cliente = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__FORMULAR__5E51A260A355C47A", x => x.ID_Formulario);
                    table.ForeignKey(
                        name: "FK__FORMULARI__ID_Cl__49C3F6B7",
                        column: x => x.ID_Cliente,
                        principalTable: "CLIENTE",
                        principalColumn: "ID_Cliente");
                });

            migrationBuilder.CreateTable(
                name: "HISTORIAL",
                columns: table => new
                {
                    ID_Historial = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha_Inicio_Histo = table.Column<DateTime>(type: "datetime", nullable: false),
                    Fecha_Final_Histo = table.Column<DateTime>(type: "datetime", nullable: true),
                    ID_Cliente = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__HISTORIA__ECA894541749A391", x => x.ID_Historial);
                    table.ForeignKey(
                        name: "FK__HISTORIAL__ID_Cl__4CA06362",
                        column: x => x.ID_Cliente,
                        principalTable: "CLIENTE",
                        principalColumn: "ID_Cliente");
                });

            migrationBuilder.CreateTable(
                name: "CASOS",
                columns: table => new
                {
                    ID_Casos = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cadena_Custodia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Investigacion_Extorsion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Estudios_Seguridad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Investigacion_Infidelidades = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Investigacion_Robos_Empresariales = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Antecedentes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Recuperacion_Vehiculos = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_Cliente = table.Column<int>(type: "int", nullable: false),
                    ID_Detective = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CASOS__8D2EE0F8198FF510", x => x.ID_Casos);
                    table.ForeignKey(
                        name: "FK__CASOS__ID_Client__5535A963",
                        column: x => x.ID_Cliente,
                        principalTable: "CLIENTE",
                        principalColumn: "ID_Cliente");
                    table.ForeignKey(
                        name: "FK__CASOS__ID_Detective__5535A963",
                        column: x => x.ID_Detective,
                        principalTable: "DETECTIVE",
                        principalColumn: "ID_Detective");
                });

            migrationBuilder.CreateTable(
                name: "CONTRATO",
                columns: table => new
                {
                    ID_Contrato = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descrip_Servicio = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Fecha_Inicio = table.Column<DateTime>(type: "datetime", nullable: false),
                    Fecha_Cierre = table.Column<DateTime>(type: "datetime", nullable: false),
                    Clausulas = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tarifa = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    ID_Cliente = table.Column<int>(type: "int", nullable: false),
                    ID_Detective = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CONTRATO__B16B9C193079E2D4", x => x.ID_Contrato);
                    table.ForeignKey(
                        name: "FK__CONTRATO__ID_Cli__52593CB8",
                        column: x => x.ID_Cliente,
                        principalTable: "CLIENTE",
                        principalColumn: "ID_Cliente");
                    table.ForeignKey(
                        name: "FK__CONTRATO__ID_Detective__52593CB8",
                        column: x => x.ID_Detective,
                        principalTable: "DETECTIVE",
                        principalColumn: "ID_Detective");
                });

            migrationBuilder.CreateTable(
                name: "AUDITORIA",
                columns: table => new
                {
                    ID_Auditoria = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha_Actividad = table.Column<DateTime>(type: "datetime", nullable: false),
                    Descrip_Actividad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    Hora_Actividad = table.Column<DateTime>(type: "datetime", nullable: false),
                    Detalles_Adicionales = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_Usuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AUDITORI__2C0A46DB57C0C4C3", x => x.ID_Auditoria);
                    table.ForeignKey(
                        name: "FK__AUDITORIA__ID_Us__656C112C",
                        column: x => x.ID_Usuario,
                        principalTable: "USUARIO",
                        principalColumn: "ID_Usuario");
                });

            migrationBuilder.CreateTable(
                name: "EVIDENCIA",
                columns: table => new
                {
                    ID_Evidencia = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha_Evidencia = table.Column<DateTime>(type: "datetime", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ID_Casos = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__EVIDENCI__7E4E2469BB4D9A36", x => x.ID_Evidencia);
                    table.ForeignKey(
                        name: "FK__EVIDENCIA__ID_Ca__5AEE82B9",
                        column: x => x.ID_Casos,
                        principalTable: "CASOS",
                        principalColumn: "ID_Casos");
                });

            migrationBuilder.CreateTable(
                name: "REGISTRO_CASOS",
                columns: table => new
                {
                    ID_Registro_Casos = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha_Inicio = table.Column<DateTime>(type: "datetime", nullable: false),
                    Fecha_Finalizacion = table.Column<DateTime>(type: "datetime", nullable: true),
                    Estado_Registro = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Seguimiento_Porcentaje = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ID_Casos = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__REGISTRO__02C63DCF336C0A9B", x => x.ID_Registro_Casos);
                    table.ForeignKey(
                        name: "FK__REGISTRO___ID_Ca__5812160E",
                        column: x => x.ID_Casos,
                        principalTable: "CASOS",
                        principalColumn: "ID_Casos");
                });

            migrationBuilder.CreateTable(
                name: "TIPO_EVIDENCIA",
                columns: table => new
                {
                    ID_Tipo_Evidencia = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tipo_Documento = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Tipo_Fotografia = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Tipo_Video = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Tipo_Audio = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Archivos_Digitales = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ID_Evidencia = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TIPO_EVI__EA1B819E989F9A41", x => x.ID_Tipo_Evidencia);
                    table.ForeignKey(
                        name: "FK__TIPO_EVID__ID_Ev__628FA481",
                        column: x => x.ID_Evidencia,
                        principalTable: "EVIDENCIA",
                        principalColumn: "ID_Evidencia");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AUDITORIA_ID_Usuario",
                table: "AUDITORIA",
                column: "ID_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_CASOS_ID_Cliente",
                table: "CASOS",
                column: "ID_Cliente");

            migrationBuilder.CreateIndex(
                name: "IX_CASOS_ID_Detective",
                table: "CASOS",
                column: "ID_Detective");

            migrationBuilder.CreateIndex(
                name: "IX_CONTRATO_ID_Cliente",
                table: "CONTRATO",
                column: "ID_Cliente");

            migrationBuilder.CreateIndex(
                name: "IX_CONTRATO_ID_Detective",
                table: "CONTRATO",
                column: "ID_Detective");

            migrationBuilder.CreateIndex(
                name: "IX_EVIDENCIA_ID_Casos",
                table: "EVIDENCIA",
                column: "ID_Casos");

            migrationBuilder.CreateIndex(
                name: "IX_FACTURA_ID_Cliente",
                table: "FACTURA",
                column: "ID_Cliente");

            migrationBuilder.CreateIndex(
                name: "IX_FORMULARIO_ID_Cliente",
                table: "FORMULARIO",
                column: "ID_Cliente");

            migrationBuilder.CreateIndex(
                name: "IX_HISTORIAL_ID_Cliente",
                table: "HISTORIAL",
                column: "ID_Cliente");

            migrationBuilder.CreateIndex(
                name: "IX_REGISTRO_CASOS_ID_Casos",
                table: "REGISTRO_CASOS",
                column: "ID_Casos");

            migrationBuilder.CreateIndex(
                name: "IX_REGISTRO_MANTENIMIENTO_ID_Administrador",
                table: "REGISTRO_MANTENIMIENTO",
                column: "ID_Administrador");

            migrationBuilder.CreateIndex(
                name: "IX_TIPO_EVIDENCIA_ID_Evidencia",
                table: "TIPO_EVIDENCIA",
                column: "ID_Evidencia");

            migrationBuilder.CreateIndex(
                name: "IX_USUARIO_RolId",
                table: "USUARIO",
                column: "RolId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AUDITORIA");

            migrationBuilder.DropTable(
                name: "CONTRATO");

            migrationBuilder.DropTable(
                name: "FACTURA");

            migrationBuilder.DropTable(
                name: "FORMULARIO");

            migrationBuilder.DropTable(
                name: "HISTORIAL");

            migrationBuilder.DropTable(
                name: "REGISTRO_CASOS");

            migrationBuilder.DropTable(
                name: "REGISTRO_MANTENIMIENTO");

            migrationBuilder.DropTable(
                name: "TIPO_EVIDENCIA");

            migrationBuilder.DropTable(
                name: "USUARIO");

            migrationBuilder.DropTable(
                name: "ADMINISTRADOR");

            migrationBuilder.DropTable(
                name: "EVIDENCIA");

            migrationBuilder.DropTable(
                name: "ROLES");

            migrationBuilder.DropTable(
                name: "CASOS");

            migrationBuilder.DropTable(
                name: "CLIENTE");

            migrationBuilder.DropTable(
                name: "DETECTIVE");

            migrationBuilder.DropTable(
                name: "PERSONA");
        }
    }
}
