using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _17.PrivateInvestigationTechnology_PTC.Migrations
{
    /// <inheritdoc />
    public partial class RemoveClienteRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Formulario_Cliente",
                table: "Formularios");

            migrationBuilder.DropIndex(
                name: "IX_Formularios_IdCliente",
                table: "Formularios");

            migrationBuilder.DropColumn(
                name: "IdCliente",
                table: "Formularios");

            migrationBuilder.AddColumn<int>(
                name: "ClienteId",
                table: "Formularios",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Formularios_ClienteId",
                table: "Formularios",
                column: "ClienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Formularios_Clientes_ClienteId",
                table: "Formularios",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Formularios_Clientes_ClienteId",
                table: "Formularios");

            migrationBuilder.DropIndex(
                name: "IX_Formularios_ClienteId",
                table: "Formularios");

            migrationBuilder.DropColumn(
                name: "ClienteId",
                table: "Formularios");

            migrationBuilder.AddColumn<int>(
                name: "IdCliente",
                table: "Formularios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Formularios_IdCliente",
                table: "Formularios",
                column: "IdCliente");

            migrationBuilder.AddForeignKey(
                name: "FK_Formulario_Cliente",
                table: "Formularios",
                column: "IdCliente",
                principalTable: "Clientes",
                principalColumn: "Id");
        }
    }
}
