using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class bloodgroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_BloodGroup_BloodGroupId",
                table: "User");

            migrationBuilder.AlterColumn<int>(
                name: "BloodGroupId",
                table: "User",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_User_BloodGroup_BloodGroupId",
                table: "User",
                column: "BloodGroupId",
                principalTable: "BloodGroup",
                principalColumn: "BloodgroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_BloodGroup_BloodGroupId",
                table: "User");

            migrationBuilder.AlterColumn<int>(
                name: "BloodGroupId",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_User_BloodGroup_BloodGroupId",
                table: "User",
                column: "BloodGroupId",
                principalTable: "BloodGroup",
                principalColumn: "BloodgroupId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
