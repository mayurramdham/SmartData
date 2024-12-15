using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class specilizationId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SpecialisationId",
                table: "Appointment",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_SpecialisationId",
                table: "Appointment",
                column: "SpecialisationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointment_Specialisation_SpecialisationId",
                table: "Appointment",
                column: "SpecialisationId",
                principalTable: "Specialisation",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointment_Specialisation_SpecialisationId",
                table: "Appointment");

            migrationBuilder.DropIndex(
                name: "IX_Appointment_SpecialisationId",
                table: "Appointment");

            migrationBuilder.DropColumn(
                name: "SpecialisationId",
                table: "Appointment");
        }
    }
}
